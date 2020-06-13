import {
  FastMob,
  mobCreator,
  TankMob,
} from '../../CreateElement/Mobs/createTankMob';
import { mobsModel } from '../../CreateElement/Mobs/Models/tankModel';

export class MobsManager {
  constructor(ctx, spawnPoints, cellSize) {
    this.ctx = ctx;
    this.cellSize = cellSize;
    this.x = spawnPoints.x - 155 + Math.floor(Math.random() * 155);
    this.y = spawnPoints.y;
    this.mobs = [];
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

  waveMobsMove() {
    this.mobs.map((mob) => {
      mob.render();
    });
  }
}
