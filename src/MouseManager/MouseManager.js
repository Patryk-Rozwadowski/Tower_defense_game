export class MouseManager {
  constructor(canvas, ctx, cellSize) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = 0;
    this.y = 0;
    this.cellX = 0;
    this.cellY = 0;

    this.cellSize = cellSize;
  }

  init() {
    const self = this;
    this.canvas.addEventListener("mousemove", function(e) {
      let rect = self.canvas.getBoundingClientRect();
      self.x = e.clientX - rect.left;
      self.y = e.clientY - rect.top;
      self.cellX = ~~(self.x/self.cellSize);
      self.cellY = ~~(self.y/self.cellSize);
      self.mouseMoveHandler(self.drawMousePosition(self.ctx, this.cellX, this.cellY));
    });
  }

  mouseMoveHandler(handler) {
    this.canvas.addEventListener('mousemove', handler);
  }

  drawMousePosition() {
    this.ctx.globalAlpha = 0.5;
    this.ctx.fillRect(this.getMousePos().x * this.cellSize,this.getMousePos().y*this.cellSize, this.cellSize, this.cellSize);
  }

  getMousePos() {
    return {
      x: this.cellX,
      y: this.cellY
    }
  }
}
