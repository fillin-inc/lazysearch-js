import throttle from 'throttleit';

/**
 * ModalForm
 *
 * モーダル内の form 操作管理
 */
export default class ModalForm {
  /**
   * @constructor
   *
   * @param {Element} el - モーダル内 form の DOM
   * @param {Modal} modal - Modal オブジェクト
   */
  constructor(el, modal) {
    this.el = el;
    this.modal = modal;

    this.searchForm = this.el.getElementsByClassName('lz-search-form')[0];
    this.keyword = this.el.getElementsByClassName('lz-keyword')[0];
    this.x = this.el.getElementsByClassName('lz-x')[0];
    this.close = this.el.getElementsByClassName('lz-close')[0];
    this.setEventListner();
  }

  /**
   * キーワード欄を空に
   */
  removeKeyword() {
    this.keyword.value = '';
    this.keyword.parentNode.classList.remove(ModalForm.hasKeywordClass());
  }

  /**
   * キーワード欄の状態に応じて class 名を追加削除
   */
  toggleHasKeyword() {
    if (this.hasKeyword()) {
      this.searchForm.classList.add(ModalForm.hasKeywordClass());
    } else {
      this.searchForm.classList.remove(ModalForm.hasKeywordClass());
    }
  }

  /**
   * キーワード欄が空か判定
   *
   * @return {Boolean}
   */
  hasKeyword() {
    return (String(this.keyword.value).trim() !== '')
  }

  /**
   * イベントを設定
   *
   * - x クリックでキーワード欄を空に
   * - キーワード欄のキー入力を監視し値があれば class 追加
   * - close クリックでモーダルを閉じる
   */
  setEventListner() {
    this.x.addEventListener('click', (event) => {
      event.preventDefault();
      this.removeKeyword();
    });

    this.keyword.addEventListener('keyup', throttle(() => {
      this.toggleHasKeyword();
    }, 250));

    this.close.addEventListener('click', (event) => {
      event.preventDefault();
      this.modal.close();
    });
  }

  /**
   * キーワード存在時に追加する class 名
   *
   * @return {String}
   */
  static hasKeywordClass() {
    return 'has-keyword';
  }
}
