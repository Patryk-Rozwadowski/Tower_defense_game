export function createFastFiringTurret(x, y) {
  return {
    y: y,
    x: x,
    color: '#FF34859d',
    type: 'fastFiringTurret',
    range: 100,
    turret: true,
    damage: 40,
    attackSpeed: 1000,
    shootingAllowed: true,
  };
}
