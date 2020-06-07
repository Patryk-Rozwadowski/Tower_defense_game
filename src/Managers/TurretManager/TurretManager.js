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

  placeTurret(pickedTurret, vector) {
    const vectorNormY = normalizedTilePositions(vector.y, this.cellSize);
    const vectorNormX = normalizedTilePositions(vector.x, this.cellSize);

    let freeTile = checkIfTileIsFree(vector, this.turrets, this.cellSize);
    if (this.turrets.length === 0 || freeTile)
      this.turrets.push(createTurret(pickedTurret, vectorNormX, vectorNormY));
  }

  renderTurrets() {
    this.turrets.map((el) => {
      switch (el.type) {
        case 'fastFiringTurret':
          this.ctx.beginPath();
          this.ctx.fillStyle = el.color;

          // rendering in the center of cursor position square
          this.ctx.arc(
            el.x + this.cellSize / 2,
            el.y + this.cellSize / 2,
            this.cellSize / 3,
            0,
            2 * Math.PI
          );

          this.ctx.fill();
          this.ctx.stroke();
          break;

        case 'powerTurret':
          console.log(this.turrets);
          this.ctx.beginPath();
          this.ctx.fillStyle = el.color;
          this.ctx.fillRect(el.x, el.y, this.cellSize, this.cellSize);
          this.ctx.stroke();
          break;
      }
    });
  }

  getTurrets() {
    return this.turrets;
  }
}
