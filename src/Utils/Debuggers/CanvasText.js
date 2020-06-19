export class GameDebugger {
  constructor(ctx, cellSize, debugMode) {
    this.ctx = ctx;
    this.cellSize = cellSize;

    this.debugMode = debugMode;
  }

  addText(txt, size, color, vectorX, vectorY, fontFamily = 'Arial') {
    if (!this.debugMode) return;
    this.ctx.beginPath();
    this.ctx.font = `${size}px ${fontFamily}`;
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = color;
    this.ctx.fillText(`${txt}`, vectorX, vectorY);
    this.ctx.stroke();
  }

  fillTile(tile, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      tile.vector[0],
      tile.vector[1],
      this.cellSize,
      this.cellSize
    );
  }

  fillMap(arr, color) {
    if (!this.debugMode) return;
    arr.map((tile) => this.fillTile(tile, color));
  }

  debugTileVectors(x, y) {
    this.addText(
      `${x} ${y}`,
      this.cellSize / 5,
      '#fff',
      x - this.cellSize / 2,
      y - this.cellSize / 2
    );
  }
}
