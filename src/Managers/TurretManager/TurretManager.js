import { normalizedTilePositions } from '../../Units/NormalizedTilePositions';
import { checkIfTileIsFree } from '../TilesCheckingManager/checkIfTileIsFree';
import { createTurret } from '../../CreateElement/Turrets/createTurret';

export class TurretsManager {
  constructor(canvas, ctx, cellSize) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.cellSize = cellSize;
    this.turrets = [];
  }

  placeTurret(vector) {
    const vectorNormY = normalizedTilePositions(vector.y, this.cellSize);
    const vectorNormX = normalizedTilePositions(vector.x, this.cellSize);

    let freeTile = checkIfTileIsFree(vector, this.turrets, this.cellSize);

    if (this.turrets.length === 0 || freeTile)
      this.turrets.push(createTurret(vectorNormY, vectorNormX));
    console.log(this.turrets);
  }

  renderTurrets() {
    this.turrets.map((el) => {
      this.ctx.fillStyle = el.color;
      this.ctx.fillRect(el.x, el.y, this.cellSize, this.cellSize);
    });
  }

  getTurrets() {
    return this.turrets;
  }
}
