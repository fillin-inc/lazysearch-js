/**
 * ModalResults
 *
 * モーダル内の検索結果の操作管理
 */
export default class ModalResults {
  /**
   * @constructor
   *
   * @param {Element} el - div.lz-results の DOM
   */
  constructor(el) {
    this.el = el;
  }

  /**
   * 結果描画
   *
   * @param {Element} el - 描画内容が含まれた DOM
   * @param {Boolean} hasError - エラー表示か否か
   */
  write(el, hasError = false) {
    this.setError(hasError);

    this.el.innerHTML = '';
    this.el.appendChild(el);
  }

  /**
   * エラー class の付与削除
   *
   * @param {Boolean} hasError - エラー表示か否か
   */
  setError(hasError) {
    if (hasError) {
      this.el.classList.remove('has-error');
    } else {
      this.el.classList.add('has-error');
    }
  }
}
