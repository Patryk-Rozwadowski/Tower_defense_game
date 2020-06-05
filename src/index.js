import { MouseManager } from './MouseManager/MouseManager';
import { renderMap } from './CreateElement/MapElement/renderMap';

window.onload = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const cols = 15;
  const rows = 15;
  const cellSize = 25;

  const turrets = [];
  const gameMap = [];

  ctx.canvas.width = cols * cellSize;
  ctx.canvas.height = rows * cellSize;

  const mouseManager = new MouseManager(canvas, ctx, cellSize);
  function createTurret(y, x) {
    return {
      y: y,
      x: x,
      color: '#fff',
    };
  }

  function placeTurret(vector) {
    turrets.push(createTurret(vector.y * cellSize, vector.x * cellSize));
    console.log(`Place turret: ${vector.x} ${vector.y}`);
    console.log(gameMap);
  }

  mouseManager.mouseClickHandler(() =>
    placeTurret(mouseManager.getMousePosPerTile())
  );

  function draw() {
    renderMap(ctx, gameMap, rows, cols, cellSize);
    mouseManager.drawMousePosition();

    turrets.map((el) => {
      ctx.fillStyle = el.color;
      ctx.fillRect(el.x, el.y, cellSize, cellSize);
    });
    requestAnimationFrame(draw);
  }
  draw();
};
