import { FastMob, TankMob } from '../../CreateElement/Mobs/createTankMob';

export class MobsManager {
  constructor(ctx, spawnPoints, cellSize) {
    this.ctx = ctx;
    this.cellSize = cellSize;
    this.x = spawnPoints.x + 10;
    this.y = spawnPoints.y;

    this.mobSize = 5;
    this.mobs = [];
  }

  renderMob(mobInfo) {
    let time = 0;
    let timeFast = 0;

    // @todo find better solution
    mobInfo.map((mob) => {
      switch (mob) {
        case 'tank':
          const tank = new TankMob(this.ctx, this.cellSize, this.x, this.y);
          setTimeout(() => {
            this.mobs.push(tank);
            console.log('Added Tank');
          }, Math.floor(Math.random() * 10 * time++) * 1000);
          break;

        case 'fast':
          const fast = new FastMob(this.ctx, this.cellSize, this.x, this.y);
          setTimeout(() => {
            timeFast += 0.5;
            this.mobs.push(fast);
            console.log('Added Fast');
          }, Math.floor(Math.random() * 10 * timeFast++) * 1000);

          break;
      }
    });
  }

  waveMobsMove() {
    this.mobs.map((mob) => mob.render());
  }
}
