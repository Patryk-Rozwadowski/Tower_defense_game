import { normalizedTilePositions } from '../../Units/NormalizedTilePositions';
import { checkIfTileIsFree } from '../TilesCheckingManager/checkIfTileIsFree';
import { createTurret } from '../../CreateElement/Turrets/createTurret';
import { centerPointOfTile } from '../../Utils/Tiles/centerPointOfTile';
import { FindDistanceBetweenVectors } from './FindDistanceBetweenVectors/FindDistanceBetweenVectors';

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

  renderTurrets(mobs) {
    this.turrets.map((turret) => {
      switch (turret.type) {
        case 'fastFiringTurret':
          this._renderFastTurret(turret);
          mobs.map((mob) => {
            if (
              FindDistanceBetweenVectors(turret.x, turret.y, mob.x, mob.y) <
              turret.range
            ) {
              console.log('pew pew');
            }
          });
          break;

        case 'powerTurret':
          this._renderPowerTurret(turret);
          mobs.map((mob) => {
            this._shootToMob(turret, mob);
          });
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

  _shootToMob(turret, mob) {
    let mobInRange =
      FindDistanceBetweenVectors(turret.x, turret.y, mob.x, mob.y) <
      turret.range;
    if (mobInRange) {
      if (mob.hp > 0 || mobInRange) {
        let shooting = setInterval(() => {
          mob.hp -= turret.damage;
          console.log('pew pew');
          clearInterval(shooting);
        }, turret.createFastFiringTurret * 1000);
      }
    }
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
