export class MobsManager {
  constructor(ctx, spawnPoints, cellSize) {
    this.ctx = ctx;
    this.cellSize = cellSize;
    this.x = 0;
    this.y = 0;

    this.spawnPoints = spawnPoints;

    this.mobSize = 5;
  }

  init() {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#FF8c8fae';

    console.log(this.spawnPoints);

    // X position is for "simulation" how mob is coming from out of the map
    this.ctx.arc(
      this.spawnPoints.x + this.cellSize + this.mobSize + 1,
      this.spawnPoints.y + this.cellSize / 2,
      this.mobSize,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
    this.ctx.stroke();
  }
}
