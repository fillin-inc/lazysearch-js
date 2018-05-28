import Params from '../src/params';

test('initialize without parameters', () => {
  const p = new Params();

  expect(p.uuid).toBe(null)
  expect(p.keyword).toBe(null);
  expect(p.format).toBe(null);
  expect(p.page).toBe(null);
  expect(p.per_page).toBe(null);
  expect(p.match_count).toBe(null);
  expect(p.match_length).toBe(null);
});

test('initialize with parameters', () => {
  const args = {
    uuid: '1234-5678-90',
    keyword: '検索キーワード',
    format: 'json',
    page: 3,
    per_page: 10,
    match_count: 1,
    match_length: 50
  }
  const p = new Params(args);

  expect(p.uuid).toBe(args.uuid)
  expect(p.keyword).toBe(args.keyword);
  expect(p.format).toBe(args.format);
  expect(p.page).toBe(args.page);
  expect(p.per_page).toBe(args.per_page);
  expect(p.match_count).toBe(args.match_count);
  expect(p.match_length).toBe(args.match_length);
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

  const p = new Params();
  const ret = p.collect(elm);

  expect(ret.constructor.name).toBe('Params')
  expect(p.uuid).toBe(args.uuid)
  expect(p.keyword).toBe(args.keyword);
  expect(p.format).toBe(args.format);
  expect(p.page).toBe(args.page);
  expect(p.per_page).toBe(args.per_page);
  expect(p.match_count).toBe(args.match_count);
  expect(p.match_length).toBe(args.match_length);
});

test('queryString() return empty string when parameter is empty', () => {
  const p = new Params();
  expect(p.queryString()).toBe('');
});

test('queryString() return full query', () => {
  const args = {
    uuid: '1234-5678-90',
    keyword: '検索キーワード',
    format: 'json',
    page: 3,
    per_page: 10,
    match_count: 1,
    match_length: 50
  }
  const p = new Params(args);
  const expected = 'uuid=1234-5678-90&keyword=%E6%A4%9C%E7%B4%A2%E3%82%AD%E3%83%BC%E3%83%AF%E3%83%BC%E3%83%89&format=json&page=3&per_page=10&match_count=1&match_length=50'
  expect(p.queryString()).toBe(expected);
});