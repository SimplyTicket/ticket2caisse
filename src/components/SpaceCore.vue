<script setup lang="ts">
import createMulberry32 from '@/utils/rng';
import { transform } from 'typescript';
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue';

const rng = createMulberry32(Math.random()*1000)
const velocity = ref(1)
const direction = ref<[number, number]>([rng.range(0, 50), rng.range(0, 50)])
const position = ref<[number, number]>([rng.range(0, window.innerWidth), rng.range(0, window.innerHeight)])
const rotate = ref(0)
let animationId: number | null = null;
const imgRef = useTemplateRef<HTMLImageElement | null>('imgRef')

let grab: boolean = false

function animate() {

    if (!grab) {
        const slowDown = velocity.value * velocity.value * 0.05
        velocity.value = Math.max(velocity.value - slowDown, 0.02)
        rotate.value += ((direction.value[0] + direction.value[1] )* velocity.value) / 5


        position.value[0] += (direction.value[0] * velocity.value)
        position.value[1] += (direction.value[1] * velocity.value)

        if (position.value[0] < 0 - (imgRef.value?.width ?? 0)) {
            position.value[0] = window.innerWidth
        }
        if (position.value[0] > window.innerWidth + (imgRef.value?.width ?? 0)) {
            position.value[0] = 0 - (imgRef.value?.width ?? 0)
        }
        if (position.value[1] < 0 - (imgRef.value?.height ?? 0)) {
            position.value[1] = window.innerHeight
        }
        if (position.value[1] > window.innerHeight + (imgRef.value?.height ?? 0)) {
            position.value[1] = 0 - (imgRef.value?.height ?? 0)
        }
    }

    animationId = requestAnimationFrame(animate);
}

onMounted(() => {

    animate();
});

onUnmounted(() => {
    cancelAnimationFrame(animationId!);
});

function moove(e: MouseEvent) {

    e.preventDefault()
    if (!grab) return;

    const xOffset = imgRef.value?.width ?? 0
    const yOffset = imgRef.value?.height ?? 0

    position.value = [
        e.clientX - xOffset / 2,
        e.clientY - yOffset / 2
    ]

    velocity.value = 1
    direction.value = [e.movementX, e.movementY]


}

let listener: any
function up(e: MouseEvent) { grab = false; document.removeEventListener('mousemove', moove)}
function down(e: MouseEvent) {
    e.preventDefault();
    grab = true;
    listener = document.addEventListener('mousemove', moove)
}

</script>

<template>
    <img src="/images/space-core.png" :style="{ transform: `translate( ${position[0]}px, ${position[1]}px) scale(0.5) rotate(${rotate}deg)` }"
        unselectable="on" ref="imgRef" @mouseup="up" @mousedown="down" alt="">
</template>

<style lang="css" scoped>
img {
    cursor: grab;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    z-index: 9999;
}
</style>