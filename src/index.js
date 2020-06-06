import { MouseManager } from './MouseManager/MouseManager';
import { renderMap } from './CreateElement/MapElement/renderMap';
import { normalizedTilePositions } from './Units/NormalizedTilePositions';

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
      type: 'turret',
      turret: true,
    };
  }

  function placeTurret(vector) {
    const vectorNormY = normalizedTilePositions(vector.y, cellSize);
    const vectorNormX = normalizedTilePositions(vector.x, cellSize);

    let freeTile = checkIfTileIsFree(vector, turrets);

    if (turrets.length === 0 || freeTile)
      turrets.push(createTurret(vectorNormY, vectorNormX));
    console.log(turrets);
  }

  function checkIfTileIsFree(vector, turrets) {
    let freeTile;

    for (let i = 0; i < turrets.length; i++) {
      const turretChosenTileSameVectors =
        turrets[i].x === normalizedTilePositions(vector.x, cellSize) &&
        turrets[i].y === normalizedTilePositions(vector.y, cellSize);

      const turretChosenTileDiffVectors =
        turrets[i].x !== normalizedTilePositions(vector.x, cellSize) &&
        turrets[i].y !== normalizedTilePositions(vector.y, cellSize);

      // Check if tile is already taken
      if (turretChosenTileSameVectors) {
        freeTile = false;
      } else if (turretChosenTileDiffVectors) {
        freeTile = true;
      }
    }
    return freeTile;
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
