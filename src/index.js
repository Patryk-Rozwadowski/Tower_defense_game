import { MouseManager } from './MouseManager/MouseManager';
import { CreateWalls } from './CreateElement/Walls/CreateWalls';
import { createTile } from './CreateElement/MapElement/createTile';
import { createWall } from './CreateElement/Walls/CreateWalls';

window.onload = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const cols = 25;
  const rows = 25;
  const cellSize = 20;

  const turrets = [];
  const gameMap = [];

  ctx.canvas.width = cols * cellSize;
  ctx.canvas.height = rows * cellSize;
  ctx.globalAlpha = 1;

  const mouseManager = new MouseManager(canvas, ctx, cellSize);
  const walls = new CreateWalls(canvas, ctx);

  function drawMap() {
    let setMap;
    let y = 0;
    let x = 0;

    for (let i = 0; i <= rows; i++) {
      gameMap[i] = [];
      x = 0;
      if (i > 0) y += cellSize;

      for (let j = 0; j <= cols; j++) {
        if (j > 0) x += cellSize;
        setMap = createTile(y, x);
        gameMap[i][j] = setMap;

        let xVec = gameMap[i][j].vector[0];
        let yVec = gameMap[i][j].vector[1];

        if (
          walls.createUpperWall(j) ||
          walls.createLeftWall(i) ||
          walls.createRightWall(i + 1, cols) ||
          walls.createBottomWall(j + 1, rows)
        ) {
          gameMap[i][j] = createWall(y, x);
        }

        ctx.fillStyle = gameMap[i][j].color;
        ctx.fillRect(xVec, yVec, cellSize, cellSize);
      }
    }
  }

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
    drawMap();
    mouseManager.drawMousePosition();
    turrets.map((el) => {
      ctx.fillStyle = el.color;
      ctx.fillRect(el.x, el.y, cellSize, cellSize);
    });
    requestAnimationFrame(draw);
  }
  draw();
};
