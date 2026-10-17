<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    center: [number, number];
    radius: number;
    degree: number;
		width?: number;
    degreeOffset: number;
    color?: string;
  }>(),
  {
    color: 'blue',
		width: 5,
  },
);

// Conversion degrés -> radians
const toRadians = (degree: number) => (degree * Math.PI) / 180;

// Calcul des coordonnées d'un point sur le cercle
const getPoint = (angle: number): [number, number] => {
  const radians = toRadians(angle);

  return [
    props.center[0] + props.radius * Math.cos(radians),
    props.center[1] + props.radius * Math.sin(radians),
  ];
};

// Calcul du chemin SVG
const arcPath = computed(() => {
  const startAngle = props.degreeOffset;
  const endAngle = props.degreeOffset + props.degree;

  const [startX, startY] = getPoint(startAngle);
  const [endX, endY] = getPoint(endAngle);

  // Le SVG utilise 1 pour un arc supérieur à 180°
  const largeArcFlag = Math.abs(props.degree) > 180 ? 1 : 0;

  // Sens de l'arc : 1 = horaire, 0 = antihoraire
  const sweepFlag = props.degree >= 0 ? 1 : 0;

  return [
    `M ${startX} ${startY}`,
    `A ${props.radius} ${props.radius} 0`,
    `${largeArcFlag} ${sweepFlag}`,
    `${endX} ${endY}`,
  ].join(' ');
});
</script>

<template>
  <svg
    width="100%"
    height="100%"
    :viewBox="`0 0 ${center[0] * 2} ${center[1] * 2}`"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :d="arcPath"
      fill="none"
      :stroke="color"
      :stroke-width="props.width"

    />
  </svg>
</template>
