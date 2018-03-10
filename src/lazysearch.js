import CustomEvent from 'custom-event';
import Modal from './modal';
import Search from './search';
import Style from './templates/stylesheet.css';
import Template from './template';

export default class LazySearch {
    constructor() {
        if (!LazySearch.hasSearch()) {
            return;
        }
        Style.use();

        this._search   = new Search();
        this._modal    = new Modal((new Template()).modal());
        this._modal.append();
        this._setTargetElements();
        this._readySearch();
    }

    _readySearch(modal) {
        const self = this;
        const btns          = document.querySelectorAll('[data-lz-btn]');
        const queries       = document.querySelectorAll('[data-lz-keyword]');
        const btnLength     = btns.length;
        const queriesLength = queries.length;
        const mainQuery     = document.querySelector('[data-lz-modal] [data-lz-keyword]')
        const changeEvent = new CustomEvent('change');
        let i = 0;
        let j = 0;

        // 関連する検索窓の入力値を連携させる
        for (i = 0; i < queriesLength; i += 1) {
            queries[i].addEventListener('change', function (event) {
                for (j = 0; j < queriesLength; j += 1) {
                    if (queries[j] !== event.target) {
                        queries[j].value = event.target.value;
                    }
                }
            });
        }

        // 検索ボタン押下時に検索を実行し結果を閲覧可能にする
        for (i = 0; i < btnLength; i += 1) {
            btns[i].addEventListener('click', function (event) {
                event.preventDefault();
                let params = self._collectParams(document.querySelector('[data-lz]'));
                self._search
                    .fetch(params)
                    .then(self._drawResult)
                    .then(self._drawNavi)
                if (!self._modal.isVisible()) {
                    self._modal.open();
                }
            });
        }
    }

    _drawResult(res) {
        const wrapper = document.querySelector('[data-lz-modal] .lz-results');
        if (!res.ok) {
            wrapper.classList.add('has-error');

            const p = document.createElement('p');
            return res.json().then((body) => {
                let errors = [];
                body.errors.forEach(function (val, idx, ary) {
                    errors.push(val.message + '(' + val.error_id + ')');
                });
                p.classList.add('lz-result');
                p.innerHTML = errors.join("\n<br>\n");
                wrapper.innerHTML = '';
                wrapper.appendChild(p);

                return {
                    navigation:   false,
                    current_page: body.current_page,
                    per_page:     body.per_page,
                    count:        body.count,
                    has_next:     body.has_next
                };
            });
        } else {
            wrapper.classList.remove('has-error');

            let df = document.createDocumentFragment();
            return res.json().then((body) => {
                let showNavigation = true;
                if (body.count > 0) {
                    body.results.forEach(function (val, idx, ary) {
                        let row = (new Template()).result();
                        row.getElementsByTagName('a')[0].href = val.url;
                        row.getElementsByTagName('h3')[0].innerHTML = val.title;
                        row.getElementsByClassName('url')[0].innerHTML = val.url;
                        row.getElementsByClassName('desc')[0].innerHTML = val.match;
                        df.appendChild(row);
                    });
                    wrapper.innerHTML = '';
                    wrapper.appendChild(df);
                } else {
                    const p = document.createElement('p');
                    p.classList.add('lz-result');
                    p.innerHTML = '該当するページが見つかりませんでした。';
                    showNavigation = false;
                    wrapper.innerHTML = '';
                    wrapper.appendChild(p);
                }

                return {
                    navigation:   showNavigation,
                    current_page: body.current_page,
                    per_page:     body.per_page,
                    count:        body.count,
                    has_next:     body.has_next
                };
            });
        }
    }

    _drawNavi(info) {
        const navi = document.querySelector('[data-lz-modal] .lz-nav');
        if (info.count) {
            navi.getElementsByClassName('lz-total-num')[0].innerHTML = parseInt(info.count, 10);
        }

        if (info.current_page) {
            const totalPage = Math.ceil(parseInt(info.count, 10) / parseInt(info.per_page, 10));
            navi.getElementsByClassName('lz-current-page')[0].innerHTML = parseInt(info.current_page, 10);
            navi.getElementsByClassName('lz-total-page')[0].innerHTML = totalPage;
        }

        if (info.has_next) {
            navi.getElementsByClassName('lz-next')[0].classList.add('is-active');
        } else {
            navi.getElementsByClassName('lz-next')[0].classList.remove('is-active');
        }

        if (info.current_page > 1) {
            navi.getElementsByClassName('lz-prev')[0].classList.add('is-active');
        } else {
            navi.getElementsByClassName('lz-prev')[0].classList.remove('is-active');
        }

        if (info.navigation) {
            navi.classList.add('is-active');
        } else {
            navi.classList.remove('is-active');
        }
    }

    _setTargetElements(formElm) {
        this._targets = {
            current_page: 'data-lz-current-page',
            format:       'data-lz-format',
            keyword:      'data-lz-keyword',
            per_page:     'data-lz-per-page',
            uuid:         'data-lz-uuid'
        }
    }

    _collectParams(formElm) {
        let params = {};
        let elm = null;

        if (formElm === null || formElm === undefined) {
            return params;
        }

        window.formElm = formElm;
        for (let key in this._targets) {
            elm = formElm.querySelector('[' + this._targets[key] + ']');
            if (elm !== null) {
                params[key] = elm.value;
            }
            elm = null;
        }
        return params;
    }

    static hasSearch() {
        return document.querySelector('[data-lz]').length >= 1;
    }
}
