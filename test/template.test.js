import Template from '../src/template';

test('get modal element', () => {
  expect(Template.modal().outerHTML).toMatch(/<div class="lz-modal lz-ignore" data-lz-modal="">/);
});

test('get search result element', () => {
  expect(Template.result().outerHTML).toMatch(/<div class="lz-result">/);
});
