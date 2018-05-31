import ModalForm from './modal/form';

/**
 * Modal
 *
 * モーダル表示の操作管理
 */
export default class Modal {
  /**
   * @constructor
   *
   * @param {Element} el - モーダル用ラッパー div.lz-modal のDOM
   */
  constructor(el) {
    this.el = el;
    this.body = document.getElementsByTagName('body')[0];
    this.closeLink = this.el.getElementsByClassName('lz-close')[0];

    this.form = new ModalForm(this.el.querySelector('.lz-header form'));
  }

  /**
   * モーダルを開く
   */
  open() {
    this.el.classList.add('is-active');
    this.form.toggleHasKeyword();
    this.body.classList.add('lz-overflow-hidden');
  }

  /**
   * モーダルを閉じる
   */
  close() {
    if (!this.isVisible()) {
      return;
    }

    this.el.classList.add('is-fadeout');
    this.el.classList.remove('is-active');
    setTimeout(() => {
      this.el.classList.remove('is-fadeout');
    }, 200);
    this.body.classList.remove('lz-overflow-hidden');
  }

  /**
   * モーダルが表示されているかチェック
   * @return {Boolean}
   */
  isVisible() {
    return (this.el.className.indexOf('is-active') >= 0);
  }
}
