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

  mouseMoveHandler(handler) {
    const self = this;
    this.canvas.addEventListener('mousemove', event => handler(event, self));
  }

  mouseClickHandler(handler) {

  }

  normalizationCursorPosition(e, self) {
    let rect = self.canvas.getBoundingClientRect();
    self.x = e.clientX - rect.left;
    self.y = e.clientY - rect.top;
    self.cellX = ~~(self.x/self.cellSize);
    self.cellY = ~~(self.y/self.cellSize);
  }

  drawMousePosition() {
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    this.ctx.fillRect(this.getMousePosPerTile().x*this.cellSize, this.getMousePosPerTile().y*this.cellSize, 20, 20)
  }

  placeTurret() {
    this.ctx.fillRect(this.getMousePosPerTile().x * this.cellSize,this.getMousePosPerTile().y*this.cellSize, this.cellSize, this.cellSize);
  }

  getMousePosPerTile() {
    return {
      x: this.cellX,
      y: this.cellY
    }
  }

  getMousePosCanvas() {
    let x = Math.ceil(this.x / 10) * 10;
    let y = Math.ceil(this.y / 10) * 10;
    return [x,y]
  }
}
