import 'whatwg-fetch'

export default class Search {
  constructor (params = null, endpoint = null) {
    this.endpoint = 'https://api.lazysear.ch/search'
    this.allowedParams = [
      'uuid',
      'keyword',
      'format',
      'page',
      'per_page',
      'match_count',
      'match_length'
    ]

    this._initParams()
    this._updateParams(params)
    if (endpoint !== null) {
      this.endpoint = endpoint
    }
  }

  fetch (params) {
    this._updateParams(params)
    return window.fetch(
      this.endpoint + '?' + this._reqQuery(),
      { mode: 'cors' }
    )
  }

  _reqQuery () {
    const reqParams = this.params
    return Object.keys(reqParams)
      .map(k => k + '=' + encodeURIComponent(reqParams[k]))
      .join('&')
  }

  _initParams () {
    this.params = {
      keyword: null,
      uuid: null
    }
  }

  _updateParams (params) {
    if (!params || Object.keys(params).length === 0) {
      return
    }

    for (let key in params) {
      if (this.allowedParams.indexOf(key) >= 0) {
        this.params[key] = params[key]
      }
    }
  }

  _updateEndpoint (url) {
    if (url !== null) {
      this.endpoint = url
    }
  }

  static getQuery () {
    const matched = window.location.search.match(/(\?|&)q=(.*?)(&|$)/)
    return (matched === null) ? '' : decodeURIComponent(matched[2])
  }

  static getPageInQuery () {
    const matched = window.location.search.match(/(\?|&)page=(\d+)(&|$)/)
    return (matched === null) ? 1 : parseInt(matched[2], 10)
  }
}
