<template>
    <div v-if="winner" class="win">
        The winner is player: <span>{{ winner }}</span> 🎉
    </div>

    <div v-else-if="isGameOver" class="win">
        It's a draw
    </div>
    <div class="game-board">
        <GameCell v-for="(cell, idx) in cells" :key="idx" :value="cell" :ref="el => registerCell(idx, el)"
            @cell-click="makeMove(idx)" />
    </div>
    <div class="reset-container">
        <button @click="resetGame(); resetPhase();" class="reset-btn">Reset</button>
    </div>
</template>
<script setup>
import { ref } from "vue";
import GameCell from "@/components/GameCell.vue"
import { useTicTacToeGame } from '@/composables/useTicTacToe';
import { useScatterGrid } from '@/composables/useScatterGrid';

const canInteract = ref(false);

const {
    cells,
    winner,
    moveCount,
    makeMove,
    resetGame,
    isGameOver
} = useTicTacToeGame(canInteract)

const { registerCell, resetPhase } = useScatterGrid(moveCount, isGameOver, canInteract)

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