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
  };

  const el = document.querySelector('.lz-nav');
  const form = new ModalNavigation(el);
  form.update(data);
  expect(el.className.indexOf('is-active') >= 0).toBeTruthy();
});
