// @todo change naming for walls
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
}

export function createWall(y, x) {
  return {
    id: Math.random(),
    name: 'Wall',
    vector: [y, x],
    color: '#FF0000',
    tower: false,
  };
}
