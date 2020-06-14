export function createTerrainTile(x, y) {
  const self = {
    type: 'terrain',
    f: 0,
    g: 0,
    h: 0,
    vector: [x, y],
    color: '#222',
    neighbors: [],
    addNeighbors: function (map, i, j) {
      // i - rows
      // j - cols
      if (map[i][j].type !== 'terrain') return;

      if (map[i - 1][j].type === 'terrain') {
        this.neighbors.push(map[i - 1][j]);
      }

      if (map[i + 1][j].type === 'terrain') {
        this.neighbors.push(map[i + 1][j]);
      }

      {
        if (map[i][j - 1].type === 'terrain')
          this.neighbors.push(map[i][j - 1]);
      }

      if (map[i][j + 1].type === 'terrain') {
        this.neighbors.push(map[i][j + 1]);
      }
    },
  };

  return self;
}
