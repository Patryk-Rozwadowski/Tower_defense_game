import { createTerrainTile } from './createTerrainTile';
import {
  isBottomWall,
  isLeftWall,
  isRightWall,
  isUpperWall,
} from './Walls/wallsUtils';

import { createWallTile } from './Walls/createWallTile';

export function renderMap(ctx, gameMap, rows, cols, cellSize) {
  let y = 0;
  let x = 0;

  for (let i = 0; i <= rows; i++) {
    x = 0;

    // Add new game row to map array
    gameMap[i] = [];

    // Need to create new row
    if (i > 0) y += cellSize;

    for (let j = 0; j <= cols; j++) {
      // Need to creat new column
      if (j > 0) x += cellSize;

      // Add Walls to map
      if (
        isUpperWall(j) ||
        isLeftWall(i) ||
        isRightWall(i + 1, cols) ||
        isBottomWall(j + 1, rows)
      ) {
        gameMap[i][j] = createWallTile(x, y);
      }

      // Add Terrain to map
      if (!gameMap[i][j]) {
        gameMap[i][j] = createTerrainTile(x, y);
      }

      let xVec = gameMap[i][j].vector[0];
      let yVec = gameMap[i][j].vector[1];

      ctx.fillStyle = gameMap[i][j].color;
      ctx.fillRect(xVec, yVec, cellSize, cellSize);
    }
  }
}
