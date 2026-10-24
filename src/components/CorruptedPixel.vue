<script lang="ts" setup>
import { ref } from "vue";

const props = withDefaults(
	defineProps<{
		filterId?: number;
		size: number
		positionX:number
		positionY:number
	}>(),
	{
		filterId: 0,
	},
);

// Store filters as objects instead of strings
const filterConfigs = [
	{ backdropFilter: "url(#distort) hue-rotate(120deg)" },
	{
		backdropFilter:
			"url(#distort) invert(0%) sepia(100%) hue-rotate(280deg) saturate(100%) contrast(100%)",
	},
	{ backdropFilter: "invert(20%) sepia(0%) hue-rotate(67deg)" },
	{
		background: "rgba(255, 0, 179, 0.611)",
		backgroundBlendMode: "saturation",
		backdropFilter: "invert(100%) hue-rotate(67deg)",
	},
	{
		background: "rgba(0, 255, 8, 0.312)",
		backdropFilter: "invert(100%) hue-rotate(67deg)",
	},
];


</script>

<template>
	<svg style="display: none">
		<defs>
			<!-- <			<filter id="distort" x="-20%" y="-20%" width="140%" height="140%">
				<feTurbulence
					type="fractalNoise"
					baseFrequency="0.03"
					numOctaves="3"
					seed="2"
					result="noise"
				/>
				<feDisplacementMap
					in="SourceGraphic"
					in2="noise"
					scale="18"
					xChannelSelector="R"
					yChannelSelector="G"
				/>
			</filter> -->
			>
			<filter id="distort" x="-20%" y="-20%" width="140%" height="140%">
				<!-- Create white flood -->
				<feFlood flood-color="white" result="flood" />

				<!-- Draw a square shape -->

				<!-- Mask white to only show inside the square -->
				<feComposite
					in="flood"
					in2="squareShape"
					operator="in"
					result="displacementMap"
				/>

				<feDisplacementMap
					in="SourceGraphic"
					in2="displacementMap"
					scale="40"
					xChannelSelector="R"
					yChannelSelector="G"
				/>
			</filter>
		</defs>
	</svg>
	<div
		class="corrupted"
		:style="{
			transform: `translate(${props.size * props.positionX}px, ${props.size * props.positionY}px)`, width: `${props.size}px`, height: `${props.size}px`,
			...(filterConfigs[props.filterId % Object.keys(filterConfigs).length]),
		}"
	></div>
</template>

<style lang="css">
.corrupted {
	position: absolute;
	top: 0;
	left: 0;

	/* inset: -10%; Extend beyond viewport to hide edges */
}
</style>
