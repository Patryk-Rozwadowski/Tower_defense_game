import { MouseManager } from './Managers/MouseManager/MouseManager';
import { TurretsManager } from './Managers/TurretManager/TurretManager';
import { MapManager } from './Managers/MapManager/MapManager';
import { ShopManager } from './Managers/ShopManager/ShopManager';
import { MobsManager } from './Managers/MobsManager/MobsManager';
import { GameDebugger } from './Utils/Debuggers/GameDebugger';
import { createWave } from './Managers/WaveManager/WaveManager';
import { aStar } from './PathFinding/aStar/aStar';

window.onload = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const gameDebugModeCheckbox = document.getElementById('debugMode');

  const cols = 25;
  const rows = 25;
  const cellSize = 35;

  ctx.canvas.width = cols * cellSize;
  ctx.canvas.height = rows * cellSize;

  const gameDebugger = new GameDebugger(ctx, cellSize);

  const mouseManager = new MouseManager(canvas, ctx, cellSize);

  const mapManager = new MapManager(canvas, ctx, cellSize, gameDebugger);
  const turretsManager = new TurretsManager(canvas, ctx, cellSize);
  mapManager.renderMap();

  const shopManager = new ShopManager();
  const mobsManager = new MobsManager(
    ctx,
    mapManager.getStartSpawnPoint(),
    cellSize,
    turretsManager.getTurrets()
  );

  function gameLoop() {
    mapManager.renderMap();

    // ASTAR
    aStar(
      mapManager.getStartSpawnPoint(),
      mapManager.getEndSpawnPoint(),
      ctx,
      cellSize,
      gameDebugger
    );

    mouseManager.drawMousePosition();
    mobsManager.waveMobsMove();

    turretsManager.renderTurrets(mobsManager.getMobs());

    requestAnimationFrame(gameLoop);
  }

  gameLoop();
  createWave(mobsManager);
  shopManager.init();

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
