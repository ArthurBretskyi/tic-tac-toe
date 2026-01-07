<template>
    <div ref="root" role="button" tabindex="0" :class="{ disabled: value !== null }" class="cell"
        @click="emit('cell-click')" @keydown.enter="emit('cell-click')">
        {{ value }}
    </div>
</template>
<script setup>
import { ref } from 'vue'

defineProps({
    value: {
        type: String,
        default: null
    }
})

const emit = defineEmits(['cell-click'])

const root = ref(null)

defineExpose({
    root
})
</script>
<style lang="css">
.cell {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    border: 2px solid #c2bfbf;
    background-color: #fff;
    font-size: 24px;
    color: #000;
    cursor: pointer;
    transition: transform 0.6s ease;
}

.cell.disabled {
    cursor: not-allowed;
    background-color: #eee;
}
</style>

