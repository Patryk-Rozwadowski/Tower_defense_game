export function createTerrainTile(x, y) {
  return {
    vector: [x, y],
    color: '#222',
    type: 'terrain',
    tower: false,
  };
}
