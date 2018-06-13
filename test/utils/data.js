/**
 * UtilData
 *
 * テスト実行時に利用するデータを管理
 */
export default class UtilData {
  /**
   * Search API 正常系データ
   *
   * @return {Object}
   */
  static searchExecuteOk() {
    const host = 'https://api.lazysear.ch';
    const path = '/search?uuid=0bbeb8df-9a99-4d8e-9f72-da9600488d0b&keyword=api&format=json&page=1&per_page=5';
    const body = {
      uuid: '0bbeb8df-9a99-4d8e-9f72-da9600488d0b',
      keyword: 'api',
      count: 8,
      per_page: 5,
      current_page: 1,
      match_count: 1,
      match_length: 200,
      has_next: true,
      results: [{
        id: 1028,
        url: 'https://docs.lazysear.ch/sitemap/',
        title: 'サイトマップ | LazySearch Docs',
        match: '(matched_content)',
        created_at: '2018-03-27T11:35:27+00:00',
        updated_at: '2018-05-25T04:07:35+00:00',
      },
      {
        id: 1024,
        url: 'https://docs.lazysear.ch/getting-started/adding-search-to-website/',
        title: 'Web サイトに検索追加 | LazySearch Docs',
        match: '(matched_content)',
        created_at: '2018-03-27T11:35:22+00:00',
        updated_at: '2018-05-25T04:07:35+00:00',
      }],
      errors: [],
      completed_in: 0.018653752,
      format: 'json',
      version: 'lazy-api 0.3.3(95ea5b6)',
      created_at: '2018-05-31T02:42:00+00:00',
    };
    return {host: host, path: path, response: body};
  }

  /**
   * Search API もっと読むデータ
   *
   * @return {Object}
   */
  static searchExecuteReadMoreOk() {
    const host = 'https://api.lazysear.ch';
    const path = '/search?uuid=0bbeb8df-9a99-4d8e-9f72-da9600488d0b&keyword=api&format=json&page=2&per_page=5';
    const body = {
      uuid: '0bbeb8df-9a99-4d8e-9f72-da9600488d0b',
      keyword: 'api',
      count: 8,
      per_page: 5,
      current_page: 1,
      match_count: 1,
      match_length: 200,
      has_next: false,
      results: [{
        id: 1028,
        url: 'https://docs.lazysear.ch/sitemap/',
        title: 'サイトマップ | LazySearch Docs',
        match: '(matched_content)',
        created_at: '2018-03-27T11:35:27+00:00',
        updated_at: '2018-05-25T04:07:35+00:00',
      },
      {
        id: 1024,
        url: 'https://docs.lazysear.ch/getting-started/adding-search-to-website/',
        title: 'Web サイトに検索追加 | LazySearch Docs',
        match: '(matched_content)',
        created_at: '2018-03-27T11:35:22+00:00',
        updated_at: '2018-05-25T04:07:35+00:00',
      }],
      errors: [],
      completed_in: 0.018653752,
      format: 'json',
      version: 'lazy-api 0.3.3(95ea5b6)',
      created_at: '2018-05-31T02:42:00+00:00',
    };
    return {host: host, path: path, response: body};
  }

  /**
   * Search API UUID が存在しない場合のデータ
   *
   * @return {Object}
   */
  static searchExecuteNoUUID() {
    const host = 'https://api.lazysear.ch';
    const path = '/search?keyword=api&format=json&page=1&per_page=5';
    const body = {
      uuid: 'null',
      keyword: 'api',
      count: 0,
      per_page: 5,
      current_page: 1,
      match_count: 1,
      match_length: 200,
      has_next: false,
      results: [],
      errors: [
        {
          'error_id': 4202,
          'message': 'param:uuid is not exist',
        },
      ],
      completed_in: 0.004084563,
      format: 'json',
      version: 'lazy-api 0.3.3(95ea5b6)',
      created_at: '2018-05-31T03:06:05+00:00',
    };
    return {host: host, path: path, response: body};
  }
}
