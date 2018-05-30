import SearchParams from './search/params';
import ModalNavigation from './modal/navigation';
import Painter from './painter';
import 'whatwg-fetch';

/**
 * Search - 検索処理クラス
 */
export default class Search {
  /**
   * @constructor
   *
   * @param {String|null} endpoint - Search API URL
   */
  constructor(endpoint = null) {
    this.endpoint = (endpoint !== null) ? endpoint : 'https://api.lazysear.ch/search';
  }

  /**
   * fetch
   *
   * @param {SearchParams} params - パラメータオブジェクト
   * @return {Promise} Response オブジェクトを含む Promise
   */
  fetch(params) {
    return fetch(
      this.endpoint + '?' + params.queryString(),
      {mode: 'cors'}
    );
  }

  /**
   * キーワード欄の変更を他のキーワード欄に反映
   *
   * @param {Element} currentKeyword - 変更を加えたキーワード欄 DOM
   * @param {Element[]} keywords - 対象のキーワード欄 DOM 配列
   */
  reflectKeywordValue(currentKeyword, keywords) {
    keywords.forEach((keyword) => {
      if (keyword !== currentKeyword) {
        keyword.value = currentKeyword.value;
      }
    });
  }

  /**
   * 検索実行と結果反映
   *
   * @param {Element} currentBtn - 押下された検索ボタン DOM
   * @param {Element} baseForm - 元画面のフォーム DOM
   */
  execute(currentBtn, baseForm) {
    const params = (new SearchParams()).collect(baseForm);

    // 次へ, 前への場合 data-page の値を利用
    if (currentBtn.parentNode && currentBtn.parentNode.className.indexOf('lz-button') >= 0) {
      params.page = parseInt(target.parentNode.dataset.page, 10);
    }

    if (!params.hasKeyword()) {
      Painter.noKeyword(document.querySelector('[data-lz-modal] .lz-results'));
      modalNavi.classList.remove('is-active');
      return;
    }

    fetch(this.endpoint + '?' + params.queryString(), {mode: 'cors'})
      .then(this._drawResult)
      .then(ModalNavigation.update);
  }

  /**
   * 検索結果を描画
   *
   * @param {Response} res - Fetch API のレスポンス
   * @return {Hash} ナビゲーション描画用ハッシュデータ
   */
  _drawResult(res) {
    console.log('draw');
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
}
