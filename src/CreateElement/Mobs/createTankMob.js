// @todo delete duplicates
export class TankMob {
  constructor(ctx, cellSize, x, y) {
    this.ctx = ctx;
    this.cellSize = cellSize;
    this.x = x;
    this.y = y;
    this.color = '#fff';
    this.type = 'tank';
    this.color = '#fff';
    this.mobSize = 10;
    this.speed = 0.25;
    this.hp = 500;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(
      this.x - this.mobSize + 10,
      this.y + this.cellSize / 2,
      this.mobSize,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
    this.ctx.stroke();
    this.move();
  }

  move() {
    this.x += this.speed;
  }
}

export class FastMob {
  constructor(ctx, cellSize, x, y) {
    this.ctx = ctx;
    this.cellSize = cellSize;
    this.x = x;
    this.y = y;
    this.color = '#fff';
    this.type = 'fast';
    this.color = '#fff';
    this.mobSize = 6;
    this.speed = 1;
    this.hp = 200;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(
      this.x - this.mobSize + 10,
      this.y + this.cellSize / 2,
      this.mobSize,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
    this.ctx.stroke();
    this.move();
  }

  move() {
    this.x += this.speed;
  }
}
