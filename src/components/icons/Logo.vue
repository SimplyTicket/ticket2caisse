<script setup lang="ts">
import Arc from "./Arc.vue";
import GlitchedArc, { type GlitchConfig } from "./GlitchedArc.vue";
import Circle from "./Circle.vue";

const props = withDefaults(
  defineProps<{
    size: string;
  }>(),
  {},
);

const glitchConfig: GlitchConfig = {
	layers: 15,
	intensity: 1,
	mode: "progressive",
	colorShift: 2,
	jitterRadius: 8,
	jitterDegree: 20,
	animate: false,
	dashPattern: "4 2 12 6 2 4",
	numberOfGroups: 8,
	jitterWidth: 20,
	jitterOffset: 30,
	speed: 0,
};
</script>

<template>
	<svg
		:width="props.size"
		:height="props.size"
		viewBox="0 0 100 100"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Circle :center="[50, 50]" :radius="20" color="var(--color-primary-mute)" />

		<!-- Arc statique (pas de rotation) -->
		<GlitchedArc
			:center="[50, 50]"
			:radius="20"
			:degree="174"
			:width="10"
			:degreeOffset="20"
			color="var(--color-primary)"
			:class="10"
			:glitch-config="glitchConfig"
		/>
		<GlitchedArc
			:center="[50, 50]"
			:radius="28"
			:degree="95"
			:degreeOffset="0"
			color="var(--color-secondary)"
			:width="10"
			:glitch-config="glitchConfig"
		/>
	</svg>
</template>

<style>
.spin-group {
	transform-origin: 50px 50px; /* centre du viewBox */
	animation: spin 3s ease-in 0s 1 forwards;
}

@keyframes spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(365deg);
	}
}
</style>
