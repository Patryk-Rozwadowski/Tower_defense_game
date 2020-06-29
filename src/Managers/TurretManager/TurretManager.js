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
    this.showLaser = false;
    this.mobsInRange = [];
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
          break;

        case 'powerTurret':
          this._renderPowerTurret(turret);
          if (this.showLaser) {
            debugger;
            mobs.map((mob) => {
              if (this.isMobInRange(turret, mob)) {
                this._drawLaser(mob, turret);
              }
            });
          }
          break;
      }
    });
  }

  turretShooting(mobs) {
    this.turrets.map((turret) => {
      mobs.map((mob, index) => {
        mob.dinstanceFromturret = FindDistanceBetweenVectors(
          mob.x,
          mob.y,
          turret.x,
          turret.y
        );
        if (mob.dinstanceFromturret < turret.range) {
          this._shootToMob(turret, mob, index);
        }
      });
    });
  }

  isTurretPlacedSuccess() {
    return this.turretPlacedSuccess;
  }

  getTurrets() {
    return this.turrets;
  }

  isMobInRange(turret, mob) {
    return (
      FindDistanceBetweenVectors(turret.x, turret.y, mob.x, mob.y) <=
      turret.range
    );
  }

  _drawLaser(turret, mob) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = '#FF0000';
    this.ctx.moveTo(
      centerPointOfTile(turret.x, this.cellSize),
      centerPointOfTile(turret.y, this.cellSize)
    );

    this.ctx.lineTo(
      centerPointOfTile(mob.x, this.cellSize),
      centerPointOfTile(mob.y, this.cellSize)
    );
    this.ctx.stroke();
  }

  _shootToMob(turret, mob, index) {
    mob.hp -= turret.damage * 10;
    this.showLaser = true;
    if (mob.hp < 0) {
      this.mobsInRange.slice(index, 1);
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
