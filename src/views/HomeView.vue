<script setup lang="ts">
import Logo from "../components/icons/Logo.vue";
import Button from "../components/Button.vue";
import { ref } from "vue";

const btnTxt = ref("START");
const disable = ref(false);
function start() {
	// fake loading
	disable.value = true;

	setInterval(() => {
		btnTxt.value += ".";
		btnTxt.value = btnTxt.value.replace("......", "");
	}, 500);
}
</script>

<template>
	<main>
		<div class="position-relative">
			<!-- Logo stays absolute but sits behind -->
			<Logo
				size="450px"
				class="position-absolute top-0 start-0 translate-middle"
			/>

			<!-- Content sits on top -->
			<div
				class="landing d-flex align-items-center justify-content-center position-relative z-1"
			>
				<div class="landing-text text-center">
					<h1 class="c-bold">Bienvenue sur Ticket2Caisse</h1>
					<p>Miaou miaou miaou</p>
				</div>
			</div>
		</div>
		<div class="center">
			<Button :text="btnTxt" @click="start" :disabled="disable" />
		</div>
	</main>
</template>

<style lang="css">
.center {
	position: absolute;
	top: 0;
	display: flex;
	justify-content: center; /* Centre horizontalement */
	align-items: center; /* Centre verticalement */
	min-height: 100%; /* Occupe toute la hauteur de la vue */
	min-width: 100%;
	margin: 0; /* Supprime la marge par défaut du <body> */
}
</style>
