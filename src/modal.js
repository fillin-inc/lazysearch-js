export default class Modal {
    constructor(el) {
        this._el = el;
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
        const target  = this._el.querySelector('[data-lz-form]');
        const keyword = this._el.querySelector('[data-lz-query]');
        const cross   = this._el.querySelector('[data-lz-x]');
        const btn     = this._el.querySelector('[data-lz-btn]');

        keyword.style.width = (target.clientWidth - (cross.clientWidth + btn.clientWidth + 65)).toString() + 'px';
    }
}
