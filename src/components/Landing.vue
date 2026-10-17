<script setup lang="ts">
import { ref } from 'vue';
import Logo from './icons/Logo.vue';

</script>

<template>
<div class="position-relative">
  <!-- Logo stays absolute but sits behind -->
  <Logo size="450px" class="position-absolute top-0 start-0 translate-middle" />
  
  <!-- Content sits on top -->
  <div class="landing d-flex align-items-center justify-content-center position-relative z-1">
    <div class="landing-text text-center">
      <h1 class="c-bold">Bienvenue sur Ticket2Caisse</h1>
      <p>Miaou miaou miaou</p>
    </div>
  </div>
</div>

</template>

<style>

</style>