<script setup lang="ts">

var props = withDefaults(
	defineProps<{
		largeur: number;
		hauteur: number;
		angle: number;
		color: string;
	}>(),
	{},
);

const largeurOffset = props.hauteur * Math.tan((props.angle * Math.PI) / 180);

</script>

<template>
		<path :d="`M${largeurOffset},0 L${props.largeur },0 L${props.largeur - largeurOffset},${props.hauteur} L0,${props.hauteur} Z`" :fill="props.color"/>
</template>