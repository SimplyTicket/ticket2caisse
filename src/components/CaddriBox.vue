<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const props = withDefaults(
	defineProps<{
		position: { x1: number; y1: number; x2: number; y2: number };
		positionMobile: { x1: number; y1: number; x2: number; y2: number };
	}>(),
	{},
);

// 1. Use window.innerWidth directly (Logical CSS pixels)
const ScreenWidth = ref(window.innerWidth);
const col = ref(ScreenWidth.value < 768 ? 6 : 12);
const spacing = ref(ScreenWidth.value / (col.value - 1));
const pixelsRatio = window.devicePixelRatio

const width = ref();
const height = ref();
const position = ref(props.position);
function onResize() {
	ScreenWidth.value = window.innerWidth;
	col.value = ScreenWidth.value < 768 ? 6 : 12;
	spacing.value = ScreenWidth.value / (col.value - 1);

	position.value = col.value == 6 ? props.positionMobile : props.position;
	width.value = position.value.x2 - position.value.x1;
	height.value = position.value.y2 - position.value.y1;
}

onMounted(() => {
	window.addEventListener("resize", onResize);
});

onUnmounted(() => {
	window.removeEventListener("resize", onResize);
});

onResize();
</script>

<template>
	<div
		class="block"
		:style="{
			marginTop: `${position.y1 * spacing - 3 * pixelsRatio}px`,
			marginLeft: `${position.x1 * spacing - 3 * pixelsRatio}px`,
			width: `${width * spacing + 6.4 * pixelsRatio}px`,
			height: `${height * spacing + 6.4 * pixelsRatio}px`,
		}"
	>
		<slot></slot>
	</div>
</template>

<style lang="css">
.block {
	position: absolute;
	background-color: var(--color-primary);


}

/* Chrome, Safari, Edge */
::-webkit-scrollbar {
	display: none;
}

/* Firefox */
* {
	scrollbar-width: none;
}
</style>
