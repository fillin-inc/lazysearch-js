import Modal from './modal';
import Painter from './painter';
import Search from './search';
import Style from './templates/stylesheet.css';
import Template from './template';

export default class LazySearch {
    constructor() {
        if (!LazySearch.has()) {
            return;
        }
        Style.use();

        this._search   = new Search();
        this._modal    = new Modal((new Template()).modal());
        this._modal.append();
        this._setTargetElements();
        this._setSearchEvent();
    }

    // 検索処理用のイベントを設定
    _setSearchEvent() {
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
                    .then(self._drawNavi);
                self._modal.setLzBodyHeight();
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
                params.page = parseInt(this.parentNode.dataset.page, 10);
                self._search
                    .fetch(params)
                    .then(self._drawResult)
                    .then(self._drawNavi);
                self._modal.setLzBodyHeight();
                if (!self._modal.isVisible()) {
                    self._modal.open();
                }
            });
        }

    }

    // 検索結果の描画
    _drawResult(res) {
        const wrapper = document.querySelector('[data-lz-modal] .lz-results');
        if (!res.ok) {
            return res.json().then((body) => {
                Painter.error(wrapper, body);
                return {
                    navigation:   false,
                    page:         parseInt(body.current_page, 10),
                    per_page:     parseInt(body.per_page, 10),
                    count:        parseInt(body.count, 10),
                    has_next:     body.has_next,
                    keyword:      body.keyword
                };
            });
        } else {
            return res.json().then((body) => {
                let showNavigation = true;
                if (body.count > 0) {
                    Painter.result(wrapper, body);
                } else {
                    showNavigation = false;
                    Painter.empty(wrapper);
                }

                document.querySelector('[data-lz-modal] .lz-body').scrollTop = 0;
                return {
                    navigation:   showNavigation,
                    page:         parseInt(body.current_page, 10),
                    per_page:     parseInt(body.per_page, 10),
                    count:        parseInt(body.count, 10),
                    has_next:     body.has_next,
                    keyword:      body.keyword
                };
            });
        }
    }

    // 検索結果ナビゲーションの表示
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

        return info;
    }

    // 処理対象となるパラメータ名を設定
    _setTargetElements(formElm) {
        this._targets = [ 'page', 'format', 'keyword', 'per_page', 'uuid', "match_count", "match_length" ];
    }

    // form からパラメータ収集
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
                params[this._targets[i]] = (this._targets[i].indexOf('page') !== -1) ? parseInt(elm.value, 10) : elm.value;
            }
            elm = null;
        }

        if (!params.page) {
            params.page = 1;
        }
        return params;
    }

    // LazySearch 検索が設定されているか判定
    static has() {
        return document.querySelector('[data-lz]').length >= 1;
    }
}
