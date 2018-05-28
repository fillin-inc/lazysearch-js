import Throttle from 'throttleit';

/**
 * Modal
 *
 * controle Search Modal
 */
export default class Modal {
  /**
   * @constructor
   * @param {Element} el - モーダル用ラッパーdiv のDOM
   */
  constructor(el) {
    this._el = el;
  }

  /**
   * @return {Element} - モーダル用ラッパー div
   */
  el() {
    return this._el;
  }

  /**
   * モーダルを body 閉じタグ直前に挿入
   */
  append() {
    const body = document.getElementsByTagName('body');
    if (body.length === 0) {
      window.console.log('lz.js could not find <body> tag.');
      return;
    }
    body[0].appendChild(this._el);
    this._setEvent();
  }

  /**
   * モーダルを開く
   */
  open() {
    this._el.classList.add('is-active');
    this.setHasKeyword();
    document.getElementsByTagName('body')[0].classList.add('lz-overflow-hidden');
  }

  /**
   * モーダルを閉じる
   */
  close() {
    if (!this.isVisible()) {
      return;
    }

    this._el.classList.add('is-fadeout');
    this._el.classList.remove('is-active');
    setTimeout(function() {
      document.querySelector('[data-lz-modal]').classList.remove('is-fadeout');
    }, 200);
    document.getElementsByTagName('body')[0].classList.remove('lz-overflow-hidden');
  }

  /**
   * モーダルが表示されているかチェック
   * @return {Boolean}
   */
  isVisible() {
    return (this._el.className.indexOf('is-active') >= 0);
  }

  /**
   * キーワードが存在する場合に class 付与
   */
  setHasKeyword() {
    const searchForm = this._el.getElementsByClassName('lz-search-form')[0];
    const searchKeyword = this._el.getElementsByClassName('lz-keyword')[0];
    if (searchKeyword.value !== '') {
      searchForm.classList.add('has-keyword');
    } else {
      searchForm.classList.remove('has-keyword');
    }
  }

  /**
   * イベント設定
   */
  _setEvent() {
    const self = this;

    // x ボタンで検索キーワードを削除
    this._el.querySelector('.lz-header .lz-x').addEventListener('click', function(event) {
      event.preventDefault();
      const target = document.querySelector('.lz-search-form .lz-keyword');
      target.value = '';
      target.parentNode.classList.remove('has-keyword');
    });

    // キーアップ時に入力内容が空であれば has-keyword クラスを削除
    // eslint-disable-next-line new-cap
    this._el.querySelector('.lz-header .lz-keyword').addEventListener('keyup', Throttle(function(event) {
      self.setHasKeyword();
    }, 250));

    // cancel でモーダルを閉じる
    this._el.getElementsByClassName('lz-close')[0].addEventListener('click', function(event) {
      event.preventDefault();
      self.close();
    });
  }
}
