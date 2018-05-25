import escapeHtml from 'escape-html';
import Template from './template';

/**
 * Painter - 検索結果描画
 */
export default class Painter {
  /**
   * 検索結果を描画
   *
   * @param {Element} targetElm - 検索結果を表示する DOM 要素
   * @param {Hash} resBody - 検索結果データ
   */
  static result(targetElm, resBody) {
    targetElm.classList.remove('has-error');

    let df = document.createDocumentFragment();
    resBody.results.forEach(function(val, idx, ary) {
      let row = Template.result();
      row.getElementsByTagName('a')[0].href = val.url;
      row.getElementsByTagName('h3')[0].innerHTML = escapeHtml(val.title);
      row.getElementsByClassName('url')[0].innerHTML = escapeHtml(val.url);
      row.getElementsByClassName('desc')[0].innerHTML = val.match;
      df.appendChild(row);
    });
    targetElm.innerHTML = '';
    targetElm.appendChild(df);
  }

  /**
   * 検索結果がない場合の処理
   *
   * @param {Element} targetElm - 検索結果を表示する DOM 要素
   */
  static empty(targetElm) {
    targetElm.classList.remove('has-error');

    const p = document.createElement('p');
    p.classList.add('la-result');
    p.innerHTML = escapeHtml('該当するページが見つかりませんでした。');
    targetElm.innerHTML = '';
    targetElm.appendChild(p);
  }

  /**
   * 検索キーワード未入力時の処理
   *
   * @param {Element} targetElm - 検索結果を表示する DOM 要素
   */
  static noKeyword(targetElm) {
    targetElm.classList.remove('has-error');

    const p = document.createElement('p');
    p.classList.add('la-result');
    p.innerHTML = escapeHtml('サイト内検索にはキーワードの指定が必要です。');
    targetElm.innerHTML = '';
    targetElm.appendChild(p);
  }

  /**
   * エラー表示
   *
   * @param {Element} targetElm - 検索結果を表示する DOM 要素
   * @param {Hash} resBody - エラーデータ
   */
  static error(targetElm, resBody) {
    targetElm.classList.add('has-error');

    let errors = [];
    resBody.errors.forEach(function(val, idx, ary) {
      errors.push(escapeHtml(val.message + '(' + val.error_id + ')'));
    });

    const p = document.createElement('p');
    p.classList.add('lz-result');
    p.innerHTML = errors.join('<br>');
    targetElm.innerHTML = '';
    targetElm.appendChild(p);
  }
}
