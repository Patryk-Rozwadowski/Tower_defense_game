import { normalizedTilePositions } from '../../Units/NormalizedTilePositions';
import { checkIfTileIsFree } from '../TilesCheckingManager/checkIfTileIsFree';
import { createTurret } from '../../CreateElement/Turrets/createTurret';
import { centerPointOfTile } from '../../Utils/Tiles/centerPointOfTile';

export class TurretsManager {
  constructor(canvas, ctx, cellSize) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.cellSize = cellSize;
    this.turrets = [];
    this.turretPlacedSuccess = true;
  }

  placeTurret(pickedTurret, vector) {
    const vectorNormY = normalizedTilePositions(vector.y, this.cellSize);
    const vectorNormX = normalizedTilePositions(vector.x, this.cellSize);
    console.log(vectorNormX, vectorNormY);
    this.turretPlacedSuccess = checkIfTileIsFree(
      vector,
      this.turrets,
      this.cellSize
    );
    if (this.turrets.length === 0 || this.turretPlacedSuccess)
      this.turrets.push(createTurret(pickedTurret, vectorNormX, vectorNormY));
  }

  renderTurrets() {
    this.turrets.map((turret) => {
      switch (turret.type) {
        case 'fastFiringTurret':
          this._renderFastTurret(turret);

          break;

        case 'powerTurret':
          this._renderPowerTurret(turret);
          break;
      }
    });
  }

  isTurretPlacedSuccess() {
    return this.turretPlacedSuccess;
  }

  getTurrets() {
    return this.turrets;
  }

  // @todo duplicates
  _renderFastTurret(turret) {
    this.ctx.beginPath();
    this.ctx.fillStyle = turret.color;

    this.ctx.arc(
      centerPointOfTile(turret.x, this.cellSize),
      centerPointOfTile(turret.y, this.cellSize),
      this.cellSize / 3,
      0,
      2 * Math.PI
    );

    this.ctx.fill();
    this._showTurretRange(turret);
    this.ctx.stroke();
  }

  _renderPowerTurret(turret) {
    this.ctx.beginPath();
    this.ctx.fillStyle = turret.color;

    this._showTurretRange(turret);

    this.ctx.fillRect(turret.x, turret.y, this.cellSize, this.cellSize);
    this.ctx.stroke();
  }

  _showTurretRange(turret) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#fff';
    this.ctx.arc(
      centerPointOfTile(turret.x, this.cellSize),
      centerPointOfTile(turret.y, this.cellSize),
      turret.range,
      0,
      2 * Math.PI
    );
    this.ctx.stroke();
  }
}
