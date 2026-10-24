<script lang="ts" setup>
import { watch } from "vue";
import CorruptedPixel from "./CorruptedPixel.vue";
import createMulberry32 from "@/utils/rng.ts";

const props = withDefaults(
	defineProps<{
		pixelSize: number;
		isTrigger?: boolean;
		centerLeft: string;
		centerTop: string;
		radius: number;
		numberOfPixel?: number;
		seed?: number;
	}>(),
	{
		isTrigger: true,
		seed: Math.round(Math.random() * 10000),
		numberOfPixel: 10,
	},
);

var rng = createMulberry32(props.seed);

watch(
	() => [props.numberOfPixel],
	() => {
		rng = createMulberry32(props.seed);
	},
);
</script>

<template>
	<div class="container" :style="{top: props.centerTop, left: props.centerLeft} ">
		<div class="holder">
			<CorruptedPixel
				v-for="value in numberOfPixel"
				:size="props.pixelSize"
				:position-x="rng.int(props.radius * 2) - radius"
				:position-y="rng.int(props.radius * 2) - radius"
				:filter-id="value"
			/>
		</div>
	</div>
</template>

<style lang="css">
.container {
	position: absolute;
	top: 0;
	left: 0;
}

.holder {
	position: relative;
	z-index: 999;
}
</style>
