import ModalNavigation from '../../src/modal/navigation';
import Template from '../../src/template';

beforeEach(() => {
  const html = `<nav class="lz-nav is-active">
                  <div class="lz-prev lz-button" data-page="1">
                      <a href="#">&lt;&lt;&nbsp;前へ</a>
                  </div>
                  <div class="lz-page-status">
                      <div>
                          <span class="lz-current-page">1</span> / <span class="lz-total-page">2</span>
                      </div>
                      <div>
                          <span class="lz-total-num">8</span><span class="lz-num-suffix">件</span>
                      </div>
                  </div>
                  <div class="lz-next lz-button is-active" data-page="2">
                      <a href="#">次へ&nbsp;&gt;&gt;</a>
                  </div>
                </nav>`;
  document.body.innerHTML = html;
});

test('initialize', () => {
  const el = document.querySelector('.lz-nav');
  const form = new ModalNavigation(el);

  expect(form.el).toEqual(el);
  expect(form.nextBtn).not.toBeNull;
  expect(form.prevBtn).not.toBeNull;
  expect(form.totalNum).not.toBeNull;
  expect(form.page).not.toBeNull;
  expect(form.totalPage).not.toBeNull;
});

test('update() show navigation', () => {
  const data = {
    count: 23,
    current_page: 2,
    per_page: 5,
    has_next: true,
  };

  const el = document.querySelector('.lz-nav');
  const form = new ModalNavigation(el);
  form.update(data);

  expect(form.totalNum.innerHTML).toEqual(data.count.toString());
  expect(form.page.innerHTML).toEqual(data.current_page.toString());
  expect(form.totalPage.innerHTML).toEqual('5');
  expect(form.nextBtn.className.indexOf('is-active') >= 0).toBeTruthy();
  expect(form.nextBtn.dataset.page).toEqual('3');
  expect(form.prevBtn.className.indexOf('is-active') >= 0).toBeTruthy();
  expect(form.prevBtn.dataset.page).toEqual('1');
  expect(form.el.className.indexOf('is-active') >= 0).toBeTruthy();
});
