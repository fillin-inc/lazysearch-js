/**
 * パラメータクラス
 *
 * Searcu API へのリクエスト情報の管理収集を担当
 */
export default class Params {
  /**
   * @constructor
   *
   * @param {Hash} params - 検索用パラメータ
   */
  constructor(params = {}) {
    if (params.constructor.name !== 'Object') {
      throw new Error('Invalid Argument is received');
    }

    this._allowedParams = [
      'uuid',
      'keyword',
      'format',
      'page',
      'per_page',
      'match_count',
      'match_length',
    ];

    for (let key of this._allowedParams) {
      this[key] = params.hasOwnProperty(key) ? params[key] : null;
    }
  }

  /**
   * 対象の form からパラメータ収集
   *
   * page パラメータが未定義の場合は常に 1
   *
   * @param {Element} formElm - 処理対象フォームエレメント
   * @return {Params}
   */
  collect(formElm) {
    let keyElm = null;
    for (let key of this._allowedParams) {
      keyElm = formElm.querySelector('[name=' + key + ']');
      if (keyElm !== null) {
        this[key] = (this._isInt(key)) ? parseInt(keyElm.value, 10) : keyElm.value;
      }
    }
    this.page = (this.page) ? this.page : 1;

    return this;
  }

  /**
   * リクエスト用クエリストリング
   *
   * @return {String}
   */
  queryString() {
    let params = {};
    for (let key of this._allowedParams) {
      if (this[key] !== null) {
        params[key] = this[key];
      }
    }
    return Object.keys(params)
      .map((k) => k + '=' + encodeURIComponent(params[k]))
      .join('&');
  }


  /**
   * keyword が存在するか否か
   *
   * @return {Boolean}
   */
  hasKeyword() {
    return (this.keyword !== null && String(this.keyword).trim() !== '');
  }

  /**
   * 対象のパラメータキーが数値か否か
   *
   * @param {String} key - パラメータのキー名
   * @return {Boolean}
   */
  _isInt(key) {
    return (key.indexOf('page') !== -1 || key.indexOf('length') !== -1 || key.indexOf('count') !== -1);
  }
}
