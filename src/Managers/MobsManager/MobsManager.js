import { MobCreator } from '../../CreateElement/Mobs/MobCreator';
import { MobsModels } from '../../CreateElement/Mobs/Models/MobsModels';

export class MobsManager {
  constructor(ctx, spawnPoints, cellSize, lifeManager, endPoint) {
    this.ctx = ctx;
    this.cellSize = cellSize;
    this.lifeManager = lifeManager;
    this.x = spawnPoints.vector[0];
    this.y = spawnPoints.vector[1];

    this.endPoint = endPoint;
    this.mobs = [];
  }

  renderMob(wave) {
    let time = 0;
    // @todo find better solution for timing
    wave.map((mob) => {
      setTimeout(() => {
        this.mobs.push(
          MobCreator(
            this.ctx,
            this.cellSize,
            this.x,
            this.y,
            MobsModels[mob],
            MobsModels[mob].hp,
            MobsModels[mob].color,
            MobsModels[mob].size,
            MobsModels[mob].speed
          )
        );
      }, Math.floor(Math.random() * 5 * time++) * 1000);
    });
    time = 0;
  }

  // @todo separate from MobsManager
  waveMobsMove() {
    // Render wave moving
    this.mobs.map((mob, i) => {
      this._checkMobHp(mob, i);
      mob.move(mob);
      this._checkIfMobHitPlayer(mob, i);
      mob.render(mob);
    });
  }

  getMobs() {
    return this.mobs;
  }

  _checkIfMobHitPlayer(mob, index) {
    if (
      mob.x === this.endPoint.vector[0] + this.cellSize &&
      mob.y === this.endPoint.vector[1]
    ) {
      console.log('-hp hit');
      this.lifeManager.lifeHit();
      this.mobs.splice(index, 1);
    }
  }

  _checkMobHp(mob, i) {
    if (mob.hp < 0) {
      this.mobs.splice(i, 1);
    }
  }
}
