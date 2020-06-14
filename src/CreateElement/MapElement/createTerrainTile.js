export function createTerrainTile(x, y) {
  return {
    f: 0,
    g: 0,
    h: 0,
    vector: [x, y],
    color: '#222',
    type: 'terrain',
    tower: false,
  };
}
