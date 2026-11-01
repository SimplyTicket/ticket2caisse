<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const props = withDefaults(
	defineProps<{
		position: { x: number; y: number; width: number; height: number, fitContent?: boolean | null };
		positionMobile: { x: number; y: number; width: number; height: number };
	}>(),
	{},
);

// 1. Use window.innerWidth directly (Logical CSS pixels)
const ScreenWidth = ref(window.innerWidth);
const col = ref(ScreenWidth.value < 768 ? 7 : 13);
const spacing = ref(ScreenWidth.value / (col.value - 1));
const blockRef = ref<HTMLElement | null>(null);


const width = ref();
const height = ref();
const position = ref(props.position);
function onResize() {
	ScreenWidth.value = window.innerWidth;
	col.value = ScreenWidth.value < 768 ? 7 : 13;
	spacing.value = ScreenWidth.value / (col.value - 1);

	position.value = col.value == 6 ? props.positionMobile : props.position;
	width.value = position.value.width;

	if (props.position.fitContent) {
		if (!blockRef.value) return;

		const minHeight = blockRef.value.scrollHeight
		console.log(Math.trunc(minHeight / spacing.value) + 1)
		height.value = Math.trunc(minHeight / spacing.value) + 1
		console.log(height.value)

	} else {
		height.value = position.value.height;
	}

}

onMounted(() => {
	window.addEventListener("resize", onResize);
	onResize()
});

onUnmounted(() => {
	window.removeEventListener("resize", onResize);
});

onResize();
</script>

<template>
	<div class="block fg-contrast-primary" :style="{
		marginTop: `${position.y * spacing - 3}px`,
		marginLeft: `${position.x * spacing - 3}px`,
		width: `${width * spacing + 6.4}px`,
		height: `${height * spacing + 6.4}px`,
	}">
		<div class="content" ref="blockRef">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="css">
.block {
	position: absolute;
	background-color: var(--color-primary);
	padding: 6px;

}

.content {
	height: 100%;
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
