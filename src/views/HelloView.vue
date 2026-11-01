<script setup lang="ts">
import Caddriage from "@/components/Caddriage.vue";
import CaddriBox from "@/components/CaddriBox.vue";
import Logo from "@/components/icons/Logo.vue";
</script>

<template>
	<div>
		<Caddriage :thickness="6" />
	</div>
	<div class="position-relative">
		<div>
			<CaddriBox
				:position="{ x1: 1, y1: 1, x2: 10, y2: 2 }"
				:position-mobile="{ x1: 1, y1: 1, x2: 4, y2: 2 }"
			>
				<div class="center">
					<h1>The fuck is that ?</h1>
				</div>
			</CaddriBox>

			<CaddriBox
				class="p-2"
				:position="{ x1: 1, y1: 3, x2: 7, y2: 7 }"
				:position-mobile="{ x1: 0, y1: 3, x2: 5, y2: 9 }"
			>
			<div class="p-2 d-flex flex-column justify-content-between h-100 max-h-10-lines">
				<p class="">First thing thanks for stopping by, I'm happy someone see this ;-)</p>
				<div>
					<p class="pt-2">I'm doing this bc i used to be a developer, but since IA I used to enjoy coding i want to find this back here...</p>
					<p class="pt-2">And it's feel good to spend some nights code all of this</p>
					<p class="text-xs">I spend so much time on the little cross here and it was amazing</p>
				</div>
				<div>
					<h2 class="pt-3">Technical section</h2>
					<p class="text-xs">Yes i'm a developer i have to talk about this :3</p>
				</div>
				<div>
					<p class="pt-2">This site is developed with <span class="c-bold">vue.js</span> nice framework and beginner friendly</p>
					<p class="pt-0">And for css i'm using a stripdown version of bootstrap for spacing, flex utilities like this </p>
					<p>I try to make this site responcive but it's harder than i planned</p>
				</div>
				<div>
					<p>As for AI usage you might guess from above i don't use it all of this comes form my head :3, in case i do use it it's a local llm running on my mac</p>
				</div>
			</div>
			</CaddriBox>

			<CaddriBox
				:position="{ x1: 8, y1: 3, x2: 10, y2: 7 }"
				:position-mobile="{ x1: 1, y1: 10, x2: 4, y2: 12 }"
			>
			<div class="d-flex justify-content-center text-center">
				Imagin there will be button and links here
			</div>
			</CaddriBox>
		</div>

		<Logo
			size="450px"
			class="position-absolute top-0 start-0 translate-middle"
		/>
	</div>
</template>

<style lang="css">
.max-h-10-lines {
	max-height: 20lh;
}
</style>