import { MouseManager } from './Managers/MouseManager/MouseManager';
import { renderMap } from './CreateElement/MapElement/renderMap';
import { TurretsManager } from './Managers/TurretManager/TurretManager';

window.onload = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const cols = 15;
  const rows = 15;
  const cellSize = 25;

  const gameMap = [];

  ctx.canvas.width = cols * cellSize;
  ctx.canvas.height = rows * cellSize;

  const mouseManager = new MouseManager(canvas, ctx, cellSize);
  const turretsManager = new TurretsManager(canvas, ctx, cellSize);

  mouseManager.mouseClickHandler(() =>
    turretsManager.placeTurret(mouseManager.getMousePosPerTile())
  );

  function draw() {
    renderMap(ctx, gameMap, rows, cols, cellSize);
    mouseManager.drawMousePosition();
    turretsManager.renderTurrets();
    requestAnimationFrame(draw);
  }
  draw();
};
