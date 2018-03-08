export default class Search {
    constructor(params = null, endpoint = null) {
        this.endpoint = 'https://api.lazysear.ch/search';
        this.params = {
            current_page:1,
            format: 'json',
            per_page: 10,
            uuid: null
        };

        this._updateParams(params);
        if (endpoint !== null) {
            this.endpoint = endpoint;
        }
    }

    fetch(keyword, params = null) {
        this._updateParams(params)
        return fetch(
            this.endpoint + '?' + this._reqQuery(keyword),
            { mode: 'cors' }
        );
    }

    _reqQuery(keyword) {
        const reqParams = this.params;
        reqParams.keyword = keyword;
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
}
