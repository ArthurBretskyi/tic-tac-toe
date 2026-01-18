import { watch } from "vue";
import { getRandomMove } from "@/utils/randomMove";

export function useComputerPlayer({
  cells,
  currentPlayer,
  makeMove,
  isGameOver,
  canInteract,
  aiPlayer,
}) {
  watch(currentPlayer, (player) => {
    if (player !== aiPlayer) return;
    if (isGameOver.value) return;
    if (!canInteract.value) return;

    setTimeout(() => {
      const index = getRandomMove(cells.value);
      if (index !== undefined) {
        makeMove(index);
      }
    }, 2000);
  });
}
