import { shopMenuHeader } from './templates/shopMenu/shopMenuHeader';
import { shopTurretList } from './templates/shopTurretList/shopTurretList';

export class ShopManager {
  constructor() {
    this.money = 40;
    this.shopRoot = document.getElementById('shop');
    this.pickedTurret = 'powerTurret';
  }

  init() {
    this.renderPanel();
    this.pickedTurretType();
  }

  // MONEY
  getMoney() {
    return this.money;
  }

  setMoney(value) {
    this.money = value;
  }

  // TURRETS
  getPickedTurret() {
    console.log(`getPickedTurret ${this.pickedTurret}`);
    return this.pickedTurret;
  }

  pickedTurretType() {
    this._shopClickHandler((e) => this._chooseTurret(e));
  }

  renderPanel() {
    this.shopRoot.innerHTML = `
    ${shopMenuHeader(this.money)}
    ${shopTurretList()}
    `;
  }

  // PRIVATE
  _shopClickHandler(handler) {
    this.shopRoot.addEventListener('click', handler);
  }

  _chooseTurret(e) {
    this.pickedTurret = e.target.id;
    return this.pickedTurret;
  }
}
