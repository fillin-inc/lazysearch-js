import CustomEvent from 'custom-event';
import Modal from './modal';
import Style from './templates/stylesheet.css';
import Template from './template';

export default class LazySearch {
    constructor() {
        if (!LazySearch.hasSearch()) {
            return;
        }
        Style.use();

        this._template = new Template();
        this._modal    = new Modal(this._template.modal());
        this._modal.append();
        this._readySearch();
    }

    _readySearch(modal) {
        const self = this;
        const btns          = document.querySelectorAll('[data-lz-btn]');
        const queries       = document.querySelectorAll('[data-lz-query]');
        const btnLength     = btns.length;
        const queriesLength = queries.length;
        const mainQuery     = document.querySelector('[data-lz-modal] [data-lz-query]')

        const changeEvent = new CustomEvent('change');
        for (let i = 0; i < btnLength; i += 1) {
            btns[i].addEventListener('click', function (event) {
                event.preventDefault();
                const currentQuery = event.target.parentNode.querySelector('[data-lz-query]');

                // Reflect search query in all data-lz-query
                for (let j = 0; j < queriesLength; j += 1) {
                    if (queries[j] !== currentQuery) {
                        queries[j].value = currentQuery.value;
                        queries[j].dispatchEvent(changeEvent)
                    }
                }
            });
        }

        mainQuery.addEventListener('change', function (event) {
            // TODO: Search
            if (!self._modal.isVisible()) {
                self._modal.open();
            }
        });
    }

    static hasSearch() {
        return document.querySelector('[data-lz]').length >= 1;
    }
}
