<script setup lang="ts">
import Caddriage from "@/components/Caddriage.vue";
import CaddriBox from "@/components/CaddriBox.vue";
import Francophonering from "@/components/Francophonering.vue";
import Logo from "@/components/icons/Logo.vue";
</script>

<template>
	<div>
		<Caddriage :thickness="6" />
	</div>
	<div class="position-relative">
		<div>
			<CaddriBox
				:position="{ x: 1, y: 1, width: 10, height: 1 }"
				:position-mobile="{ x: 1, y: 1, width: 4, height: 1 }"
			>
				<div class="center">
					<h1>The fuck is that ?</h1>
				</div>
			</CaddriBox>

			<CaddriBox
				class="p-2"
				:position="{ x: 1, y: 3, width: 7, height: 5, fitContent:true }"
				:position-mobile="{ x: 0, y: 3, width: 6, height: 6 }"
			>
				<div
					class="p-2 d-flex flex-column justify-content-between h-100 max-h-10-lines"
				>
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

			<CaddriBox
				:position="{ x: 9, y: 3, height: 5, width: 2 }"
				:position-mobile="{ x: 1, y: 10, width: 4, height: 2 }"
			>
				<div class="d-flex c-bold justify-content-center text-center">
					Imagin there will be button and links here
				</div>
				<Francophonering/>
			</CaddriBox>
		</div>

		<Logo
			size="450px"
			class="position-absolute top-0 start-0 translate-middle"
		/>
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

</style>
