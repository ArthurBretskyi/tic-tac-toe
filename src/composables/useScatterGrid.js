import { ref, watch } from "vue";

export function useScatterGrid(moveCount, isGameOver, canInteract) {
  const phase = ref("initial");

  const cellRefs = [];

  function registerCell(idx, el) {
    if (el) cellRefs[idx] = el;
  }

  function scatterCells() {
    if (isGameOver.value) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    cellRefs.forEach((cell) => {
      const rect = cell.root.getBoundingClientRect();

      const maxX = viewportWidth - rect.right;
      const minX = -rect.left;

      const maxY = viewportHeight - rect.bottom;
      const minY = -rect.top;

      const x = minX + Math.random() * (maxX - minX);
      const y = minY + Math.random() * (maxY - minY);

      cell.root.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  function resetCellsToGrid() {
    cellRefs.forEach((cell) => {
      cell.root.style.transform = "translate(0px, 0px)";
    });
  }

  function resetPhase() {
    phase.value = "initial";
  }

  watch(
    phase,
    (p) => {
      canInteract.value = p === "initial" || p === "scatter";

      if (p === "scatter") scatterCells();
      if (p === "grid" || p === "initial") resetCellsToGrid();
    },
    { immediate: true }
  );

  watch(moveCount, (count) => {
    if (count === 0) {
      phase.value = "initial";
      return;
    }

    if (isGameOver.value) return;

    if (count === 1) {
      phase.value = "scatter";
      return;
    }

    phase.value = "grid";

    setTimeout(() => {
      if (!isGameOver.value) {
        phase.value = "scatter";
      }
    }, 800);
  });

  watch(isGameOver, (over) => {
    if (over) {
      phase.value = "grid";
      canInteract.value = false;
    }
  });

  return {
    registerCell,
    resetPhase,
    phase,
  };
}
