<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = withDefaults(
	defineProps<{
		thickness: number;
	}>(),
	{},
);
const width = ref(window.innerWidth)
const height = ref(document.documentElement.scrollHeight)
const col = ref(width.value < 768 ? 6 : 12)

const grid = ref(Array(5).fill(null).map(() => Array(col.value).fill(null)))
const spacing = ref(((width.value * window.devicePixelRatio -12 ) / col.value))

function onResize() {
	const colOld = col.value

	width.value = window.innerWidth;
	// on mobile array of 6
	col.value = width.value < 768 ? 6 : 12

	spacing.value = ((width.value * window.devicePixelRatio -12 ) / col.value)

	if (col.value != colOld) {
		grid.value = Array(5).fill(null).map(() => Array(col.value).fill(null))
	}
}

onMounted(() => {
    window.addEventListener('resize', onResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', onResize)
})
</script>

<template>
	<div class="grid-container w-100">
			<div class="ligne d-flex justify-content-between" v-for="(row, rowIndex) in grid">
				<div v-for="(cell, cellIndex) in row" class="cell position-absolute" :style="{top: `${spacing * rowIndex - 20}px`, left: `${spacing * cellIndex - 20}px`}">
			<svg class="grid-svg" >
				<!-- Vertical line -->
				<line
					x1="20"
					y1="0"
					x2="20"
					y2="40"
					:stroke-width="thickness"
					stroke="#ccc"
				/>
				<!-- Horizontal line -->
				<line
					x1="0"
					y1="20"
					x2="40"
					y2="20"
					:stroke-width="thickness"
					stroke="#ccc"
				/>
			</svg>
				</div>
			</div>


	</div>
</template>

<style scoped>
.grid-container {
	position: absolute;
	min-height: 100vh;
	pointer-events: none;

}

.grid-svg {
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
