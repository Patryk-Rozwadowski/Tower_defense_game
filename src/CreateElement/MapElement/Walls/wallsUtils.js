export function isUpperWall(x) {
  return x === 0;
}

export function isLeftWall(y) {
  return y === 0;
}

export function isBottomWall(lastColumn, lastRow) {
  // lastColumn - max value for number of columns + 1
  // LastRow - max value of rows
  return lastColumn === lastRow;
}

export function isRightWall(y, lastColumn) {
  // lastColumn - max value for number of columns + 1
  return y === lastColumn;
}
