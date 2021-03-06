import escapeHtml from 'escape-html';
import ModalNavigation from './modal/navigation';
import SearchParams from './search/params';
import Template from './template';
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

    if (!params.hasKeyword()) {
      const results = document.getElementsByClassName('lz-results')[0];
      const p = document.createElement('p');
      p.classList.add('lz-result');
      p.innerHTML = 'サイト内検索にはキーワードの指定が必要です。';
      results.classList.add('has-error');
      results.innerHTML = '';
      results.appendChild(p);
      document.querySelector('.lz-nav').classList.remove('is-active');
      return;
    }

    fetch(this.endpoint + '?' + params.queryString(), {mode: 'cors'})
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((body) => Promise.reject(body));
        }
      })
      .then(this.resolve)
      .catch(this.reject)
      .then(this.navigation);
  }

  /**
   * 「もっと見る」実行と結果反映
   *
   * @param {Element} currentBtn - 押下された検索ボタン DOM
   * @param {Element} baseForm - 元画面のフォーム DOM
   */
  executeReadMore(currentBtn, baseForm) {
    const keywordInputInModal = document.querySelector('[data-lz-modal] [name=keyword]');
    const params = (new SearchParams()).collect(baseForm);

    // 前回検索時点のキーワードを設定
    params.keyword = currentBtn.parentNode.dataset.keyword;
    params.page = currentBtn.parentNode.dataset.page;

    // 入力欄のキーワードが異なる場合, 元データに変更
    if (params.keyword !== keywordInputInModal.value.trim()) {
      keywordInputInModal.value = params.keyword;
    }

    if (!params.hasKeyword()) {
      const results = document.getElementsByClassName('lz-results')[0];
      const p = document.createElement('p');
      p.classList.add('lz-result');
      p.innerHTML = 'サイト内検索にはキーワードの指定が必要です。';
      results.classList.add('has-error');
      results.innerHTML = '';
      results.appendChild(p);
      document.querySelector('.lz-nav').classList.remove('is-active');
      return;
    }

    fetch(this.endpoint + '?' + params.queryString(), {mode: 'cors'})
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((body) => Promise.reject(body));
        }
      })
      .then(this.resolveReadMore)
      .catch(this.reject)
      .then(this.navigation);
  }

  /**
   * 検索結果表示
   *
   * 該当するデータが存在しない場合, ページがない旨表示
   *
   * @param {Object} body - レスポンス body
   * @return {Object} - レスポンス body
   */
  resolve(body) {
    const results = document.getElementsByClassName('lz-results')[0];
    let df = document.createDocumentFragment();

    if (body.count === 0) {
      const p = document.createElement('p');
      p.classList.add('lz-result');
      p.innerHTML = 'キーワードに該当するページが見つかりませんでした。';
      df.appendChild(p);
    } else {
      body.results.forEach((val) => {
        let row = Template.result();
        row.getElementsByTagName('a')[0].href = val.url;
        row.getElementsByTagName('h3')[0].innerHTML = escapeHtml(val.title);
        row.getElementsByClassName('url')[0].innerHTML = escapeHtml(val.url);
        row.getElementsByClassName('desc')[0].innerHTML = val.match;
        df.appendChild(row);
      });
    }

    results.classList.remove('has-error');
    results.innerHTML = '';
    document.querySelector('.lz-body').scrollTop = 0;
    results.appendChild(df);

    return body;
  }

  /**
   * 「もっと見る」検索結果表示
   *
   * 該当するデータが存在しない場合, ページがない旨表示
   *
   * @param {Object} body - レスポンス body
   * @return {Object} - レスポンス body
   */
  resolveReadMore(body) {
    const results = document.getElementsByClassName('lz-results')[0];
    let df = document.createDocumentFragment();

    if (body.count === 0) {
      const p = document.createElement('p');
      p.classList.add('lz-result');
      p.innerHTML = 'キーワードに該当するページが見つかりませんでした。';
      df.appendChild(p);
    } else {
      body.results.forEach((val, idx) => {
        let row = Template.result();
        if (idx === 0) {
          row.classList.add('lz-read-more-first');
        }

        row.getElementsByTagName('a')[0].href = val.url;
        row.getElementsByTagName('h3')[0].innerHTML = escapeHtml(val.title);
        row.getElementsByClassName('url')[0].innerHTML = escapeHtml(val.url);
        row.getElementsByClassName('desc')[0].innerHTML = val.match;
        df.appendChild(row);
      });
    }

    results.classList.remove('has-error');
    results.appendChild(df);

    return body;
  }

  /**
   * エラー表示
   *
   * @param {Object} body - レスポンス body
   * @return {Object} - レスポンス body
   */
  reject(body) {
    const results = document.getElementsByClassName('lz-results')[0];
    let df = document.createDocumentFragment();

    body.errors.forEach((val) => {
      let msg = val.message;
      if (val.error_id) {
        msg += ' (' + val.error_id + ')';
      }

      let p = document.createElement('p');
      p.classList.add('lz-result');
      p.innerHTML = escapeHtml(msg);
      df.appendChild(p);
    });

    results.classList.add('has-error');
    results.innerHTML = '';
    document.querySelector('.lz-body').scrollTop = 0;
    results.appendChild(df);

    return body;
  }

  /**
   * ナビゲーション表示
   *
   * @param {Object} body - レスポンス body
   * @return {Object} - レスポンス body
   */
  navigation(body) {
    const modalNavi = new ModalNavigation(document.querySelector('.lz-nav'));
    modalNavi.update(body);
    return body;
  }
}
