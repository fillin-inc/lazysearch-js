import SearchParams from '../../src/search/params';

test('initialize', () => {
  const p = new SearchParams();

  expect(p.uuid).toBeNull();
  expect(p.keyword).toBeNull();
  expect(p.format).toBeNull();
  expect(p.page).toBeNull();
  expect(p.per_page).toBeNull();
  expect(p.match_count).toBeNull();
  expect(p.match_length).toBeNull();
});

test('collect() update properties', () => {
  const args = {
    uuid: '0987-6543-21',
    keyword: 'test keyword',
    format: 'jsonp',
    page: 1,
    per_page: 10,
    match_count: 1,
    match_length: 150
  };
  const html = `<form id="target">
                  <input type="text" name="uuid" value="${args.uuid}">
                  <input type="text" name="keyword" value="${args.keyword}">
                  <input type="text" name="format" value="${args.format}">
                  <input type="text" name="page" value="${args.page}">
                  <input type="text" name="per_page" value="${args.per_page}">
                  <input type="text" name="match_count" value="${args.match_count}">
                  <input type="text" name="match_length" value="${args.match_length}">
                </form>`;
  document.body.innerHTML = html;
  const elm = document.querySelector('#target');

  const p = new SearchParams();
  const ret = p.collect(elm);

  expect(p.uuid).toEqual(args.uuid)
  expect(p.keyword).toEqual(args.keyword);
  expect(p.format).toEqual(args.format);
  expect(p.page).toEqual(args.page);
  expect(p.per_page).toEqual(args.per_page);
  expect(p.match_count).toEqual(args.match_count);
  expect(p.match_length).toEqual(args.match_length);
});

test('queryString() return empty string when parameter is empty', () => {
  const p = new SearchParams();
  expect(p.queryString()).toEqual('');
});

test('queryString() return full query', () => {
  const p = new SearchParams();
  const args = {
    uuid: '1234-5678-90',
    keyword: '検索キーワード',
    format: 'json',
    page: 3,
    per_page: 10,
    match_count: 1,
    match_length: 50
  }
  for (let key in args) {
    p[key] = args[key]
  }

  const expected = 'uuid=1234-5678-90&keyword=%E6%A4%9C%E7%B4%A2%E3%82%AD%E3%83%BC%E3%83%AF%E3%83%BC%E3%83%89&format=json&page=3&per_page=10&match_count=1&match_length=50'
  expect(p.queryString()).toEqual(expected);
});

test('hasKeyword() return true when keyword is exists', () => {
  const p = new SearchParams();
  p.keyword = 1;
  expect(p.hasKeyword()).toBeTruthy();
});

test('hasKeyword() return false when keyword is not exists', () => {
  const p = new SearchParams();
  p.keyword = '';
  expect(p.hasKeyword()).toBeFalsy();
});

test('hasKeyword() return false when keyword is empty', () => {
  const p = new SearchParams();
  p.keyword = ' ';
  expect(p.hasKeyword()).toBeFalsy();
});
