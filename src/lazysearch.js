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
        this._template = new Template();
        this._modal    = new Modal(this._template.modal());
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
                self._search.fetch(params).then(self._drawResult);
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
            res.json().then((body) => {
                let errors = [];
                body.errors.forEach(function (val, idx, ary) {
                    errors.push(val.message + '(' + val.error_id + ')');
                });
                p.innerHTML = errors.join("\n<br>\n");
                wrapper.appendChild(p);
            });
            return;
        }

        wrapper.classList.remove('has-error');
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
