import { MobCreator } from '../../CreateElement/Mobs/MobCreator';
import { MobsModels } from '../../CreateElement/Mobs/Models/MobsModels';
import { checkIfTileIsFree } from '../TilesCheckingManager/checkIfTileIsFree';

export class MobsManager {
  constructor(
    ctx,
    mapManager,
    cellSize,
    lifeManager,
    shopManager,
    scoreManager
  ) {
    this.ctx = ctx;
    this.cellSize = cellSize;

    this.mobs = [];

    // MANAGERS
    this.mapManager = mapManager;
    this.turretsManager = {};
    this.lifeManager = lifeManager;
    this.shopManager = shopManager;
    this.scoreManager = scoreManager;
  }

  inject(turretsManager) {
    this.turretsManager = turretsManager;
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
            this.mapManager.getStartSpawnPoint().vector[0],
            this.mapManager.getStartSpawnPoint().vector[1],
            MobsModels[mob],
            MobsModels[mob].hp,
            MobsModels[mob].color,
            MobsModels[mob].size,
            MobsModels[mob].speed,
            MobsModels[mob].reward,
            MobsModels[mob].score
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
      if (
        !checkIfTileIsFree(mob, this.turretsManager.getTurrets(), this.cellSize)
      ) {
        mob.x -= 2;
      }
      mob.move(mob);
      mob.render(mob);
      this._checkIfMobHitPlayer(mob, i);
    });
  }

  getMobs() {
    return this.mobs;
  }

  _checkIfMobHitPlayer(mob, index) {
    if (
      mob.x > this.mapManager.getEndSpawnPoint().vector[0] + this.cellSize &&
      mob.y === this.mapManager.getEndSpawnPoint().vector[1]
    ) {
      this.lifeManager.lifeHit();
      this.lifeManager.renderLife();

      this.mobs.splice(index, 1);
    }
  }

  _checkMobHp(mob, i) {
    if (mob.hp < 0) {
      this.shopManager.addMoney(mob.reward);
      this.shopManager.renderPanel();
      this.scoreManager.addScore(mob.score);
      this.scoreManager.renderScore();
      this.mobs.splice(i, 1);
    }
  }
}
