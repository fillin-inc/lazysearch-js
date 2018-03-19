import Throttle from 'throttleit';

export default class Modal {
    constructor(el) {
        this._el = el;
    }

    el() {
        return this._el;
    }

    // モーダルを閉じ body タグ直前に展開
    append() {
        const body = document.getElementsByTagName('body');
        if (body.length === 0) {
            console.log('lz.js could not find <body> tag.');
            return;
        }
        body[0].appendChild(this._el);
        this._setEvent();
    }

    // モーダルを開く
    open() {
        this._el.classList.add('is-active');
        this.setKeywordWidth();
        this.setHasKeyword();
        this.setLzBodyHeight();
        document.getElementsByTagName('body')[0].classList.add('lz-overflow-hidden');
    }

    // モーダルを閉じる
    close() {
        if (!this.isVisible()) {
            return;
        }

        this._el.classList.add('is-fadeout');
        this._el.classList.remove('is-active');
        setTimeout(function () {
            document.querySelector('[data-lz-modal]').classList.remove('is-fadeout');
        }, 200);
        document.getElementsByTagName('body')[0].classList.remove('lz-overflow-hidden');
    }

    // モーダルが表示されているかチェック
    isVisible() {
        return !(this._el.offsetWidth === 0 && this._el.offsetHeight === 0);
    }

    // キーワードに focus
    focusOnKeyword() {
        this._el.getElementsByClassName('lz-keyword')[0].focus();
    }

    // キーワード入力欄の表示調整
    setKeywordWidth() {
        const keyword = this._el.getElementsByClassName('lz-keyword')[0];

        // 全体
        const searchForm = this._el.getElementsByClassName('lz-search-form')[0];
        // x ボタンサイズ
        const crossWidth = 24;
        // 検索ボタンサイズ
        const btnWidth   = 44;
        // margin-right + border 1px * 2
        const margin     = 7;

        keyword.style.width = (searchForm.clientWidth - (crossWidth + btnWidth + margin)).toString() + 'px';
    }

    // キーワード有無によるクラス付与処理
    setHasKeyword() {
        const searchForm    = this._el.getElementsByClassName('lz-search-form')[0];
        const searchKeyword = this._el.getElementsByClassName('lz-keyword')[0];
        if (searchKeyword.value !== '') {
            searchForm.classList.add('has-keyword');
        } else {
            searchForm.classList.remove('has-keyword');
        }
    }

    // lz-body の高さ調整
    setLzBodyHeight() {
        const inner = this._el.getElementsByClassName('lz-inner')[0];
        const body  = this._el.getElementsByClassName('lz-body')[0];
        body.style.height = (inner.clientHeight - 85) + 'px';
    }

    // イベントを設定
    _setEvent() {
        const self = this;

        // x ボタンで検索キーワードを削除
        this._el.querySelector('.lz-header .lz-x').addEventListener('click', function (event) {
            event.preventDefault();
            this.previousElementSibling.value = '';
            this.parentNode.classList.remove('has-keyword');
        });

        // キーアップ時に入力内容が空であれば has-keyword クラスを削除
        this._el.querySelector('.lz-header .lz-keyword').addEventListener('keyup', Throttle(function (event) {
            self.setHasKeyword();
        }, 250));

        // cancel でモーダルを閉じる
        this._el.getElementsByClassName('lz-close')[0].addEventListener('click', function (event) {
            event.preventDefault();
            self.close();
        });

        window.onresize = Throttle(function () {
            self.setKeywordWidth();
            self.setLzBodyHeight();
        }, 250);
    }
}
