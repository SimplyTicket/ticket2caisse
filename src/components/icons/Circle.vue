<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		center: [number, number];
		radius?: number;
		color?: string;
	}>(),
	{
		size: 50,
		color: "blue",
	},
);
</script>

<template>
		<circle :cx="props.center[0] || props.radius / 2" :cy="props.center[1] || props.radius / 2" :r="props.radius" :fill="props.color" />
</template>

<style scoped>
.circle {
	border-radius: 50%;
}
</style>
