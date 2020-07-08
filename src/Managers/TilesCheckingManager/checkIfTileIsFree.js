import { normalizedTilePositions } from '../../Units/NormalizedTilePositions';

export function checkIfTileIsFree(object, turrets, cellSize) {
  let freeTile = true;

  for (let i = 0; i < turrets.length; i++) {
    const turretChosenTileSameVectors =
      turrets[i].x === normalizedTilePositions(object.x, cellSize) &&
      turrets[i].y === normalizedTilePositions(object.y, cellSize);

    const turretChosenTileDiffVectors =
      turrets[i].x !== normalizedTilePositions(object.x, cellSize) &&
      turrets[i].y !== normalizedTilePositions(object.y, cellSize);

    // Check if tile is already taken
    if (turretChosenTileSameVectors) {
      // If tile is already taken by another turret break loop
      freeTile = false;
      break;
    } else if (turretChosenTileDiffVectors) {
      freeTile = true;
    }
  }
  if (!freeTile) console.warn('Tile is already taken!');
  return freeTile;
}
