export function HeuristicDistance(currentX, currentY, targetX, targetY) {
  return parseInt(
    Math.sqrt(Math.pow(currentX - targetX, 2) + Math.pow(currentY - targetY, 2))
  );
}
