<script setup lang="ts">
import { ref } from 'vue';
import Button from './Button.vue';


const txt = ref('copy code')
function copyBtnCode() {
    navigator.clipboard.writeText(`<a href="https://simply-ticket.neocities.org/"><img src="https://simply-ticket.neocities.org/button.gif" /></a>`).then(
        function () {
            txt.value = "Copied"
        },
        function () {
            txt.value = "Error :/"
        },
    );
}
</script>

<template>
    <div class="center">
        <p>Get my btn</p>
        <img src="/button.gif" class="logo-button" sizes="" />
        <Button variant="secondary" :height="25" :width="125" @click="copyBtnCode" id="copy-btn">{{ txt }}</Button>
    </div>
</template>

<style lang="css" scoped>
#copy-btn {
	width: 60%;
}
</style>