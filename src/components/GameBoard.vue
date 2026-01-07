<template>
    <div v-if="winner" class="win">
        The winner is player: <span>{{ winner }}</span> 🎉
    </div>

    <div v-else-if="isGameOver" class="win">
        It's a draw
    </div>
    <div class="game-board">
        <GameCell v-for="(cell, idx) in cells" :key="idx" :value="cell" :ref="el => cellRefs[idx] = el"
            @cell-click="makeMove(idx)" />
    </div>
    <div class="reset-container">
        <button @click="resetGame()" class="reset-btn">Reset</button>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import GameCell from "@/components/GameCell.vue"
import { useTicTacToeGame } from '@/composables/useTicTacToe';

const {
    cells,
    winner,
    moveCount,
    makeMove,
    resetGame,
    isGameOver
} = useTicTacToeGame()

const viewMode = ref('grid')

const cellRefs = []

function scatterCells() {
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    cellRefs.forEach(cell => {
        const rect = cell.root.getBoundingClientRect()

        const maxX = viewportWidth - rect.right
        const minX = -rect.left

        const maxY = viewportHeight - rect.bottom
        const minY = -rect.top

        const x = minX + Math.random() * (maxX - minX)
        const y = minY + Math.random() * (maxY - minY)

        cell.root.style.transform = `translate(${x}px, ${y}px)`
    })
}

function resetCellsToGrid() {
    cellRefs.forEach((cell) => {
        cell.root.style.transform = 'translate(0px, 0px)'
    })
}
watch(viewMode, (mode) => {
    if (mode === 'scatter') {
        scatterCells()
    } else {
        resetCellsToGrid()
    }
})

watch(moveCount, (count) => {
    if (count === 0) {
        viewMode.value = 'grid'
        return
    }

    viewMode.value = 'grid'

    setTimeout(() => {
        if (!isGameOver.value) {
            viewMode.value = 'scatter'
        }
    }, 800)
})

</script>

<style lang="css">
.game-board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

.reset-btn {
    background-color: #fff;
    color: #000;
    padding: 10px;
    border-radius: 10px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.reset-btn:hover {
    background-color: #000;
    color: #fff;
}

.win {
    font-size: 1.5rem;
    color: greenyellow
}

.win span {
    font-size: 2rem;
    color: #fff;
}
</style>