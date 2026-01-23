<template>
    <div v-if="winner" class="win">
        The winner is player: <span>{{ winner }}</span> 🎉
    </div>

    <div v-else-if="isGameOver" class="win">
        It's a draw
    </div>

    <div v-if="showFirstMove" class="first-move">
        {{ firstMoveText }}
    </div>

    <div v-if="showPreGameUI" class="mode-switch">
        <button :class="{ active: gameMode === 'human-vs-human' }" @click="setMode('human-vs-human')">
            2 Players
        </button>

        <button :class="{ active: gameMode === 'human-vs-ai' }" @click="setMode('human-vs-ai')">
            Vs Computer
        </button>
    </div>


    <div class="game-board">
        <GameCell v-for="(cell, idx) in cells" :key="idx" :value="cell" :ref="el => registerCell(idx, el)"
            @cell-click="handleCellClick(idx)" />
    </div>
</template>
<script setup>
import { ref, watch, onMounted, computed } from "vue";
import GameCell from "@/components/GameCell.vue"
import { useTicTacToeGame } from '@/composables/useTicTacToe';
import { useScatterGrid } from '@/composables/useScatterGrid';
import { useComputerPlayer } from "@/composables/useComputerPlayer";

const canInteract = ref(false);

const {
    cells,
    currentPlayer,
    gameMode,
    winner,
    moveCount,
    makeMove,
    resetGame,
    isGameOver
} = useTicTacToeGame(canInteract)

const { registerCell, resetPhase, phase } = useScatterGrid(moveCount, isGameOver, canInteract)

const { isThinking } = useComputerPlayer({
    cells,
    currentPlayer,
    makeMove,
    isGameOver,
    canInteract,
    aiPlayer: "O",
    enabled: computed(() => gameMode.value === "human-vs-ai"),
    phase
});

const firstPlayer = ref(null);

function handleCellClick(index) {
    if (isThinking.value) return;
    makeMove(index);
}


const showPreGameUI = computed(() => {
    return !roundStarted.value;
});

const showFirstMove = computed(() => {
    return (
        showPreGameUI.value &&
        gameMode.value === "human-vs-ai" &&
        phase.value === "initial"
    );
});

function startNewRound() {
    resetGame();

    firstPlayer.value = Math.random() > 0.5 ? "X" : "O";
    currentPlayer.value = firstPlayer.value;
}

const firstMoveText = computed(() => {
    if (!firstPlayer.value) return "";

    return firstPlayer.value === "X"
        ? "First move: You"
        : "First move: Computer";
});

function setMode(mode) {
    if (gameMode.value === mode) return;

    gameMode.value = mode;
    resetPhase();
    resetRound();
}

function resetRound() {
    roundStarted.value = false;
    startNewRound();
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

onMounted(() => {
    startNewRound()
})

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

.first-move {
    font-size: 2rem;
    color: #fff;
    margin-bottom: 1rem;
    text-align: center;
}

.mode-switch {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.mode-switch button {
    padding: 6px 12px;
    border-radius: 8px;
    background: #333;
    color: #fff;
    cursor: pointer;
}

.mode-switch button.active {
    background: greenyellow;
    color: #000;
}
</style>