import Modal from '../src/modal';

test("initialize Modal", () => {
  const el = document.createElement('div');
  const modal = new Modal(el);
  expect(modal._el).toEqual(el);
  expect(modal.el()).toEqual(el);
});

test("Modal is visible", () => {
  const el = document.createElement('div');
  const modal = new Modal(el);

  el.classList.add('is-active');
  expect((new Modal(el)).isVisible()).toBe(true);
});

test("Modal is invisible", () => {
  const el = document.createElement('div');
  expect((new Modal(el)).isVisible()).toBe(false);
});
