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
    this.mouseMoveHandler()
    this.mouseClickHandler()
  }

  mouseMoveHandler() {
    const self = this;
    this.canvas.addEventListener('mousemove', (e) => {
      self.ctx.clearRect(0,0,self.canvas.width, self.canvas.height);
      self.normalizationCursorPosition(e)
      self.drawMousePosition()
    })
  }

  mouseClickHandler() {
    const self = this;
    this.canvas.addEventListener('click', e => {
      self.normalizationCursorPosition(e);
      return self.getMousePosCanvas();
    });
  }

  drawMousePosition() {
    this.ctx.globalAlpha = 0.5;
    this.ctx.fillRect(this.getMousePosPerTile().x * this.cellSize,this.getMousePosPerTile().y*this.cellSize, this.cellSize, this.cellSize);
  }

  placeTurret() {
    this.ctx.fillRect(this.getMousePosPerTile().x * this.cellSize,this.getMousePosPerTile().y*this.cellSize, this.cellSize, this.cellSize);
  }

  normalizationCursorPosition(e) {
    let rect = this.canvas.getBoundingClientRect();
    this.x = e.clientX - rect.left;
    this.y = e.clientY - rect.top;
    this.cellX = ~~(this.x/this.cellSize);
    this.cellY = ~~(this.y/this.cellSize);
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
