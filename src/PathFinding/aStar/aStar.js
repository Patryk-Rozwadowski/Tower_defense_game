import { removeElementFromArrReverse } from '../../Utils/RemoveElFromArrReverse';
import { FindDistanceBetweenVectors } from '../../Managers/TurretManager/FindDistanceBetweenVectors/FindDistanceBetweenVectors';

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
      let neiX = neighbor.vector[0];
      let neiY = neighbor.vector[1];

      let endX = end.vector[0];
      let endY = end.vector[1];

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

        neighbor.h = FindDistanceBetweenVectors(neiX, neiY, endX, endY);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.cameFrom = current;
      }
    });
  }
}
