export function createTerrainTile(x, y) {
  return {
    type: 'terrain',
    f: 0,
    g: 0,
    h: 0,
    vector: [x, y],
    color: '#222',
    neighbors: [],
    addNeighbors: function (
      map,
      cellSize,
      i,
      j,
      maxRows,
      maxCols,
      // @todo connect debugger to this factory
      gameDebugger
    ) {
      // i - iteration for rows
      // j - iteration for cols
      const x = this.vector[0];
      const y = this.vector[1];

      // Upper half of map
      if (maxCols > j) {
        if (map[i - 1][j].type === 'terrain') {
          this.neighbors.push(map[i - 1][j]);
        }
      }

      // Bottom half of map
      if (maxRows > i) {
        if (map[i + 1][j].type === 'terrain') {
          this.neighbors.push(map[i + 1][j]);
        }
      }

      // Fill all columns
      if (maxCols > j) {
        if (map[i][j + 1].type === 'terrain') {
          this.neighbors.push(map[i][j + 1]);
        }
      }

      // Vertical neighbors
      if (j > 0) {
        if (map[i][j - 1].type === 'terrain')
          this.neighbors.push(map[i][j - 1]);
      }
    },
  };
}
