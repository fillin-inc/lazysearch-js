import 'whatwg-fetch';

/**
 * Search - 検索処理クラス
 */
export default class Search {
  /**
   * @constructor
   *
   * @param {Hash|null} params - 検索用パラメータ
   * @param {String|null} endpoint - Search API URL
   */
  constructor(params = null, endpoint = null) {
    this.endpoint = 'https://api.lazysear.ch/search';
    this.allowedParams = [
      'uuid',
      'keyword',
      'format',
      'page',
      'per_page',
      'match_count',
      'match_length',
    ];

    this._initParams();
    this._updateParams(params);
    if (endpoint !== null) {
      this.endpoint = endpoint;
    }
  }

  /**
   * fetch
   *
   * @param {Hash} params - 検索用パラメータ
   * @return {Promise} Response オブジェクトを含む Promise
   */
  fetch(params) {
    this._updateParams(params);
    return fetch(
      this.endpoint + '?' + this._reqQuery(),
      {mode: 'cors'}
    );
  }

  /**
   * リクエスト用クエリ文字列生成
   *
   * @return {String}
   */
  _reqQuery() {
    const reqParams = this.params;
    return Object.keys(reqParams)
      .map((k) => k + '=' + encodeURIComponent(reqParams[k]))
      .join('&');
  }

  /**
   * 検索用パラメータ初期化
   */
  _initParams() {
    this.params = {
      keyword: null,
      uuid: null,
    };
  }

  /**
   * 検索用パラメータ更新
   *
   * @param {Hash} params
   */
  _updateParams(params) {
    if (!params || Object.keys(params).length === 0) {
      return;
    }

    for (let key in params) {
      if (this.allowedParams.indexOf(key) >= 0) {
        this.params[key] = params[key];
      }
    }
  }

  /**
   * エンドポイント URL 更新
   *
   * @param {String} url
   */
  _updateEndpoint(url) {
    if (url !== null) {
      this.endpoint = url;
    }
  }

  /**
   * 現在の URL クエリ文字列取得
   *
   * @return {String} クエリ文字列
   */
  static getQuery() {
    const matched = location.search.match(/(\?|&)q=(.*?)(&|$)/);
    return (matched === null) ? '' : decodeURIComponent(matched[2]);
  }

  /**
   * URL クエリ文字列からページ数取得
   *
   * @return {Number} ページ数
   */
  static getPageInQuery() {
    const matched = location.search.match(/(\?|&)page=(\d+)(&|$)/);
    return (matched === null) ? 1 : parseInt(matched[2], 10);
  }
}
