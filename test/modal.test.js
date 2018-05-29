import Modal from '../src/modal';
import Template from '../src/template';

test('initialize Modal', () => {
  const el = Template.modal();
  const body = document.getElementsByTagName('body')[0];
  expect(document.querySelector('[data-lz-modal]')).toBeNull();

  const modal = new Modal(el);
  expect(modal.el).toEqual(el);
  expect(modal.body).toEqual(body);
  expect(modal.form.constructor.name).toBe('ModalForm');
  expect(modal.results.constructor.name).toBe('ModalResults');
  expect(document.querySelector('[data-lz-modal]')).not.toBeNull();
});

test('isVisible() return true when Modal is visible', () => {
  const el = Template.modal();
  const modal = new Modal(el);

  el.classList.add('is-active');
  expect((new Modal(el)).isVisible()).toBe(true);
});

test('isVisible() return false when Modal is invisible', () => {
  const el = Template.modal();
  expect((new Modal(el)).isVisible()).toBe(false);
});

test('open() display modal', () => {
  const el = Template.modal();
  const body = document.getElementsByTagName('body')[0];
  const modal = new Modal(el);

  expect(el.className.indexOf('is-active') >= 0).toBe(false);
  expect(body.className.indexOf('lz-overflow-hidden') >= 0).toBe(false);
  expect(modal.open());
  expect(el.className.indexOf('is-active') >= 0).toBe(true);
  expect(body.className.indexOf('lz-overflow-hidden') >= 0).toBe(true);
});

test('close() hide modal', () => {
  const el = Template.modal();
  const body = document.getElementsByTagName('body')[0];
  const modal = new Modal(el);

  modal.el.classList.add('is-active');
  expect(modal.el.className.indexOf('is-active') >= 0).toBe(true);
  expect(body.className.indexOf('lz-overflow-hidden') >= 0).toBe(true);
  modal.close();
  setTimeout(() => {
    expect(modal.el.className.indexOf('is-active') >= 0).toBe(false);
    expect(body.className.indexOf('lz-overflow-hidden') >= 0).toBe(false);
  }, 200);
});
