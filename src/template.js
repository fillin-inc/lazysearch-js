import modal from './templates/modal.html';
import result from './templates/result.html';

export default class Template {
    constructor() {
        this.getModal();
        this.getResultRow();
    }

    getModal() {
        if (this.modal) {
            return this.modal;
        }
        const el = document.createElement('div');
        el.innerHTML = modal;
        this.modal = el.querySelector('[data-lz-modal]');
        return this.modal;
    }

    getResultRow() {
        if (this.resultRow) {
            return this.resultRow;
        }
        const el = document.createElement('div');
        el.innerHTML = result;
        this.resultRow = el.querySelector('.lz-result');
        return this.resultRow;
    }
}
