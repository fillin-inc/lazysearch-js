/**
 * ModalNavigation
 *
 * ナビゲーション操作管理
 */
export default class ModalNavigation {
  /**
   * @constructor
   *
   * @param {Element} el - ナビゲーション DOM
   */
  constructor(el) {
    this.el = el;
  }

  /**
   * ナビゲーション更新
   *
   * @param {Hash} data - ナビゲーション情報
   */
  update(data) {
    if (data.has_next) {
      this.el.classList.add('is-active');
    } else {
      this.el.classList.remove('is-active');
    }
  }
}
