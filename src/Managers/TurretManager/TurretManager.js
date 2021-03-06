import { normalizedTilePositions } from '../../Units/NormalizedTilePositions';
import { checkIfTileIsFree } from '../TilesCheckingManager/checkIfTileIsFree';
import { createTurret } from '../../CreateElement/Turrets/createTurret';
import { centerPointOfTile } from '../../Utils/Tiles/centerPointOfTile';
import { FindDistanceBetweenVectors } from './FindDistanceBetweenVectors/FindDistanceBetweenVectors';

export class TurretsManager {
  constructor(ctx, cellSize, mobsManager) {
    this.ctx = ctx;
    this.cellSize = cellSize;

    this.turrets = [];
    this.turretPlacedSuccess = true;

    // MANAGERS
    this.mobsManager = mobsManager;
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

  turretShooting() {
    this.turrets.map((turret) => {
      this.mobsManager.getMobs().map((mob, index) => {
        mob.dinstanceFromturret = FindDistanceBetweenVectors(
          mob.x,
          mob.y,
          turret.x,
          turret.y
        );

        if (this.isMobInRange(turret, mob) && turret.shootingAllowed) {
          setTimeout(() => (turret.shootingAllowed = true), turret.attackSpeed);

          turret.shootingAllowed = false;
          this._shootToMob(turret, mob, index);
          this._drawLaser(turret, mob);
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
    if (this.isMobInRange(turret, mob)) {
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
  }

  _shootToMob(turret, mob, index) {
    mob.hp -= turret.damage * 10;
    if (mob.hp < 0) {
      this.mobsManager.getMobs().slice(index, 1);
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
