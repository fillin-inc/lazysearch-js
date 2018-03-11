import 'whatwg-fetch';

export default class Search {
    constructor(params = null, endpoint = null) {
        this.endpoint = 'https://api.lazysear.ch/search';
        this.params = {
            page:     1,
            format:   'json',
            keyword:  null,
            per_page: 10,
            uuid:     null
        };

        this._updateParams(params);
        if (endpoint !== null) {
            this.endpoint = endpoint;
        }
    }

    fetch(params) {
        this._updateParams(params)
        return fetch(
            this.endpoint + '?' + this._reqQuery(),
            { mode: 'cors' }
        );
    }

    _reqQuery() {
        const reqParams = this.params;
        return Object.keys(reqParams)
            .map(k => k + '=' + encodeURIComponent(reqParams[k]))
            .join('&');
    }

    _updateParams(params) {
        if (params && Object.keys(params).length > 0) {
            for (let key in this.params) {
                if (params[key]) {
                    this.params[key] = params[key];
                }
            }
        }
    }

    _updateEndpoint(url) {
        if (url !== null) {
            this.endpoint = url;
        }
    }

    static getQuery() {
        const matched = location.search.match(/(\?|&)q=(.*?)(&|$)/);
        return (matched === null) ? '' : decodeURIComponent(matched[2]);
    }

    static getPageInQuery() {
        const matched = location.search.match(/(\?|&)page=(\d+)(&|$)/);
        return (matched === null) ? 1 : parseInt(matched[2], 10);
    }
}
