<script setup lang="ts">
import Logo from "../components/icons/Logo.vue";
import Button from "../components/Button.vue";
import { ref } from "vue";
import Corrupted from "@/components/CorruptedPixel.vue";
import CorruptedCore from "@/components/CorruptedCore.vue";

const btnTxt = ref("START");
const disable = ref(false);
const numberOfPixel = ref(0)
function start() {
	// fake loading
	disable.value = true;

	setInterval(() => {
		btnTxt.value += ".";
		numberOfPixel.value ++
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
					<p>Flasing lights waring</p>
				</div>
			</div>
		</div>
		<div class="center">
			<CorruptedCore :pixel-size="50" center-top="50%" center-left="50%" :radius="3" :number-of-pixel="numberOfPixel" :seed="13513" />
			<Button :text="btnTxt" @click="start" :disabled="disable" />
		</div>
	</main>
</template>

<style lang="css">
.center {
	position: absolute;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100%;
	min-width: 100%;
	margin: 0;
}

.landing-text {
	padding-top: 35vh;
}
</style>
