export default class Params {
  /**
   * @constructor
   *
   * @param {Hash} params - 検索用パラメータ
   */
  constructor(params = {}) {
    if (typeof params !== 'object') {
      throw new Error('Invalid Argument is received');
    }

    this._allowedParams = [
      'uuid',
      'keyword',
      'format',
      'page',
      'per_page',
      'match_count',
      'match_length'
    ]

    for (let key of this._allowedParams) {
      this[key] = params.hasOwnProperty(key) ? params[key] : null;
    }
  }

  /**
   * リクエスト用クエリストリング
   *
   * @return {String}
   */
  queryString() {
    let params = {}
    for (let key of this._allowedParams) {
      if (this[key] !== null) {
        params[key] = this[key]
      }
    }
    return Object.keys(params)
      .map((k) => k + '=' + encodeURIComponent(params[k]))
      .join('&');
  }
}
