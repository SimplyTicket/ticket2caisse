<script setup lang="ts">
import Parallelogram from "./icons/Parallelogram.vue";
import { ref } from 'vue';
const props = withDefaults(

	defineProps<{
		text: string;
		disabled?: boolean;
  }>(),
	{
		disabled: false
	}
)

const emit = defineEmits(['click'])

</script>

<template>
	<button class="btn-parallelo position-relative" :disabled="props.disabled" @click="emit('click');">
		<div class="position-relative d-flex align-items-center justify-content-center">
			<span class="z-1 c-bold text-2xl mt-1">{{ props.text }}</span>
		</div>

		<svg class="" width="200px" height="50px" viewBox="0 0 200 50">
			<Parallelogram
				:largeur="200"
				:hauteur="50"
				:angle="20"
				:color="'var(--btn-fill)'"
			/>
		</svg>
	</button>
</template>

<style scoped>
button {
	cursor: pointer;

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
  pointer-events: none; /* 👈 Laisse les clics passer au <button> */
}
</style>
