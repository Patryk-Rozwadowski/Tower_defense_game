import { createFastFiringTurret } from '../../Managers/TurretManager/TurretTypes/FastFiring/createFastFiringTurret';
import { createPowerTurret } from '../../Managers/TurretManager/TurretTypes/PowerTurret/createPowerTurret';

export function createTurret(type, x, y) {
  switch (type) {
    case 'fastFiringTurret':
      return createFastFiringTurret(x, y);

    case 'powerTurret':
      return createPowerTurret(x, y);
  }
}
