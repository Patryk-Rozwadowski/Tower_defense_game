import {
  isBottomWall,
  isLeftWall,
  isRightWall,
  isUpperWall,
} from '../../CreateElement/MapElement/Walls/wallsUtils';
import { createWallTile } from '../../CreateElement/MapElement/Walls/createWallTile';
import { createTerrainTile } from '../../CreateElement/MapElement/createTerrainTile';

export class MapManager {
  constructor(canvas, ctx, cols, rows, cellSize, gameDebuggerManager) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.cellSize = cellSize;

    this.cols = cols;
    this.rows = rows;

    this.x = 0;
    this.y = 0;

    this.gameMap = [];
    this.terrain = [];
    this.startSpawnPoint = {};
    this.endSpawnPoint = {};

    // MANAGERS
    this.gameDebuggerManager = gameDebuggerManager;
  }

  renderMap() {
    this.x = 0;
    this.y = 0;
    for (let i = 0; i <= this.rows; i++) {
      this.x = 0;
      this._createAndAddRow(i);

      if (i > 0) this.y += this.cellSize;
      for (let j = 0; j <= this.cols; j++) {
        if (j > 0) this.x += this.cellSize;

        // WALLS
        this._createAndAddWalls(i, j, this.x, this.y);

        // SPAWN POINTS
        this._createSpawnAndAddPoints(i, j, this.rows);

        // TERRAIN
        this._createAndAddTerrain(i, j);

        let xVec = this.gameMap[i][j].vector[0];
        let yVec = this.gameMap[i][j].vector[1];

        this.ctx.fillStyle = this.gameMap[i][j].color;
        this.ctx.fillRect(xVec, yVec, this.cellSize, this.cellSize);

        this.gameDebuggerManager.debugTileVectors(xVec, yVec);
      }
    }

    for (let i = 0; i < this.gameMap.length; i++) {
      for (let j = 0; j < this.gameMap[i].length; j++) {
        if (this.gameMap[i][j].type === 'terrain') {
          this.gameMap[i][j].addNeighbors(
            this.gameMap,
            this.cellSize,
            i,
            j,
            this.rows, // max rows
            this.cols, // max cols
            this.gameDebuggerManager
          );
        }
      }
    }
  }

  getGameMap() {
    return this.gameMap;
  }

  getEndSpawnPoint() {
    return this.endSpawnPoint;
  }

  getStartSpawnPoint() {
    return this.startSpawnPoint;
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
  }

  _createSpawnAndAddPoints(i, j) {
    // @todo createTerrain returns type 'terrain', make it more dynamically
    if (this._isEndSpawnPoint(i, j, this.rows)) {
      this.gameMap[i][j] = createTerrainTile(this.x, this.y);
      this.endSpawnPoint = this.gameMap[i][j];
    }

    if (this._isStartSpawnPoint(i, j, this.rows)) {
      this.gameMap[i][j] = createTerrainTile(this.x, this.y);
      this.startSpawnPoint = this.gameMap[i][j];
    }
  }

  _isEndSpawnPoint(i, j, rows) {
    return i === Math.round(rows / 2 - 1) && j === rows - 1;
  }

  _isStartSpawnPoint(i, j, rows) {
    return i === Math.round(rows / 2 - 1) && j === 0;
  }

  _createAndAddTerrain(i, j) {
    if (!this.gameMap[i][j]) {
      this.gameMap[i][j] = createTerrainTile(this.x, this.y);
    }
  }
}
