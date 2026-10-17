<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import Arc from "./Arc.vue";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface GlitchConfig {
	layers: number;
	intensity: number;
	jitterRadius: number;
	jitterDegree: number;
	jitterWidth: number;
	jitterOffset: number;
	colorShift: number;
	animate: boolean;
	speed: number;
	mode: "random" | "alternating" | "progressive";
	dashPattern?: string;
  width: [number, number];
	numberOfGroups: number;
}

interface GlitchArc {
	radius: number;
	degree: number;
	width: number;
	degreeOffset: number;
	/** Degrees of hue-rotate applied to this layer (0 = no shift) */
	hueRotate: number;
	opacity: number;
	key: number; // Group key for grouping arcs into separate <g> elements
}

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────
const props = withDefaults(
	defineProps<{
		center: [number, number];
		radius: number;
		degree: number;
		degreeOffset: number;
		width: number;
		color?: string;
		/** Legacy layer count — overrides config.layers when set */
		glitch?: number;
		/** Override individual config values (merged over defaults) */
		glitchConfig?: Partial<GlitchConfig>;
	}>(),
	{
		color: "blue",
		glitch: 1,
		glitchConfig: () => ({}),
	},
);

const DEFAULTS: GlitchConfig = {
	layers: 3,
	intensity: 1,
	jitterRadius: 8,
	jitterDegree: 12,
	jitterWidth: 6,
	jitterOffset: 40,
	colorShift: 40,
	animate: true,
	speed: 120,
	mode: "random",
	numberOfGroups: 1,
};

const config = computed<GlitchConfig>(() => ({
	...DEFAULTS,
	layers: props.glitch || DEFAULTS.layers,
	...props.glitchConfig,
}));

function mulberry32(seed: number) {
	return function () {
		let t = (seed += 0x6d2b79f5);
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

const instanceSeed = Math.floor(Math.random() * 0x7fffffff);

// Mutable seed — only advanced when animate === true
let currentSeed = instanceSeed;

function rand(min: number, max: number): number {
	// NOT used directly in generateLayers anymore (see below)
	return Math.random() * (max - min) + min;
}

function jitter(base: number, amount: number, intensity: number): number {
	return base + rand(-amount, amount) * intensity;
}

function generateLayers(): GlitchArc[] {
	const c = config.value;
	if (c.layers <= 0 || c.intensity === 0) return [];

	// Fresh PRNG from the current seed on every call.
	// Same seed → same sequence → stable layout across re-renders.
	const rng = mulberry32(currentSeed);
	const sRand = (min: number, max: number) => rng() * (max - min) + min;

	const spread = Math.min(180, 40 + c.jitterOffset * c.intensity);
	var groupKey = 0;

	return Array.from({ length: c.layers }, (_, i) => {
		let degreeOffset: number;
		const radiusOffset = sRand(-c.jitterRadius, c.jitterRadius) * c.intensity;
		const degreeSpan = Math.max(2, sRand(3, c.jitterDegree) * c.intensity);
    const baseWidth = props.width ?? 5;
    const rawWidth = baseWidth + sRand(-c.jitterWidth, c.jitterWidth) * c.intensity;

    const widthVal = Math.min(baseWidth * 0.7, Math.max(baseWidth * 0.1, rawWidth));

		switch (c.mode) {
			case "random":
				degreeOffset = sRand(0, 360);
				break;

			case "alternating": {
				const dir = i % 2 === 0 ? -1 : 1;
				const dist = sRand(spread * 0.3, spread) * ((i + 1) / c.layers);
				degreeOffset = props.degreeOffset + dir * dist;
				break;
			}

			case "progressive": {
				const progress = (i + 1) / c.layers;
				degreeOffset = props.degreeOffset + spread * progress;
				break;
			}

			default:
				degreeOffset = sRand(0, 360);
		}

		return {
			radius: props.radius + radiusOffset,
			degree: degreeSpan,
			width: widthVal,
			degreeOffset: ((degreeOffset % 360) + 360) % 360,
			hueRotate: i * c.colorShift,
			opacity: 0.35 + sRand(0, 0.45),
			key: groupKey++,
		};
	});
}

const glitchArcs = ref<GlitchArc[]>(generateLayers());

// Re-generate immediately (non-animated) when structural props change
watch(
	() => [
		props.radius,
		props.degree,
		props.degreeOffset,
		props.glitch,
		props.color,
		props.glitchConfig,
	],
	() => {
		glitchArcs.value = generateLayers();
	},
);
</script>

<template>
	<!-- Base (clean) arc — no filter, optional gaps -->
	<Arc
		:center="props.center"
		:radius="props.radius"
		:degree="props.degree"
		:degreeOffset="props.degreeOffset"
		:color="props.color"
		:width="props.width"
		:stroke-dasharray="config.dashPattern || 'none'"
	/>

	<!-- Glitch layers -->
	<template v-for="(arc, g) in config.numberOfGroups" :key="`group-${g}`">
		<g
			:class="`group-glitch-${g}`"
			:style="{
				'--glitch-duration': rand(1, 10) + 's',
				'--offset-deg': rand(10, 50) + 'deg',
			}"
		>
			<template
				v-for="(arc, i) in glitchArcs.filter(
					(arc) => arc.key % config.numberOfGroups === g,
				)"
				:key="`glitch-${i}`"
			>
				<Arc
					:center="props.center"
					:radius="arc.radius"
					:degree="arc.degree"
					:degreeOffset="arc.degreeOffset"
					:color="props.color"
					:width="arc.width"
					:style="{
						filter: `hue-rotate(${arc.hueRotate}deg)`,
						opacity: arc.opacity,
					}"
				/>
			</template>
		</g>
	</template>
</template>

<style scoped>
/* Define all groups with the same base styles */
[class^="group-glitch-"] {
	transform-origin: 50px 50px;
	animation: spin var(--glitch-duration) ease-in-out alternate infinite;
}

@keyframes spin {
	from {
		transform: rotate(calc(var(--offset-deg) * -1));
	}
	to {
		transform: rotate(var(--offset-deg));
	}
}
</style>
