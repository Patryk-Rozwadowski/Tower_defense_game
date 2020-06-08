import {
  isBottomWall,
  isLeftWall,
  isRightWall,
  isUpperWall,
} from '../../CreateElement/MapElement/Walls/wallsUtils';
import { createWallTile } from '../../CreateElement/MapElement/Walls/createWallTile';
import { createTerrainTile } from '../../CreateElement/MapElement/createTerrainTile';
import { createSpawnPoints } from '../../CreateElement/MapElement/SpawnPoints/createSpawnPoints';

export class MapManager {
  constructor(canvas, ctx, cellSize) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.cols = 15;
    this.rows = 15;

    this.x = 0;
    this.y = 0;

    this.cellSize = cellSize;
    this.gameMap = [];
  }

  renderMap() {
    this.x = 0;
    this.y = 0;
    for (let i = 0; i <= this.rows; i++) {
      this.x = 0;
      this._createAndAddRow(i);

      if (i > 0) this.y += this.cellSize;
      //if(i === this.rows / 2 )
      for (let j = 0; j <= this.cols; j++) {
        if (j > 0) this.x += this.cellSize;

        // WALLS
        this._createAndAddWalls(i, j, this.x, this.y);

        // TERRAIN
        this._createAndAddTerrain(i, j);

        let xVec = this.gameMap[i][j].vector[0];
        let yVec = this.gameMap[i][j].vector[1];

        this.ctx.fillStyle = this.gameMap[i][j].color;
        this.ctx.fillRect(xVec, yVec, this.cellSize, this.cellSize);
      }
    }
  }

  getGameMap() {
    return this.gameMap;
  }

  _createAndAddRow(i) {
    this.gameMap[i] = [];
  }

  _createAndAddWalls(i, j) {
    if (
      isUpperWall(j) ||
      isLeftWall(i) ||
      isRightWall(i + 1, this.cols) ||
      isBottomWall(j + 1, this.rows)
    ) {
      this.gameMap[i][j] = createWallTile(this.x, this.y);
    }

    if (this._isSpawnPoint(i, j, this.rows))
      this.gameMap[i][j] = createSpawnPoints(this.x, this.y);
  }

  _isSpawnPoint(i, j, rows) {
    // Calculate center point for rows
    return (
      (i === Math.round(rows / 2 - 1) && j === 0) ||
      (i === Math.round(rows / 2 - 1) && j === rows - 1)
    );
  }

  _createAndAddTerrain(i, j) {
    if (!this.gameMap[i][j]) {
      this.gameMap[i][j] = createTerrainTile(this.x, this.y);
    }
  }
}
