<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = withDefaults(
    defineProps<{
        thickness: number;
    }>(),
    {},
);

// 1. Use window.innerWidth directly (Logical CSS pixels)
const width = ref(window.innerWidth);
const height = ref(document.documentElement.scrollHeight);

const col = ref(width.value < 768 ? 6 : 12);

// 2. Calculate spacing based on (col - 1) to center the last one on the edge
const spacing = ref((width.value) / (col.value - 1));

console.log(Math.round(height.value / spacing.value))

const grid = ref(
    Array(Math.round(height.value / spacing.value) + 1)
        .fill(null)
        .map(() => Array(col.value).fill(null)),
);



function onResize() {
    const colOld = col.value;

    width.value = window.innerWidth;
		height.value = document.documentElement.scrollHeight;

    // Update columns based on breakpoint
    col.value = width.value < 768 ? 6 : 12;

    // Recalculate spacing: Width divided by intervals (col - 1)
    // If you want the first one ALSO half visible, use: width / col
    spacing.value = (width.value ) / (col.value - 1)

    if (col.value != colOld) {
        grid.value = Array(Math.round(height.value / spacing.value) + 1)
            .fill(null)
            .map(() => Array(col.value).fill(null));
    }
}

onMounted(() => {
    window.addEventListener("resize", onResize);
});

onUnmounted(() => {
    window.removeEventListener("resize", onResize);
});
</script>

<template>
	<div class="grid-container w-100">
		<div
			class="ligne d-flex justify-content-between"
			v-for="(row, rowIndex) in grid"
		>
			<div
				v-for="(cell, cellIndex) in row"
				class="cell position-absolute"
				:style="{
					top: `${spacing * rowIndex}px`,
					left: `${spacing * cellIndex}px`,
				}"
			>
				<svg class="grid-svg">
					<!-- Vertical line -->
					<line
						x1="20"
						y1="0"
						x2="20"
						y2="40"
						:stroke-width="thickness"
						stroke="var(--color-primary)"
					/>
					<!-- Horizontal line -->
					<line
						x1="0"
						y1="20"
						x2="40"
						y2="20"
						:stroke-width="thickness"
						stroke="var(--color-primary)"

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
	width: 100vw;
	overflow: hidden;
	pointer-events: none;
}

.grid-svg {
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.cell {
	transform: translate(-20px, -20px);
	height: 40px;
	width: 40px;
}
</style>
