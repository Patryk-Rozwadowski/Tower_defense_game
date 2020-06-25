import { turretTypes } from '../index';

export function createPowerTurret(x, y) {
  return {
    y: y,
    x: x,
    color: '#FFf5edba',
    type: turretTypes.power,
    range: 150,
    damage: 60,
    firingSpeed: 2,
    turret: true,
  };
}
