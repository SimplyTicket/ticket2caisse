<script setup lang="ts">
import Arc from "./Arc.vue";
import GlitchedArc from "./GlitchedArc.vue";
import Circle from "./Circle.vue";

// Plus besoin de ref, setInterval, onMounted, onUnmounted. Rien.
</script>

<template>
  <svg width="150px" height="150px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <Circle :center="[50, 50]" :radius="20" color="var(--color-primary-mute)" />

    <!-- Arc statique (pas de rotation) -->
    <GlitchedArc
      :center="[50, 50]"
      :radius="20"
      :degree="74"
      :degreeOffset="240"
      color="var(--color-primary)"
      width="10"
      :glitch-config="{
        layers: 10,
        intensity: 1,
        mode: 'progressive',
        colorShift: 1,
        jitterRadius: 14,
        jitterDegree: 20,
        animate: false,
        dashPattern: '14 6',
      }"
    />

    <!-- Arc qui tourne : rotation CSS sur le <g> -->
    <g class="spin-group">
      <GlitchedArc
        :center="[50, 50]"
        :radius="30"
        :degree="95"
        :degreeOffset="0"
        color="var(--color-secondary)"
        width="10"
        :glitch-config="{
          layers: 15,
          intensity: 1,
          mode: 'progressive',
          colorShift: 2,
          jitterRadius: 8,
          jitterDegree: 20,
          animate: false,
          dashPattern: '4 2 12 6 2 4',
        }"
      />
    </g>
  </svg>
</template>

<style scoped>
.spin-group {
  transform-origin: 50px 50px; /* centre du viewBox */
  animation: spin 3s ease-in 0s 1 forwards;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(160deg); }
}
</style>