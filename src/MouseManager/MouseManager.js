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
    this.mouseMoveHandler(this.drawMousePosition())
  }

  mouseMoveHandler() {
    const self = this;
    this.canvas.addEventListener('mousemove', (e) => {
      self.normalizationCursorPosition(e)
      self.drawMousePosition()
    })
  }

  // mouseClickHandler(handler, a) {
  //   const self = this;
  //   this.canvas.addEventListener('click', e => {
  //
  //     //norm
  //     handler(e);
  //     return function(handlerd) {
  //       handlerd(e);
  //     }
  //   });
  // }

  drawMousePosition() {
    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    this.ctx.globalAlpha = 0.5;
    this.ctx.fillRect(this.getMousePos().x * this.cellSize,this.getMousePos().y*this.cellSize, this.cellSize, this.cellSize);
  }

  // placeTurret() {
  //   canvas.addEventListener('click', e => {
  //     ctx.save();
  //     ctx.globalAlpha = 0.5;
  //     ctx.fillRect(a.getMousePos().x,a.getMousePos().y, cellWidth, cellHeight);
  //     ctx.restore();
  //   })
  // } self.ctx.clearRect(0,0,self.canvas.width, self.canvas.height);
  //         self.ctx.globalAlpha = 0.5;
  //         self.ctx.fillRect(self.getMousePos().x * this.cellSize,self.getMousePos().y*self.cellSize, self.cellSize, self.cellSize);

  normalizationCursorPosition(e) {
    let rect = this.canvas.getBoundingClientRect();
    this.x = e.clientX - rect.left;
    this.y = e.clientY - rect.top;
    this.cellX = ~~(this.x/this.cellSize);
    this.cellY = ~~(this.y/this.cellSize);
  }

  getMousePos() {
    return {
      x: this.cellX,
      y: this.cellY
    }
  }
}
