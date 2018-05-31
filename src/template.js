import modal from './templates/modal.html';
import result from './templates/result.html';

/**
 * Template
 *
 * テンプレートデータを管理する
 */
export default class Template {
  /**
   * @return {Element} モーダルの DOM 要素
   */
  static modal() {
    const el = document.createElement('div');
    el.innerHTML = modal;
    return el.querySelector('[data-lz-modal]');
  }

  /**
   * @return {Element} モーダル内の検索表示用 DOM 要素
   */
  static result() {
    const el = document.createElement('div');
    el.innerHTML = result;
    return el.querySelector('.lz-result');
  }
}
