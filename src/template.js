import modal from './templates/modal.html';
import result from './templates/result.html';

/**
 * Template
 *
 * テンプレートデータを管理する
 */
export default class Template {
  /**
   * @constructor
   */
  constructor() {
    this._setModal();
    this._setResult();
  }

  /**
   * @return {Element} モーダルの DOM 要素
   */
  modal() {
    return this._modal;
  }

  /**
   * @return {Element} モーダル内の検索表示用 DOM 要素
   */
  result() {
    return this._result;
  }

  /**
   * モーダル DOM 作成
   */
  _setModal() {
    const el = document.createElement('div');
    el.innerHTML = modal;
    this._modal = el.querySelector('[data-lz-modal]');
  }

  /**
   * モーダル内の検索表示用 DOM 作成
   */
  _setResult() {
    const el = document.createElement('div');
    el.innerHTML = result;
    this._result = el.querySelector('.lz-result');
  }
}
