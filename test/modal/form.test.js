import ModalForm from '../../src/modal/form';
import Modal from '../../src/modal';
import Template from '../../src/template';

test('initialize ModalForm', () => {
  const el = Template.modal();
  const modal = new Modal(el);
  const form = new ModalForm(el, modal);

  expect(form.el).toEqual(el);
  expect(form.searchForm).toEqual(el.querySelector('.lz-search-form'));
  expect(form.keyword).toEqual(modal.el.querySelector('.lz-keyword'));
  expect(form.x).toEqual(modal.el.querySelector('.lz-x'));
});

test('hasKeyword() return true when this.keyword is empty', () => {
  const el = Template.modal();
  const form = new ModalForm(el);
  form.keyword.value = 'something';

  expect(form.hasKeyword()).toBeTruthy();
});

test('hasKeyword() return false when this.keyword is empty', () => {
  const el = Template.modal();
  const form = new ModalForm(el);
  form.keyword.value = '';

  expect(form.hasKeyword()).toBeFalsy();
});

test('removeKeyword() to be empty this.keyword', () => {
  const el = Template.modal();
  const form = new ModalForm(el);
  form.keyword.value = 'something';
  form.removeKeyword();

  expect(form.keyword.value).toBe('');
});

test('toggleHasKeyword() add class="has-keyword" when this.keyword is not empty', () => {
  const el = Template.modal();
  const form = new ModalForm(el);
  form.keyword.value = 'something';

  form.toggleHasKeyword();
  expect(form.searchForm.className.indexOf('has-keyword') >= 0).toBeTruthy();
});

test('toggleHasKeyword() remove class="has-keyword" when this.keyword is empty', () => {
  const el = Template.modal();
  const form = new ModalForm(el);
  form.keyword.value = '';

  form.toggleHasKeyword();
  expect(form.searchForm.className.indexOf('has-keyword') >= 0).toBeFalsy();
});
