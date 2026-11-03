<script setup lang="ts">
import Button from "@/components/Button.vue";
import Caddriage from "@/components/Caddriage.vue";
import CaddriBox from "@/components/CaddriBox.vue";
import CaddriContainer from "@/components/CaddriContainer.vue";
import CorruptedCore from "@/components/CorruptedCore.vue";
import Francophonering from "@/components/Francophonering.vue";
import GetMyBtn from "@/components/GetMyBtn.vue";
import Logo from "@/components/icons/Logo.vue";
import { onMounted, ref, watch } from "vue";

interface Box {
	x: number, y: number, width: number, height: number, totalHeight: number
}

const folowHeight = ref<Box[]>([])

watch(folowHeight, () => {
	console.log(folowHeight)
})

const numberOfPixel = ref(0)
const seed = ref(0)

function updateData(id: number, data: Box) {
	folowHeight.value[id] = data
}

function getData(id: number): Box {
	return folowHeight.value[id] ?? { x: 0, y: 0, height: 0, width: 0, totalHeight: 0 }
}

onMounted(() => {
	setInterval(() => {
		numberOfPixel.value++
		if (numberOfPixel.value > 50) {
			seed.value++
			numberOfPixel.value = 5
		}
	}, 50)
})

</script>


<template>
	<div>
		<Caddriage :thickness="6" />
		<CorruptedCore class="" id="core" :pixel-size="25" center-top="125px" center-left="125px" :radius="5"
			:number-of-pixel="numberOfPixel" :seed="seed" />
	</div>
	<div class="position-relative">

		<CaddriContainer>
			<CaddriBox id="box-1" :position="{ x: 1, y: 1, width: 7, height: 1 }"
				:position-mobile="{ x: 1, y: 1, width: 4, height: 1 }"
				@update-height="(data) => { updateData(1, data) }">
				<div class="center">
					<h1 class="text-xl">The fuck is that ?</h1>
				</div>
			</CaddriBox>

			<CaddriBox id="box-1-1" :position="{ x: 9, y: 1, width: 2, height: 1 }"
				:position-mobile="{ x: 1, y: -10, width: 1, height: 1 }">
				<GetMyBtn />
			</CaddriBox>

			<CaddriBox id="box-6" :position="{ x: 1, y: getData(1).totalHeight + 1, width: 7, height: 1 }"
				:position-mobile="{ x: 0, y: getData(1).totalHeight + 1, width: 6, height: 1, fitContent: true }"
				@update-height="(data) => { updateData(6, data) }">
				<div class="d-flex h-100 justify-content-between">
					<div class="d-flex h-100 ">
						<span class="text-vertical text-center c-bold">Links</span>
						<div class="btn-holder d-flex flex-column justify-content-around">
							<a href="https://neocities.org/site/simply-ticket">
								<img src="/images/btn/neocities-pink.gif" alt="">
							</a>
							<a href="https://github.com/SimplyTicket/ticket2caisse">
								<img src="/images/btn/github.png" alt="">
							</a>
						</div>
					</div>
					<div class="d-flex h-100">
						<div class="btn-holder d-flex flex-column flex-wrap gap-1 justify-content-center">
							<img src="/images/btn/263gggk.gif" />
							<img src="/images/btn/aperture_labs.jpg" />
							<img src="/images/btn/button25.gif" />
							<img src="/images/btn/cyberdog.gif" />
							<img src="/images/btn/github.png" />
							<img src="/images/btn/home-assistant.gif" />
							<img src="/images/btn/made_with_macintosh~black.gif" />
							<img src="/images/btn/neocities-pink.gif" />
							<img src="/images/btn/right_to_repair_01.jpg" />
							<img src="/images/btn/this_site_is_certified_100_percent_cookie_free.gif" />
							<img src="/images/btn/transrats.gif" />
							<img src="/images/btn/twopaws.png" />
						</div>
						<span class="text-vertical-rl text-center c-bold">Button</span>

					</div>

				</div>
			</CaddriBox>




			<CaddriBox id="box-2" class="p-2"
				:position="{ x: 1, y: getData(6).totalHeight + 1, width: 7, height: 4, fitContent: true }"
				:position-mobile="{ x: 0, y: getData(6).totalHeight + 1, width: 6, height: 3, fitContent: true }"
				@update-height="(data) => { updateData(2, data) }">
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

			<CaddriBox id="box-3"
				:position="{ x: 9, y: getData(1).totalHeight + 1, height: getData(2).height + getData(6).height +1, width: 2 }"
				:position-mobile="{ x: 1, y: getData(2).totalHeight + 1, width: 5, height: 2 }"
				@update-height="(data) => { updateData(3, data) }">

				<div id="Rings">

					<div class="d-flex c-bold justify-content-center text-center">
						Ring(s)
					</div>
					<div class="d-felex justify-content-center align-content-center text-center py-2">
						<Francophonering />
					</div>
				</div>
				<div id="nav" class="d-flex c-bold justify-content-center text-center pb-2">
					Pages
				</div>
				<div class="text-xs text-center">
					Here no other pages yet :/
				</div>

			</CaddriBox>

			<CaddriBox id="box-4"
				:position="{ x: 1, y: getData(2).totalHeight + 1, height: getData(5).height, width: 4, fitContent: true }"
				:position-mobile="{ x: 0, y: getData(3).totalHeight + 1, width: 5, height: 2, fitContent: true }"
				@update-height="(data) => { updateData(4, data) }">
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
				:position="{ x: 6, y: getData(2).totalHeight + 1, height: getData(4).height, width: 5, fitContent: true }"
				:position-mobile="{ x: 1, y: getData(4).totalHeight, width: 5, height: 2, fitContent: true }"
				@update-height="(data) => { updateData(5, data) }">
				<div>
					<h3 class="p-2">Next things to implement</h3>
					<ul>
						<li>Add more cyberpunk and glitched effect</li>
						<li>A new page about my diy projects </li>
						<li>Collet some button of sites i like (maybe we could be neighbour :3)</li>
						<li>An update page mayBe ?</li>
					</ul>
				</div>
			</CaddriBox>
		</CaddriContainer>


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

#core {}

.btn-holder img:hover {
	transform: scale(1.5);
}
</style>
