<!-- GridContainer.vue -->
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const container = ref<HTMLDivElement | null>(null)
const height = ref(0)

let resizeObserver: ResizeObserver | null = null
let mutationObserver: MutationObserver | null = null

function updateHeight(): void {
  if (!container.value) return

  let maxBottom = 0
  for (const child of Array.from(container.value.children)) {
    if (!(child instanceof HTMLElement)) continue
    const style = getComputedStyle(child)
    if (style.display === 'none') continue
    maxBottom = Math.max(maxBottom, child.offsetTop + child.offsetHeight)
  }

  height.value = maxBottom
}

function trackChildren(): void {
  if (!container.value || !resizeObserver) return
  for (const child of Array.from(container.value.children)) {
    if (child instanceof HTMLElement) resizeObserver.observe(child)
  }
}

onMounted(() => {
  if (!container.value) return

  updateHeight()

  resizeObserver = new ResizeObserver(updateHeight)
  trackChildren()
  resizeObserver.observe(container.value) // catches width changes that reflow children

  mutationObserver = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((n) => {
        if (n instanceof HTMLElement && resizeObserver) resizeObserver.observe(n)
      })
      m.removedNodes.forEach((n) => {
        if (n instanceof HTMLElement && resizeObserver) resizeObserver.unobserve(n)
      })
    }
    updateHeight()
  })
  mutationObserver.observe(container.value, { childList: true })
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  mutationObserver?.disconnect()
})
</script>

<template>
  <div ref="container" class="grid-container" :style="{ height: `${height}px` }">
    <slot />
  </div>
</template>

<style scoped>
.grid-container {
  position: relative; 
}
</style>