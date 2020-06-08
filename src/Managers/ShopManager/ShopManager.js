import { shopMenuHeader } from './templates/shopMenu/shopMenuHeader';
import { shopTurretList } from './templates/shopTurretList/shopTurretList';

export class ShopManager {
  constructor() {
    this.money = 140;
    this.shopRoot = document.getElementById('shop');
    this.pickedTurret = 'powerTurret';
  }

  init() {
    this.renderPanel();
    this.pickTurretType();
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
    return this.pickedTurret;
  }

  pickTurretType() {
    this._shopClickHandler((e) => this._setPickedTurret(e));
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

  _setPickedTurret(e) {
    this.pickedTurret = e.target.id;
    return this.getPickedTurret();
  }
}
