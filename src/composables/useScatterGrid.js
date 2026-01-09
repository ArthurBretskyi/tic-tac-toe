import { ref, watch, computed } from "vue";

export function useScatterGrid(moveCount, isGameOver) {
  const viewMode = ref("grid");

  const cellRefs = [];

  function registerCell(idx, el) {
    if (el) cellRefs[idx] = el;
  }

  function scatterCells() {
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

  watch(viewMode, (mode) => {
    mode === "scatter" ? scatterCells() : resetCellsToGrid();
  });

  watch(moveCount, (count) => {
    if (count === 0) {
      viewMode.value = "grid";
      return;
    }

    viewMode.value = "grid";

    setTimeout(() => {
      if (!isGameOver.value) {
        viewMode.value = "scatter";
      }
    }, 800);
  });

  return {
    registerCell,
  };
}
