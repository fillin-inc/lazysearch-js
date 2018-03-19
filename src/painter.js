import escapeHtml from 'escape-html';
import Template from './template';

export default class Painter {
    static result(targetElm, resBody) {
        targetElm.classList.remove('has-error');

        let df = document.createDocumentFragment();
        resBody.results.forEach(function (val, idx, ary) {
            let row = (new Template()).result();
            row.getElementsByTagName('a')[0].href = val.url;
            row.getElementsByTagName('h3')[0].innerHTML = escapeHtml(val.title);
            row.getElementsByClassName('url')[0].innerHTML = escapeHtml(val.url);
            row.getElementsByClassName('desc')[0].innerHTML = val.match;
            df.appendChild(row);
        });
        targetElm.innerHTML = '';
        targetElm.appendChild(df);
    }

    static empty(targetElm) {
        targetElm.classList.remove('has-error');

        const p = document.createElement('p');
        p.classList.add('la-result');
        p.innerHTML = escapeHtml('該当するページが見つかりませんでした。');
        targetElm.innerHTML = '';
        targetElm.appendChild(p);
    }

    static error(targetElm, resBody) {
        targetElm.classList.add('has-error');

        let errors = [];
        resBody.errors.forEach(function (val, idx, ary) {
            errors.push(escapeHtml(val.message + '(' + val.error_id + ')'));
        });

        const p = document.createElement('p');
        p.classList.add('lz-result');
        p.innerHTML = errors.join("\n<br>\n");
        targetElm.innerHTML = '';
        targetElm.appendChild(p);
    }
}
