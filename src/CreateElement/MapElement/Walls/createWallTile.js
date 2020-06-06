export function createWallTile(x, y) {
  return {
    type: 'wall',
    vector: [x, y],
    color: '#FF0000',
  };
}
