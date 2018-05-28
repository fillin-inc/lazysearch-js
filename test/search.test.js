import Search from '../src/search';

// TODO: fetch まわりのテスト

test('initialize Search', () => {
  const search = new Search();
  expect(search.endpoint).toBe('https://api.lazysear.ch/search');
});

test('initialize Search with endpoint', () => {
  const url = 'https://hoge.lazysear.ch/test/search';
  const search = new Search(url);
  expect(search.endpoint).toBe(url);
});
