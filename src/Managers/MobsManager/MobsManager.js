import { mobCreator } from '../../CreateElement/Mobs/createTankMob';
import { mobsModel } from '../../CreateElement/Mobs/Models/tankModel';

export class MobsManager {
  constructor(ctx, spawnPoints, cellSize, turrets) {
    this.ctx = ctx;
    this.cellSize = cellSize;
    this.x = spawnPoints.vector[0];
    this.y = spawnPoints.vector[1];
    this.mobs = [];
    this.turrets = turrets;
  }

  renderMob(wave) {
    let time = 0;
    // @todo find better solution for timing
    wave.map((mob) => {
      setTimeout(() => {
        this.mobs.push(
          mobCreator(
            this.ctx,
            this.cellSize,
            this.x,
            this.y,
            mobsModel[mob],
            mobsModel[mob].hp,
            mobsModel[mob].color,
            mobsModel[mob].size,
            mobsModel[mob].speed
          )
        );
      }, Math.floor(Math.random() * 3 * time++) * 1000);
    });
    time = 0;
  }

  // @todo seperate from MobsManager
  waveMobsMove() {
    this.mobs.map((mob) => {
      mob.move(mob);
      mob.render(mob);
    });
  }
}
