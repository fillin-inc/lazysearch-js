import Modal from './modal';
import Search from './search';
import Style from './templates/stylesheet.css';
import Template from './template';

const template = new Template();
const modal    = new Modal(template.getModal());

window.onload = function () {
    if (!Modal.hasSearch()) {
        return;
    }

    Style.use();
    modal.append();

    const search = new Search({ uuid: document.querySelector('[data-lz] [name=uuid]').value });
    search.fetch('api');

    const mainQuery           = document.querySelector('[data-lz-query-in-modal]');
    const searchBtns          = document.querySelectorAll('[data-lz-btn]');
    const searchBtnsLength    = searchBtns.length;
    const searchQueries       = document.querySelectorAll('[data-lz-query]');
    const searchQueriesLength = searchQueries.length;

    // Add Search Button Event
    for (let i = 0; i < searchBtnsLength; i += 1) {
        searchBtns[i].addEventListener('click', function (event) {
            event.preventDefault();
            const query = event.target.parentNode && event.target.parentNode.querySelector('[data-lz-query]');

            // Reflect search values in all data-lz-query
            for (let j = 0; j < searchQueriesLength; j += 1) {
                if (searchQueries[j] !== query) {
                    searchQueries[j].value = query.value;
                }
            }

            if (!modal.isVisible()) {
                modal.open();
            }
        });
    }
};
