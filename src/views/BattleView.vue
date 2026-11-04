<script setup lang="ts">
import Caddriage from '@/components/caddri/Caddriage.vue';
import CaddriBox from '@/components/caddri/CaddriBox.vue';
import CaddriContainer from '@/components/caddri/CaddriContainer.vue';
import { ref, watch } from 'vue';

interface Box {
    x: number, y: number, width: number, height: number, totalHeight: number
}

const folowHeight = ref<Box[]>([])

watch(folowHeight, () => {
    console.log(folowHeight)
})

const numberOfPixel = ref(0)
const seed = ref(0)

function updateData(id: number, data: Box) {
    folowHeight.value[id] = data
}

function getData(id: number): Box {
    return folowHeight.value[id] ?? { x: 0, y: 0, height: 0, width: 0, totalHeight: 0 }
}

</script>

<template>
    <div>
        <Caddriage :thickness="6" />
    </div>
    <CaddriContainer>


        <CaddriBox id="box-1" :position="{ x: 1, y: 1, width: 10, height: 1 }"
            :position-mobile="{ x: 1, y: 1, width: 4, height: 1 }" @update-height="(data) => { updateData(1, data) }">
            <div class="d-flex flex-wrap flex-row justify-content-around align-items-center h-100">
                <p class="text-color-secondary-mute c-bold text-lg">Trigger Warning</p>
                <div class="text-center h-fit">
                    <h1 class="text-2xl">The fight</h1>
                    <p>This won't be fun</p>
                </div>
                <p class="text-color-secondary-mute c-bold text-lg">Trigger Warning</p>


            </div>
        </CaddriBox>

    </CaddriContainer>
</template>

<style scoped></style>
