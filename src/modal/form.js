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
   */
  constructor(el) {
    this.el = el;

    this.searchForm = this.el.getElementsByClassName('lz-search-form')[0];
    this.keyword = this.el.getElementsByClassName('lz-keyword')[0];
    this.x = this.el.getElementsByClassName('lz-x')[0];
  }

  /**
   * キーワード欄が空か判定
   *
   * @return {Boolean}
   */
  hasKeyword() {
    return (String(this.keyword.value).trim() !== '');
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
   * キーワード存在時に追加する class 名
   *
   * @return {String}
   */
  static hasKeywordClass() {
    return 'has-keyword';
  }
}
