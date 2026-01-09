import { ref, computed } from "vue";
import { checkWinner } from "@/utils/checkWinner";

export function useTicTacToeGame(canInteract) {
  const cells = ref(Array(9).fill(null));
  const currentPlayer = ref("X");

  const winner = computed(() => {
    return checkWinner(cells.value);
  });

  const isDraw = computed(() => {
    return winner.value === null && cells.value.every((cell) => cell !== null);
  });

  const isGameOver = computed(() => {
    return winner.value !== null || isDraw.value;
  });

  const moveCount = ref(0);

  function makeMove(index) {
    if (!canInteract.value) return;
    if (isGameOver.value) return;
    if (index < 0 || index > 8) return;
    if (cells.value[index] !== null) return;

    cells.value[index] = currentPlayer.value;
    moveCount.value++;

    if (!isGameOver.value) {
      currentPlayer.value = currentPlayer.value === "X" ? "O" : "X";
    }
  }

  function resetGame() {
    cells.value = Array(9).fill(null);
    currentPlayer.value = "X";
  }

  return {
    cells,
    currentPlayer,
    winner,
    isDraw,
    isGameOver,
    moveCount,
    makeMove,
    resetGame,
  };
}
