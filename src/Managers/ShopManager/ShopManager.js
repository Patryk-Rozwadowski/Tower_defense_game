import { shopMenuHeader } from './templates/shopMenu/shopMenuHeader';
import { shopTurretList } from './templates/shopTurretList/shopTurretList';

export class ShopManager {
  constructor() {
    this.money = 0;
    this.shopRoot = document.getElementById('shop');
  }

  init() {
    this._renderPanel();
    this.pickedTurretType();
  }

  getMoney() {
    return this.money;
  }

  setMoney(value) {
    this.money = value;
  }

  pickedTurretType() {
    this._shopClickHandler(this._chooseTurret);
  }

  _shopClickHandler(handler) {
    this.shopRoot.addEventListener('click', handler);
  }

  _renderPanel() {
    this.shopRoot.innerHTML = `
    ${shopMenuHeader(this.money)}
    ${shopTurretList()}
    `;
  }

  _chooseTurret(e) {
    console.log(e.target.value);
  }
}
