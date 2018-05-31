import Modal from '../src/modal';
import Template from '../src/template';

test('initialize Modal', () => {
  const el = Template.modal();
  const body = document.getElementsByTagName('body')[0];
  expect(document.querySelector('[data-lz-modal]')).toBeNull();

  const modal = new Modal(el);
  expect(modal.el).toEqual(el);
  expect(modal.body).toEqual(body);
  expect(modal.form.constructor.name).toEqual('ModalForm');
});

test('isVisible() return true when Modal is visible', () => {
  const el = Template.modal();
  el.classList.add('is-active');
  expect((new Modal(el)).isVisible()).toBeTruthy();
});

test('isVisible() return false when Modal is invisible', () => {
  const el = Template.modal();
  expect((new Modal(el)).isVisible()).toBeFalsy();
});

test('open() display modal', () => {
  const el = Template.modal();
  const body = document.getElementsByTagName('body')[0];
  const modal = new Modal(el);

  modal.open();

  expect(el.className.indexOf('is-active') >= 0).toBeTruthy();
  expect(body.className.indexOf('lz-overflow-hidden') >= 0).toBeTruthy();
});

test('close() hide modal', () => {
  jest.useFakeTimers();

  const el = Template.modal();
  const body = document.getElementsByTagName('body')[0];
  const modal = new Modal(el);

  modal.el.classList.add('is-active');
  modal.close();
  jest.runAllTimers();

  expect(modal.el.className.indexOf('is-active') >= 0).toBeFalsy();
  expect(body.className.indexOf('lz-overflow-hidden') >= 0).toBeFalsy();
});
