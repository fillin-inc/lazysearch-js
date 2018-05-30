import ModalForm from '../../src/modal/form';
import Modal from '../../src/modal';
import Template from '../../src/template';

test('initialize ModalForm', () => {
  const el = Template.modal();
  const modal = new Modal(el);
  const form = new ModalForm(el, modal);

  expect(form.constructor.name).toBe('ModalForm');
  expect(form.el).toEqual(el);
  expect(form.modal).toEqual(modal);
  expect(form.searchForm).toEqual(el.querySelector('.lz-search-form'));
  expect(form.keyword).toEqual(modal.el.querySelector('.lz-keyword'));
  expect(form.x).toEqual(modal.el.querySelector('.lz-x'));
  expect(form.close).toEqual(modal.el.querySelector('.lz-close'));
});

test('hasKeyword() return true when this.keyword is empty', () => {
  const el = Template.modal();
  const form = new ModalForm(el, (new Modal(el)));
  form.keyword.value = 'something';

  expect(form.hasKeyword()).toBe(true);
});

test('hasKeyword() return false when this.keyword is empty', () => {
  const el = Template.modal();
  const form = new ModalForm(el, (new Modal(el)));
  form.keyword.value = '';

  expect(form.hasKeyword()).toBe(false);
});

test('removeKeyword() to be empty this.keyword', () => {
  const el = Template.modal();
  const form = new ModalForm(el, (new Modal(el)));
  form.keyword.value = 'something';
  form.removeKeyword();

  expect(form.keyword.value).toBe('');
});

test('toggleHasKeyword() add class="has-keyword" when this.keyword is not empty', () => {
  const el = Template.modal();
  const form = new ModalForm(el, (new Modal(el)));
  form.keyword.value = 'something';

  form.toggleHasKeyword();
  expect(form.searchForm.className.indexOf('has-keyword') >= 0).toBe(true)
});

test('toggleHasKeyword() remove class="has-keyword" when this.keyword is empty', () => {
  const el = Template.modal();
  const form = new ModalForm(el, (new Modal(el)));
  form.keyword.value = '';

  form.toggleHasKeyword();
  expect(form.searchForm.className.indexOf('has-keyword') >= 0).toBe(false)
});
