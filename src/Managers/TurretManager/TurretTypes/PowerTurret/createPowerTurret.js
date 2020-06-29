import { turretTypes } from '../index';

export function createPowerTurret(x, y) {
  return {
    y: y,
    x: x,
    color: '#FFf5edba',
    type: turretTypes.power,
    range: 150,
    damage: 100,
    firingSpeed: 2,
    turret: true,
  };
}
