<script setup lang="ts">
import Caddriage from '@/components/Caddriage.vue';
import CaddriBox from '@/components/CaddriBox.vue';
import Logo from '@/components/icons/Logo.vue';
</script>

<template>
	<div>
		<Caddriage :thickness="6"/>
	</div>
	<div class="position-relative">
		<div>
			<CaddriBox :position="{x1:1, y1:1, x2:10, y2:2}" :position-mobile="{x1:1, y1:1, x2:4, y2:3}">

				<div class="fg-contrast-primary center">
					<h1>Monitoring device warning</h1>
				</div>

			</CaddriBox>
		</div>

		
		<Logo
			size="450px"
			class="position-absolute top-0 start-0 translate-middle"
		/>
	</div>
</template>
