<script setup lang="ts">
import Button from "@/components/Button.vue";
import Caddriage from "@/components/Caddriage.vue";
import CaddriBox from "@/components/CaddriBox.vue";
import CorruptedCore from "@/components/CorruptedCore.vue";
import Francophonering from "@/components/Francophonering.vue";
import Logo from "@/components/icons/Logo.vue";
import { onMounted, ref, watch } from "vue";

const folowHeight = ref({ box1: { x: 0, y: 0, width: 0, height: 0, totalHeight: 0 }, box2: { x: 0, y: 0, width: 0, height: 0, totalHeight: 0 }, box3: { x: 0, y: 0, width: 0, height: 0, totalHeight: 0 }, box4: { x: 0, y: 0, width: 0, height: 0, totalHeight: 0 } })

watch(folowHeight, () => {
	console.log(folowHeight)
})

const numberOfPixel = ref(0)
const seed = ref(0)

onMounted(() => {
	setInterval(() => {
		numberOfPixel.value++
		if (numberOfPixel.value > 50) {
			seed.value++
			numberOfPixel.value = 5
		}
	}, 50)
})

function copyBtnCode() {
	navigator.clipboard.writeText(`<a href="https://simply-ticket.neocities.org/"><img src="https://simply-ticket.neocities.org/button.gif" /></a>`).then(
  function () {
	console.log('succes')
  },
  function () {
	console.log('succes')
  },
);
}
</script>


<template>
	<div>
		<Caddriage :thickness="6" />
	</div>
	<div class="position-relative">
		<div>
			<CaddriBox id="box-1" :position="{ x: 1, y: 1, width: 7, height: 1 }"
				:position-mobile="{ x: 1, y: 1, width: 4, height: 1 }"
				@update-height="(data) => { folowHeight.box1 = data }">
				<div class="center">
					<h1 class="text-xl">The fuck is that ?</h1>
				</div>
				<CorruptedCore class="z-999" :pixel-size="25" center-top="50%" center-left="45%" :radius="8"
					:number-of-pixel="numberOfPixel" :seed="seed" />
			</CaddriBox>

			<CaddriBox id="box-1-1" :position="{ x: 9, y: 1, width: 2, height: 1 }"
				:position-mobile="{ x: 1, y: -10, width: 1, height: 1 }">
				<div class="center">
					<p>Get my btn</p>
					<img src="/button.gif" class="logo-button" sizes="" />
					<Button variant="secondary" :height="25" :width="125" @click="copyBtnCode" id="copy-btn">copy code</Button>
				</div>
			</CaddriBox>




			<CaddriBox id="box-2" class="p-2"
				:position="{ x: 1, y: folowHeight.box1.totalHeight + 1, width: 7, height: 5, fitContent: true }"
				:position-mobile="{ x: 0, y: folowHeight.box1.totalHeight + 1, width: 6, height: 6, fitContent: true}"
				@update-height="(data) => { folowHeight.box2 = data }">
				<div class="p-2 d-flex flex-column justify-content-between h-100 max-h-10-lines">
					<p class="">
						First thing thanks for stopping by, I'm happy someone see this ;-)
					</p>
					<div>
						<p class="pt-2">
							I'm doing this bc i used to be a developer, but since IA I used to
							enjoy coding i want to find this back here...
						</p>
						<p class="pt-2">
							And it's feel good to spend some nights code all of this
						</p>
						<p class="text-xs">
							I spend so much time on the little cross here and it was amazing
						</p>
					</div>
					<div>
						<h2 class="pt-3">Technical section</h2>
						<p class="text-xs">
							Yes i'm a developer i have to talk about this :3
						</p>
					</div>
					<div>
						<p class="pt-2">
							This site is developed with
							<span class="c-bold">vue.js</span> nice framework and beginner
							friendly
						</p>
						<p class="pt-0">
							And for css i'm using a stripdown version of bootstrap for
							spacing, flex utilities like this
						</p>
						<p>
							I try to make this site responcive but it's harder than i planned
						</p>
					</div>
					<div>
						<p>
							As for AI usage you might guess from above i don't use it all of
							this comes form my head :3, in case i do use it it's a local llm
							running on my mac
						</p>
					</div>
				</div>
			</CaddriBox>

			<CaddriBox id="box-3" :position="{ x: 9, y: folowHeight.box1.totalHeight + 1, height: folowHeight.box2.height, width: 2 }"
				:position-mobile="{ x: 1, y: folowHeight.box2.totalHeight + 1, width: 5, height: 2 }"
				@update-height="(data) => { folowHeight.box3 = data }">
				<div class="d-flex c-bold justify-content-center text-center">
					Imagin there will be button and links here
				</div>
				<Francophonering />
			</CaddriBox>
		</div>
		<div>
			<CaddriBox id="box-4"
				:position="{ x: 1, y: folowHeight.box2.totalHeight + 1, height: 2, width: 4, fitContent: true }"
				:position-mobile="{ x: 0, y: folowHeight.box3.totalHeight + 1, width: 5, height: 2, fitContent: true }"
				@update-height="(data) => { folowHeight.box4 = data }">
				<div>
					<h3 class="p-2">Things i want to talk about here</h3>
					<ul>
						<li>Open source smart home and sensor i build for cheap</li>
						<li>Devlomment an code cool technologies</li>
						<li>Decentralized infrastructures</li>
					</ul>
				</div>
			</CaddriBox>
			<CaddriBox id="box-5"
				:position="{ x: 6, y: folowHeight.box2.totalHeight + 1, height: folowHeight.box4.height, width: 5, }"
				:position-mobile="{ x: 1, y: folowHeight.box4.totalHeight, width: 5, height: 2, fitContent: true }">
				<div>
					<h3 class="p-2">Next things to implement</h3>
					<ul>
						<li>Join the francophone ring</li>
						<li>Add more yberpunk and glitched effect</li>
						<li>A new page about my diy projects </li>
						<li>Collet some button of sites i like</li>
					</ul>
				</div>
			</CaddriBox>
		</div>

		<Logo size="450px" class="position-absolute top-0 start-0 translate-middle" />
	</div>
</template>

<style lang="css" scoped>
.max-h-10-lines {
	max-height: 20lh;
}

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

.logo-button {
	width: 40%;
}

#copy-btn {
	width: 75%;
}
</style>
