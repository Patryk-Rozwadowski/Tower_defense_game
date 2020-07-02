export class ScoreManager {
  constructor() {
    this.score = 0;
    this.scoreUi = document.getElementById('ui-score');
  }

  addScore(value) {
    this.score += value;
  }

  renderScore() {
    this.scoreUi.innerHTML = `Score: ${this.score}`;
  }
}
