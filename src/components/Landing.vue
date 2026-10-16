<script setup lang="ts">
import { ref } from 'vue'
const Landing = ref('Hello World!')
</script>

<template>
  <p class="greeting">{{ Landing }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>