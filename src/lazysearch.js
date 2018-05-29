import Modal from './modal';
import Painter from './painter';
import Params from './params';
import Search from './search';
import Style from './templates/stylesheet.css';
import Template from './template';

/**
 * LazySearch Object
 *
 * - Create and Display Modal
 * - Do Search
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

    this._search = new Search();
    this._modal = new Modal(Template.modal());
    this._setSearchEvent();
  }

  /**
   * 検索処理用のイベントを設定
   */
  _setSearchEvent() {
    const self = this;

    const btnSelectors = '[data-lz] .lz-button, [data-lz] [type=submit], [data-lz-modal] .lz-header .lz-button';
    const naviBtnSelectors = '.lz-button a';
    const btns = document.querySelectorAll(btnSelectors + ',' + naviBtnSelectors);

    const keywords = document.querySelectorAll('[data-lz] [name=keyword], [data-lz-modal] [name=keyword]');
    const keywordsLength = keywords.length;

    const modalNavi = document.querySelector('[data-lz-modal] .lz-nav');
    let i = 0;

    // 関連する検索窓の入力値を連携させる
    for (let keyword of keywords) {
      keyword.addEventListener('change', function(event) {
        for (i = 0; i < keywordsLength; i += 1) {
          if (keywords[i] !== event.target) {
            keywords[i].value = event.target.value;
          }
        }
      });
    }

    for (let btn of btns) {
      btn.addEventListener('click', function(event) {
        event.preventDefault();

        const target = event.currentTarget || event.srcElement;
        const params = (new Params()).collect(document.querySelector('[data-lz]'));
        if (target.parentNode.className.indexOf('lz-button') >= 0) {
          params.page = parseInt(target.parentNode.dataset.page, 10);
        }

        if (!params.hasKeyword()) {
          Painter.noKeyword(document.querySelector('[data-lz-modal] .lz-results'));
          modalNavi.classList.remove('is-active');
          return;
        }

        self._search
          .fetch(params)
          .then(self._drawResult)
          .then(self._drawNavi);

        if (!self._modal.isVisible()) {
          self._modal.open();
        }

        if (document.activeElement) {
          document.activeElement.blur();
        }
      });
    }
  }

  /**
   * 検索結果を描画
   *
   * @param {Response} res - Fetch API のレスポンス
   * @return {Hash} ナビゲーション描画用ハッシュデータ
   */
  _drawResult(res) {
    const wrapper = document.querySelector('[data-lz-modal] .lz-results');
    if (!res.ok) {
      return res.json().then((body) => {
        Painter.error(wrapper, body);
        return {
          navigation: false,
          page: parseInt(body.current_page, 10),
          per_page: parseInt(body.per_page, 10),
          count: parseInt(body.count, 10),
          has_next: body.has_next,
          keyword: body.keyword,
        };
      });
    } else {
      return res.json().then((body) => {
        let showNavigation = true;
        if (body.count > 0) {
          Painter.result(wrapper, body);
        } else {
          showNavigation = false;
          Painter.empty(wrapper);
        }

        document.querySelector('[data-lz-modal] .lz-body').scrollTop = 0;
        return {
          navigation: showNavigation,
          page: parseInt(body.current_page, 10),
          per_page: parseInt(body.per_page, 10),
          count: parseInt(body.count, 10),
          has_next: body.has_next,
          keyword: body.keyword,
        };
      });
    }
  }

  /**
   * 検索結果のナビゲーション表示
   *
   * @param {Hash} info - _drawResult が返すハッシュ
   * @return {Hash} パラメータと同内容のハッシュ
   */
  _drawNavi(info) {
    const navi = document.querySelector('[data-lz-modal] .lz-nav');
    const nextBtn = navi.getElementsByClassName('lz-next')[0];
    const prevBtn = navi.getElementsByClassName('lz-prev')[0];

    if (info.count) {
      navi.getElementsByClassName('lz-total-num')[0].innerHTML = info.count;
    }

    if (info.page) {
      const totalPage = Math.ceil(info.count / info.per_page);
      navi.getElementsByClassName('lz-current-page')[0].innerHTML = info.page;
      navi.getElementsByClassName('lz-total-page')[0].innerHTML = totalPage;
    }

    if (info.has_next) {
      nextBtn.classList.add('is-active');
      nextBtn.dataset.page = info.page + 1;
    } else {
      nextBtn.classList.remove('is-active');
      nextBtn.dataset.page = 1;
    }

    if (info.page > 1) {
      prevBtn.classList.add('is-active');
      prevBtn.dataset.page = info.page - 1;
    } else {
      prevBtn.classList.remove('is-active');
      prevBtn.dataset.page = info.page - 0;
    }

    if (info.navigation) {
      navi.classList.add('is-active');
    } else {
      navi.classList.remove('is-active');
    }

    return info;
  }

  /**
   * LazySearch の検索設定が存在するか判定
   * @return {void}
   */
  static has() {
    return document.querySelector('[data-lz]').length >= 1;
  }
}
