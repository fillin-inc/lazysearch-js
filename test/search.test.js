import Search from '../src/search';
import Template from '../src/template';

beforeEach(() => {
  const baseForm = `
    <form id="base-form" class="search" data-lz="">
      <input name="uuid" type="hidden" value="0bbeb8df-9a99-4d8e-9f72-da9600488d0b">
      <input name="format" type="hidden" value="json">
      <input name="per_page" type="hidden" value="5">
      <input autocomplete="off" class="input keyword" name="keyword" type="text" value="">
      <button class="button is-primary" type="submit">検索</button>
    </form>
  `;
  document.body.innerHTML = baseForm + Template.modal().outerHTML;
});

test('initialize Search', () => {
  const search = new Search();
  expect(search.endpoint).toEqual('https://api.lazysear.ch/search');
});

test('initialize Search with endpoint', () => {
  const url = 'https://hoge.lazysear.ch/test/search';
  const search = new Search(url);
  expect(search.endpoint).toEqual(url);
});

test('reflectKeywordValue() change another input value', () => {
  document.body.innerHTML = `
    <form><input type="text" id="keyword-1" class="keyword" value=""></form>
    <form><input type="text" id="keyword-2" class="keyword" value=""></form>
  `;

  const search = new Search();
  const keyword1 = document.querySelector('#keyword-1');
  const keyword2 = document.querySelector('#keyword-2');
  const keywords = document.querySelectorAll('.keyword');
  keyword1.value = 'something';

  search.reflectKeywordValue(keyword1, keywords);
  expect(keyword1.value).toEqual('something');
  expect(keyword2.value).toEqual('something');
});

test('execute() display search result', () => {
  const search = new Search();
  const btn = document.querySelector('.lz-button');
  const baseForm = document.getElementById('base-form');
  document.getElementsByName('keyword')[0].value = 'api';
  search.execute(btn, baseForm);

  return new Promise((resolve, reject) => {
    while(true) {
      if (document.querySelectorAll('.lz-result').length > 0) {
        break;
      }
    }
    expect(document.querySelectorAll('.lz-result').length).toBeGreaterThan(1);
    expect(document.querySelector('.lz-nav.is-active')).not.toBeNull();
    resolve();
  });
});

test('execute() display error when keyword is empty', () => {
  const search = new Search();
  const btn = document.querySelector('.lz-button');
  const baseForm = document.getElementById('base-form');
  search.execute(btn, baseForm);

  expect(document.querySelector('.lz-result').innerHTML).toEqual('サイト内検索にはキーワードの指定が必要です。');
  expect(document.querySelector('.has-error')).not.toBeNull();
  expect(document.querySelector('.lz-nav.is-active')).toBeNull();
});

test('execute() display error when uuid is empty', () => {
  document.querySelector('[name=uuid]').value = '';
  document.querySelector('[name=keyword]').value = 'api';

  const search = new Search();
  const btn = document.querySelector('.lz-button');
  const baseForm = document.getElementById('base-form');
  search.execute(btn, baseForm);

  return new Promise((resolve, reject) => {
    while(true) {
      if (document.querySelectorAll('.lz-result').length > 0) {
        break;
      }
    }
    expect(document.querySelector('.lz-result').innerHTML).toEqual('param:uuid is empty (4201)');
    expect(document.querySelector('.has-error')).not.toBeNull();
    expect(document.querySelector('.lz-nav.is-active')).toBeNull();
    resolve();
  });
});
