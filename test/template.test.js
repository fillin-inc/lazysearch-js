import Template from '../src/template';

test('initialize Template', () => {
  const t = new Template();
  expect(t.modal().outerHTML).toMatch(/<div class="lz-modal lz-ignore" data-lz-modal="">/);
  expect(t.result().outerHTML).toMatch(/<div class="lz-result">/);
});
