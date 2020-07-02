import { MouseManager } from './Managers/MouseManager/MouseManager';
import { TurretsManager } from './Managers/TurretManager/TurretManager';
import { MapManager } from './Managers/MapManager/MapManager';
import { ShopManager } from './Managers/ShopManager/ShopManager';
import { MobsManager } from './Managers/MobsManager/MobsManager';
import { GameDebugger } from './Utils/Debuggers/GameDebugger';
import { LifeManager } from './Managers/LifeManager/LifeManager';
import { createWave } from './Managers/WaveManager/WaveManager';
import { aStar } from './PathFinding/aStar/aStar';
import { ScoreManager } from './Managers/ScoreManager/ScoreManager';

window.onload = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const gameDebugModeCheckbox = document.getElementById('debugMode');

  const cols = 30;
  const rows = 30;
  const cellSize = 30;

  ctx.canvas.width = cols * cellSize;
  ctx.canvas.height = rows * cellSize;

  // @todo IOC
  const scoreManager = new ScoreManager();
  const gameDebugger = new GameDebugger(ctx, cellSize);
  const mouseManager = new MouseManager(canvas, ctx, cellSize);
  const mapManager = new MapManager(
    canvas,
    ctx,
    cols,
    rows,
    cellSize,
    gameDebugger
  );
  mapManager.renderMap();

  const lifeManager = new LifeManager();
  const shopManager = new ShopManager();
  const mobsManager = new MobsManager(
    ctx,
    mapManager,
    cellSize,
    lifeManager,
    shopManager,
    scoreManager
  );

  const turretsManager = new TurretsManager(ctx, cellSize, mobsManager);

  createWave(mobsManager);
  lifeManager.renderLife();

  shopManager.init();
  scoreManager.renderScore();
  lifeManager.renderLife();

  function gameLoop() {
    mapManager.renderMap();

    aStar(
      mapManager.getStartSpawnPoint(),
      mapManager.getEndSpawnPoint(),
      ctx,
      cellSize,
      gameDebugger
    );
    turretsManager.turretShooting();
    mouseManager.drawMousePosition();
    mobsManager.waveMobsMove();

    turretsManager.renderTurrets();
    if (lifeManager.checkIfGameOver()) {
      alert('Game over');
      return;
    }
    requestAnimationFrame(gameLoop);
  }

  gameLoop();

  gameDebugModeCheckbox.addEventListener('click', function () {
    gameDebugger.toggleDebuggerMode = this.checked;
    console.warn(`Debugger mode: ${this.checked}`);
  });

  mouseManager.gameMouseClickHandler(() => {
    if (shopManager.money > 0) {
      turretsManager.placeTurret(
        shopManager.getPickedTurret(),
        mouseManager.getMousePosPerTile()
      );

      if (turretsManager.isTurretPlacedSuccess()) {
        shopManager.setMoney(shopManager.getMoney() - 5);
        shopManager.renderPanel();
      }
    } else {
      // @todo add better notification for user
      console.warn('no Money');
    }
  });
};
