import { ref, watch } from "vue";
import { getRandomMove } from "@/utils/randomMove";

export function useComputerPlayer({
  cells,
  currentPlayer,
  makeMove,
  isGameOver,
  canInteract,
  aiPlayer,
  enabled,
}) {
  const isThinking = ref(false);

  watch(currentPlayer, (player) => {
    if (!enabled.value) return;
    if (player !== aiPlayer) return;
    if (isGameOver.value) return;
    if (!canInteract.value) return;

    isThinking.value = true;

    const timeoutId = setTimeout(() => {
      const index = getRandomMove(cells.value);
      if (index !== null) {
        makeMove(index);
      }
      isThinking.value = false;
    }, 800);

    return () => {
      clearTimeout(timeoutId);
      isThinking.value = false;
    };
  });
  return {
    isThinking,
  };
}
