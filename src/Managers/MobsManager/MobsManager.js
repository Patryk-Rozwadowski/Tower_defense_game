import { MobCreator } from '../../CreateElement/Mobs/MobCreator';
import { MobsModels } from '../../CreateElement/Mobs/Models/MobsModels';

export class MobsManager {
  constructor(ctx, spawnPoints, cellSize) {
    this.ctx = ctx;
    this.cellSize = cellSize;
    this.x = spawnPoints.vector[0];
    this.y = spawnPoints.vector[1];
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
      }, Math.floor(Math.random() * 3 * time++) * 1000);
    });
    time = 0;
  }

  // @todo separate from MobsManager
  waveMobsMove() {
    this.mobs.map((mob, i) => {
      this._checkMobHp(mob, i);
      mob.move(mob);
      mob.render(mob);
    });
  }

  getMobs() {
    return this.mobs;
  }

  _checkMobHp(mob, i) {
    if (mob.hp < 0) {
      this.mobs.splice(i, 1);
    }
  }
}
