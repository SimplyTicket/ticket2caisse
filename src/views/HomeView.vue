<script setup lang="ts">
import Logo from "../components/icons/Logo.vue";
import Button from "../components/Button.vue";
import { ref } from "vue";
import Corrupted from "@/components/CorruptedPixel.vue";
import CorruptedCore from "@/components/CorruptedCore.vue";
import CorruptedPixel from "@/components/CorruptedPixel.vue";
import router from "@/router/index.ts";

const btnTxt = ref("START");
const disable = ref(false);
const numberOfPixel = ref(0);
const bigPixel = ref(0);
var interval: number;
function start() {
	// fake loading
	disable.value = true;
	bigPixel.value = 1;

	interval = setInterval(() => {
		numberOfPixel.value++;
		if (numberOfPixel.value > 30) clearInterval(interval);
		setTimeout(() => {
			numberOfPixel.value = 0;
		}, 750);
		setTimeout(() => {
			bigPixel.value = 0;
			router.push("/hello");
		}, 1500);
	}, 20);
}
</script>

<template>
	<main>
		<div class="position-relative">
			<Logo
				size="450px"
				class="position-absolute top-0 start-0 translate-middle"
			/>
		</div>
		<div class="center">
			<CorruptedPixel
				v-if="bigPixel > 0"
				:filter-id="0"
				:size="350"
				:positionX="2"
				:position-y="1"
			/>

			<div
				class="landing d-flex align-items-center justify-content-center position-relative z-1 pb-5"
			>
				<div class="landing-text text-center">
					<h1 class="c-bold">Bienvenue sur Ticket2Caisse</h1>
					<p>Flasing lights waring</p>
				</div>
			</div>

			<div class="parent-wrapper" style="position: relative">
				<CorruptedCore
					:pixel-size="75"
					center-top="50%"
					center-left="50%"
					:radius="5"
					:number-of-pixel="numberOfPixel"
					:seed="13513"
				/>
			</div>
			<Button :text="btnTxt" @click="start" :disabled="disable" />
		</div>
		<div id="log-container" class="w-25 p-3 position-absolute bottom-0 end-0">
			oui
		</div>
	</main>
</template>

<style lang="css" scoped>
.center {
	position: absolute;
	top: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100%;
	min-width: 100%;
	margin: 0;
}

#log-container {
	border: 2px white;
}
</style>
