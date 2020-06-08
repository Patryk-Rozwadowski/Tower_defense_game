import { MouseManager } from './Managers/MouseManager/MouseManager';
import { TurretsManager } from './Managers/TurretManager/TurretManager';
import { MapManager } from './Managers/MapManager/MapManager';
import { ShopManager } from './Managers/ShopManager/ShopManager';

window.onload = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const cols = 15;
  const rows = 15;
  const cellSize = 25;

  ctx.canvas.width = cols * cellSize;
  ctx.canvas.height = rows * cellSize;

  const mouseManager = new MouseManager(canvas, ctx, cellSize);
  const turretsManager = new TurretsManager(canvas, ctx, cellSize);
  const mapManager = new MapManager(canvas, ctx, cellSize);
  const shopManager = new ShopManager();

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

  function draw() {
    mapManager.renderMap();
    mouseManager.drawMousePosition();

    turretsManager.renderTurrets();
    requestAnimationFrame(draw);
  }
  draw();
};
