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
</template>
<script setup>
import { ref, watch } from "vue";
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

const { registerCell, resetPhase, phase } = useScatterGrid(moveCount, isGameOver, canInteract)

function resetRound() {
    roundStarted.value = false;
}

defineExpose({
    resetGame,
    resetPhase,
    resetRound
})

const roundStarted = ref(false);

const emit = defineEmits(["game-started", "game-ended"]);

watch(moveCount, (count) => {
    if (count === 1 && !roundStarted.value) {
        roundStarted.value = true;
        emit("game-started");
    }
});

watch(isGameOver, (v) => {
    if (v) emit("game-ended");
});

</script>

<style lang="css">
.game-board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}


.win {
    font-size: 1.5rem;
    color: greenyellow;
    text-align: center;
}

.win span {
    font-size: 2rem;
    color: #fff;
}
</style>