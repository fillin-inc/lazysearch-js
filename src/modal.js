export default class Modal {
    constructor(el) {
        this._el = el;
    }

    el() {
        return this._el;
    }

    append() {
        const body = document.getElementsByTagName('body');
        if (body.length === 0) {
            console.log('lz.js could not find <body> tag.');
            return;
        }
        body[0].appendChild(this._el);
    }

    open() {
        this._el.classList.add('is-active');
        this._setKeywordWidth();
        this._setHasKeyword();
    }

    close() {
        if (this._el.classList.contains('is-active')) {
            this._el.classList.remove('is-active');
        }
    }

    isVisible() {
        return !(this._el.offsetWidth === 0 && this._el.offsetHeight === 0);
    }

    _setKeywordWidth() {
        const target     = this._el.getElementsByTagName('form')[0];
        const keyword    = this._el.getElementsByClassName('lz-keyword')[0];
        const btn        = this._el.getElementsByClassName('lz-button')[0];
        const crossWidth = 20;

        keyword.style.width = (target.clientWidth - (crossWidth + btn.clientWidth + 65)).toString() + 'px';
    }

    _setHasKeyword() {
        const searchForm    = this._el.getElementsByClassName('lz-search-form')[0];
        const searchKeyword = this._el.getElementsByClassName('lz-keyword')[0];
        if (searchKeyword.value !== '') {
            searchForm.classList.add('has-keyword');
        } else {
            searchForm.classList.remove('has-keyword');
        }
    }
}
