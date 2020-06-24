import { removeElementFromArrReverse } from '../Utils/RemoveElFromArrReverse';

export function aStar(start, end, ctx, cellSize, gameDebugger) {
  let openSet = [];
  let closedSet = [];
  let winner = 0;

  openSet.push(start);

  closedSet.push(end);

  while (openSet.length > 0) {
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[winner].f > openSet[i].f) {
        winner = i;
      }
    }

    let current = openSet[winner];

    if (current === end) {
      console.log('Done');
    }

    removeElementFromArrReverse(openSet, current);
    closedSet.push(current);

    current.neighbors.map((neighbor) => {
      gameDebugger.fillTile(neighbor.vector, 'rgba(168, 199, 220, 0.25)');

      if (!closedSet.includes(neighbor)) {
        const currG = current.g + 1;

        if (openSet.includes(neighbor)) {
          if (currG < neighbor.g) {
            neighbor.g = currG;
          }
        } else {
          neighbor.g = currG;
          openSet.push(neighbor);
        }
      }
    });
  }
}
