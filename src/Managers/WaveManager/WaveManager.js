// @todo temp
export function createWave(mobsManager) {
  const fast = 'fast';
  const tank = 'tank';

  const wave = [tank, fast, tank, fast, tank, fast];
  mobsManager.renderMob(wave);
}
