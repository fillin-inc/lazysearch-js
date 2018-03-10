import Modal from './modal';
import Promise from 'promise-polyfill';
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

    _readySearch() {
        const self           = this;
        const btns           = document.querySelectorAll('[data-lz] .lz-button, [data-lz] [type=submit], [data-lz-modal] .lz-header .lz-button');
        const queries        = document.querySelectorAll('[data-lz] [name=keyword], [data-lz-modal] [name=keyword]');
        const btnLength      = btns.length;
        const queriesLength  = queries.length;
        const mainQuery      = document.querySelector('[data-lz-modal] [name=keyword]');
        const naviBtns       = this._modal.el().querySelectorAll('.lz-button a');
        const naviBtnsLength = naviBtns.length;
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

        // 次へ, 前へボタン押下時に検索を実行
        for (i = 0; i < naviBtnsLength; i += 1) {
            naviBtns[i].addEventListener('click', function (event) {
                event.preventDefault();
                let params = self._collectParams(document.querySelector('[data-lz]'));
                params.page = this.parentNode.dataset.page;
                self._search
                    .fetch(params)
                    .then(self._drawResult)
                    .then(self._drawNavi)
                if (!self._modal.isVisible()) {
                    self._modal.open();
                }
            });
        }

        // x ボタンで検索キーワードを削除
        this._modal.el().querySelector('.lz-header .lz-x').addEventListener('click', function (event) {
            event.preventDefault();
            this.previousElementSibling.value = '';
        });

        // cancel でモーダルを閉じる
        this._modal.el().getElementsByClassName('lz-cancel')[0].addEventListener('click', function (event) {
            event.preventDefault();
            document.querySelector('[data-lz-modal]').classList.remove('is-active');
        });

        // 背景色クリックでモーダルを閉じる
        document.getElementsByClassName('lz-background')[0].addEventListener('click', function (event) {
            event.preventDefault();
            document.querySelector('[data-lz-modal]').classList.remove('is-active');
        });
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
                    page:         parseInt(body.current_page, 10),
                    per_page:     parseInt(body.per_page, 10),
                    count:        parseInt(body.count, 10),
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

                document.querySelector('[data-lz-modal] .lz-body').scrollTop = 0;
                return {
                    navigation:   showNavigation,
                    page:         parseInt(body.current_page, 10),
                    per_page:     parseInt(body.per_page, 10),
                    count:        parseInt(body.count, 10),
                    has_next:     body.has_next
                };
            });
        }
    }

    _drawNavi(info) {
        const navi = document.querySelector('[data-lz-modal] .lz-nav');
        const nextBtn = navi.getElementsByClassName('lz-next')[0];
        const prevBtn = navi.getElementsByClassName('lz-prev')[0];

        if (info.count) {
            navi.getElementsByClassName('lz-total-num')[0].innerHTML = info.count;
        }

        if (info.page) {
            const totalPage = Math.ceil(info.count / info.per_page);
            navi.getElementsByClassName('lz-current-page')[0].innerHTML = info.page;
            navi.getElementsByClassName('lz-total-page')[0].innerHTML = totalPage;
        }

        if (info.has_next) {
            nextBtn.classList.add('is-active');
            nextBtn.dataset.page = info.page + 1;
        } else {
            nextBtn.classList.remove('is-active');
            nextBtn.dataset.page = 1;
        }

        if (info.page > 1) {
            prevBtn.classList.add('is-active');
            prevBtn.dataset.page = info.page - 1;
        } else {
            prevBtn.classList.remove('is-active');
            prevBtn.dataset.page = info.page - 0;
        }

        if (info.navigation) {
            navi.classList.add('is-active');
        } else {
            navi.classList.remove('is-active');
        }
    }

    _setTargetElements(formElm) {
        this._targets = [ 'page', 'format', 'keyword', 'per_page', 'uuid']
    }

    _collectParams(formElm) {
        const targetLength = this._targets.length;
        let params = {};
        let elm = null;

        if (formElm === null || formElm === undefined) {
            return params;
        }

        for (let i = 0; i < targetLength; i += 1) {
            elm = formElm.querySelector('[name=' + this._targets[i] + ']');
            if (elm !== null) {
                params[this._targets[i]] = (this._targets[i].includes('page')) ? parseInt(elm.value, 10) : elm.value;
            }
            elm = null;
        }
        return params;
    }

    static hasSearch() {
        return document.querySelector('[data-lz]').length >= 1;
    }
}
