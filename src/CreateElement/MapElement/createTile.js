export function createTile(y, x) {
  return {
    id: Math.random(),
    vector: [y, x],
    color: '#222',
    tower: true,
  };
}
