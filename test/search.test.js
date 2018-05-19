import Search from '../src/search';

// TODO: fetch まわりのテスト

test('initialize Search', () => {
  const search = new Search();

  expect(search.endpoint).toBe('https://api.lazysear.ch/search');
  expect(search.params).toEqual({keyword: null, uuid: null});
});

test('initialize Search with Param Hash', () => {
  const params = {
    uuid: 'something-uuid',
    keyword: 'some-word',
    format: 'json',
    page: 2,
    per_page: 3,
    match_count: 2,
    match_length: 100,
  };
  const search = new Search(params);
  expect(search.params).toEqual(params);
});

test('initialize Search with non-acceptable params', () => {
  const params = {foo: 'bar'};
  const search = new Search(params);
  expect(search.params).toEqual({keyword: null, uuid: null});
});

test('initialize Search with endpoint', () => {
  const url = 'https://hoge.lazysear.ch/test/search';
  const search = new Search(null, url);
  expect(search.endpoint).toBe(url);
});

test('get request query', () => {
  const search = new Search();
  expect(search.reqQuery()).toBe('keyword=null&uuid=null');
});
