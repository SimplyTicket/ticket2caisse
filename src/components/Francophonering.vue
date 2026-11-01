<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const container = document.getElementById('francophonering');
  if (!container) return;

  const script1 = document.createElement('script');
  script1.src = 'https://francophonering.neocities.org/onionring-variables.js';
  
  script1.onload = () => {
    const script2 = document.createElement('script');
    script2.src = 'https://francophonering.neocities.org/francophonering_button.js';
    container.appendChild(script2);
  };

  container.appendChild(script1);
});
</script>

<template>
  <div id="francophonering"></div>
</template>