import ModalNavigation from '../../src/modal/navigation';

beforeEach(() => {
  const html = `<nav class="lz-nav is-active">
                  <a id="lz-more-read" class="lz-more-read" href="#">
                    <span class="more" data-loading="Loading..." data-normal="もっと見る">もっと見る</span>
                  </a>
               </nav>`;
  document.body.innerHTML = html;
});

test('initialize', () => {
  const el = document.querySelector('.lz-nav');
  const form = new ModalNavigation(el);
  expect(form.el).toEqual(el);
});

test('update() show navigation', () => {
  const data = {
    has_next: true,
    current_page: 1,
    keyword: 'something',
  };

  const el = document.querySelector('.lz-nav');
  const form = new ModalNavigation(el);
  form.update(data);
  expect(el.className.indexOf('is-active') >= 0).toBeTruthy();
  expect(el.dataset.page).toEqual((data.current_page + 1).toString());
  expect(el.dataset.keyword).toEqual(data.keyword);
});

test('update() hide navigation', () => {
  const data = {
    has_next: false,
    current_page: 2,
    keyword: 'something',
  };

  const el = document.querySelector('.lz-nav');
  const form = new ModalNavigation(el);
  form.update(data);
  expect(el.className.indexOf('is-active') >= 0).toBeFalsy();
  expect(el.dataset.page).toEqual('1');
  expect(el.dataset.keyword).toEqual('');
});
