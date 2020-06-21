// @todo temp
export function createWave(mobsManager) {
  const fast = 'fast';
  const tank = 'tank';

  const wave = [tank, tank, tank, fast, fast];
  mobsManager.renderMob(wave);
}
