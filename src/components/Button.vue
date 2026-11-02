<script setup lang="ts">
import Parallelogram from "./icons/Parallelogram.vue";
import { ref } from 'vue';
const props = withDefaults(

	defineProps<{
		text?: string;
		disabled?: boolean;
		variant?: 'primary' | 'secondary';
		height?: number
		width?: number 
  }>(),
	{
		disabled: false,
		variant: 'primary',
		height: 50,
		width: 200,
	}
)

const emit = defineEmits(['click'])

</script>

<template>
	<button class="btn-parallelo position-relative" :disabled="props.disabled" @click="emit('click');">
		<div class="position-relative d-flex align-items-center justify-content-center z-1">
			<slot></slot>
		</div>

		<svg class="" width="200px" height="50px" :viewBox="`0 0 ${props.width} ${props.height}`">
			<Parallelogram
				:largeur="props.width"
				:hauteur="props.height"
				:angle="20"
				:color="`var(--color-${props.variant})`"
			/>
		</svg>
	</button>
</template>

<style scoped>
button {
	cursor: pointer;
	color: black;
	font-family: inherit;

	background: none;
	border: none;
	height: 50px;
	width: 200px;
	 --btn-fill: var(--color-primary);
}

button:hover {
  --btn-fill: var(--color-primary-mute); /* ou autre */
}

/* Désactivé : pas de changement */
button:disabled {
  cursor: not-allowed;
	color: initial;
  --btn-fill: var(--color-primary-mute); /* ou autre */
}

svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
</style>
