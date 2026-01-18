export function getRandomMove(cells) {
  const emptyIndexes = cells
    .map((v, i) => (v === null ? i : null))
    .filter((v) => v !== null);

  return emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
}
