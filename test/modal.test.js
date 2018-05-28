import Modal from '../src/modal';
import Template from '../src/template';

test('initialize Modal', () => {
  const el = document.createElement('div');
  const modal = new Modal(el);
  expect(modal._el).toEqual(el);
  expect(modal.el()).toEqual(el);
});

test('isVisible() return true when Modal is visible', () => {
  const el = document.createElement('div');
  const modal = new Modal(el);

  el.classList.add('is-active');
  expect((new Modal(el)).isVisible()).toBe(true);
});

test('isVisible() return false when Modal is invisible', () => {
  const el = document.createElement('div');
  expect((new Modal(el)).isVisible()).toBe(false);
});

test('append() innsert Modal element before </body>', () => {
  const el = Template.modal();
  const modal = new Modal(el);

  expect(document.querySelector('[data-lz-modal]')).toBeNull();
  modal.append();
  expect(document.querySelector('[data-lz-modal]')).not.toBeNull();
});
