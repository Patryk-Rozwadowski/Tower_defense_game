export class GameDebugger {
  constructor(ctx, cellSize) {
    this.ctx = ctx;
    this.cellSize = cellSize;

    this.debugMode = false;
  }

  set toggleDebuggerMode(toggle) {
    this.debugMode = toggle;
  }

  addText(
    txt,
    size = this.cellSize / 4,
    color,
    vectorX,
    vectorY,
    fontFamily = 'Arial'
  ) {
    if (!this.debugMode) return;
    this.ctx.beginPath();
    this.ctx.font = `${size}px ${fontFamily}`;
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = color;
    this.ctx.fillText(`${txt}`, vectorX, vectorY);
    this.ctx.stroke();
  }

  fillTile(tile, color) {
    if (!this._isDebugMode()) return;
    let x, y;
    if (tile.vector) {
      x = tile.vector[0];
      y = tile.vector[1];
    } else {
      x = tile[0];
      y = tile[1];
    }

    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
  }

  fillMap(arr, color) {
    if (!this._isDebugMode()) return;
    arr.map((tile) => this.fillTile(tile, color));
  }

  debugTileVectors(x, y) {
    if (!this._isDebugMode()) return;
    this.addText(
      `[${x} ${y}]`,
      this.cellSize / 5,
      '#fff',
      x - this.cellSize / 2,
      y - this.cellSize / 2
    );
  }

  _isDebugMode() {
    return this.debugMode;
  }
}
