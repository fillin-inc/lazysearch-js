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
   * @param {Params} params - パラメータオブジェクト
   * @return {Promise} Response オブジェクトを含む Promise
   */
  fetch(params) {
    return fetch(
      this.endpoint + '?' + (new Params()).collect().queryString(),
      {mode: 'cors'}
    );
  }
}
