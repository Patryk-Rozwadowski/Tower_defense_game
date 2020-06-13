import { MouseManager } from './Managers/MouseManager/MouseManager';
import { TurretsManager } from './Managers/TurretManager/TurretManager';
import { MapManager } from './Managers/MapManager/MapManager';
import { ShopManager } from './Managers/ShopManager/ShopManager';
import { MobsManager } from './Managers/MobsManager/MobsManager';

window.onload = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const cols = 15;
  const rows = 15;
  const cellSize = 35;

  ctx.canvas.width = cols * cellSize;
  ctx.canvas.height = rows * cellSize;

  const mouseManager = new MouseManager(canvas, ctx, cellSize);
  const turretsManager = new TurretsManager(canvas, ctx, cellSize);
  const mapManager = new MapManager(canvas, ctx, cellSize);

  mapManager.renderMap();

  const shopManager = new ShopManager();
  const mobsManager = new MobsManager(
    ctx,
    mapManager.getSpawnPoints(),
    cellSize,
    turretsManager.getTurrets()
  );

  function createWave() {
    const fast = 'fast';
    const tank = 'tank';

    const wave = [tank, tank, tank, fast, fast];
    mobsManager.renderMob(wave);
  }

  function draw() {
    mapManager.renderMap();
    mouseManager.drawMousePosition();
    mobsManager.waveMobsMove();
    turretsManager.renderTurrets();

    requestAnimationFrame(draw);
  }

  draw();
  createWave();
  shopManager.init();

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
