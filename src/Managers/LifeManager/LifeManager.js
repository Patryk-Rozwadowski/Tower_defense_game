export class LifeManager {
  constructor() {
    this.lifeUi = document.getElementById('ui-life');
    this.life = 20;
  }

  checkIfGameOver() {
    return this.life <= 0;
  }

  lifeHit() {
    this.life--;
  }

  renderLife() {
    this.lifeUi.innerHTML = `<p>Life: ${this.life}</p>`;
  }
}
