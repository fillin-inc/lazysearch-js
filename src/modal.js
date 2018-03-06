export default class Modal {
    constructor(modalElem) {
        this.el = modalElem;
    }

    append() {
        const body = document.getElementsByTagName('body');
        if (body.length === 0) {
            console.log('lz.js could not find <body> tag.');
            return;
        }
        body[0].appendChild(this.el);
    }

    isVisible() {
        return !(this.el.offsetWidth === 0 && this.el.offsetHeight === 0);
    }

    open() {
        this.el.classList.add('is-active');
    }

    close() {
        if (this.el.classList.contains('is-active')) {
            this.el.classList.remove('is-active');
        }
    }

    static hasSearch() {
        return document.querySelector('[data-lz]').length >= 1;
    }
}
