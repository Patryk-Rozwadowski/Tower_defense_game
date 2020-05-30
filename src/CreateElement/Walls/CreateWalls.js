export class CreateWalls {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  createWalls() {
    this.createUpperWall();
    this.createBottomWall();
    this.createLeftWall();
    this.createRightWall();
  }

  createUpperWall(firstColumn) {
    return firstColumn === 0;
  }

  createLeftWall(firstRow) {
    return firstRow === 0;
  }

  createBottomWall(lastColumn, lastRow) {
    return lastColumn === lastRow;
  }

  createRightWall(row, lastColumns) {
    return row === lastColumns;
  }
};