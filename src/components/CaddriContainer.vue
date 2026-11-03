<!-- GridContainer.vue -->
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const container = ref(null)
const height = ref(0)

let resizeObserver = null
let mutationObserver = null

function updateHeight() {
  if (!container.value) return
  let maxBottom = 0
  for (const child of container.value.children) {
    const style = getComputedStyle(child)
    if (style.display === 'none') continue
    maxBottom = Math.max(maxBottom, child.offsetTop + child.offsetHeight)
  }
  height.value = maxBottom
}

function trackChildren() {
  for (const child of container.value.children) resizeObserver.observe(child)
}

onMounted(() => {
  updateHeight()
  resizeObserver = new ResizeObserver(updateHeight)
  trackChildren()
  resizeObserver.observe(container.value) // catches width changes that reflow children

  // handle children added/removed later (v-if blocks, etc.)
  mutationObserver = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((n) => n.nodeType === 1 && resizeObserver.observe(n))
      m.removedNodes.forEach((n) => n.nodeType === 1 && resizeObserver.unobserve(n))
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
  <div ref="container" class="grid-container" :style="{ height: height + 'px' }">
    <slot></slot>
  </div>
</template>

<style scoped>
.grid-container {
  position: relative; /* children's offsetTop is now measured from here */
}
</style>