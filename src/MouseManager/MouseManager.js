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
    this.canvas.addEventListener('mousemove', handler);
  }

  mouseClickHandler(handler) {
    this.canvas.addEventListener('click', handler)
  }

  // move to another class
  createTurret(){
    this.mouseClickHandler(this.getMousePosPerTile());
  }

  normalizationCursorPosition(e) {
    let rect = this.canvas.getBoundingClientRect();
    this.x = e.clientX - rect.left;
    this.y = e.clientY - rect.top;
    this.cellX = ~~(this.x/this.cellSize);
    this.cellY = ~~(this.y/this.cellSize);
  }

  drawMousePosition() {
    const self = this;
    this.mouseMoveHandler(event => self.normalizationCursorPosition(event));
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    this.ctx.fillRect(this.getMousePosPerTile().x*this.cellSize, this.getMousePosPerTile().y*this.cellSize, 20, 20);
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
