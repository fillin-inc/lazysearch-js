import Modal from './modal';
import Search from './search';
import Style from './templates/stylesheet.css';
import Template from './template';

/**
 * LazySearch
 *
 * 呼び出されたページに Modal を追加し
 * Search API を用いてサイト内検索を実施する
 */
export default class LazySearch {
  /**
   * @constructor
   */
  constructor() {
    if (!LazySearch.has()) {
      return;
    }
    Style.use();

    this.baseForm = document.querySelector('[data-lz]');
    this.search = new Search();
    this.modal = new Modal(Template.modal());
  }

  /**
   * モーダル DOM をページに追加
   */
  append() {
    document.getElementsByTagName('body')[0].appendChild(this.modal.el);
  }

  /**
   * イベント設定
   */
  setEventListner() {
    // モーダル内の close リンクをクリック時にモーダル非表示
    this.modal.closeLink.addEventListener('click', (event) => {
      event.preventDefault();
      this.modal.close();
    });

    // キーワード欄の x クリック時にキーワード欄を空
    this.modal.form.x.addEventListener('click', (event) => {
      event.preventDefault();
      this.modal.form.removeKeyword();
      this.modal.form.keyword.dispatchEvent(new Event('change'));
    });

    // キーワード入力欄の入力時に class 名付与削除
    this.modal.form.keyword.addEventListener('keyup', (event) => {
      this.modal.form.toggleHasKeyword();
    });

    // キーワード欄の値変更時に他のキーワード欄と値を同期
    const keywordsNode = document.querySelectorAll('[data-lz] [name=keyword], [data-lz-modal] [name=keyword]');
    const keywords = Array.prototype.slice.call(keywordsNode, 0);
    keywords.forEach((keyword) => {
      keyword.addEventListener('change', (event) => {
        this.search.reflectKeywordValue(keyword, keywords);
      });
    });

    // 検索ボタン押下時に検索を実行し結果を反映
    const btnSelectors = '[data-lz] .lz-button, [data-lz] [type=submit], [data-lz-modal] .lz-header .lz-button';
    const naviBtnSelectors = '.lz-button a';
    const btns = document.querySelectorAll(btnSelectors + ',' + naviBtnSelectors);
    Array.prototype.slice.call(btns, 0).forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        this.search.execute(btn, this.baseForm);

        if (!this.modal.isVisible()) {
          this.modal.open();
        }

        if (document.activeElement) {
          document.activeElement.blur();
        }
      });
    });
  }

  /**
   * LazySearch の検索設定が存在するか判定
   *
   * @return {Boolean}
   */
  static has() {
    return document.querySelector('[data-lz]').length >= 1;
  }
}
