# LazySearch JS

![LazySearch-JS 利用例](./lazysearch-animation.gif)

## 概要

このリポジトリでは [LazySearch](https://lazysear.ch/) 用の JS ライブラリ `lz.js` を開発しています。
[LazySearch](https://lazysear.ch/) の検索機能( [Search API](https://docs.lazysear.ch/api/search/) ) を簡単に利用できるようにするためのライブラリです。

ご利用にあたっては [LazySearch](https://lazysear.ch/) においてプロジェクトの作成, Web サイトの登録, 所有権確認とクローラーの実行が必要です。

## 使い方

### 1. JS ファイルの読み込み

検索フォームを設置する Web サイトに JS ファイルを読み込む必要があります。[Releases](https://github.com/fillin-inc/lazysearch-js/releases) から最新版の `lz.js` をダウンロードし Web サイトで検索フォームを設置するページに読み込ませてください。

JS ファイルの読み込み例:

``` html
<html>
    <head>
        <meta charset="utf-8">
        <title>Example</title>
        <script src="/javascripts/lz-x.x.x.js"></script>
    </head>
    <body>
    <!-- 省略 -->
    </body><!-- body タグがないと動作しないので注意!! -->
</html>
```

### 2. form タグを設置

`lz.js` は `data-lz` 属性がつけられた `<form>` タグを探し出します。この `<form>` タグの中にある `input` タグの `name` 属性をパラメータとして利用します。

`<form>` タグの記述例:

``` html
<form data-lz>
    <input type="hidden" name="uuid" value="your-website-uuid-on-lazysearch">
    <input type="text" name="keyword">
    <button type="submit">検索</button> 
    <!-- type="submit" をもつ button または input, もしくは class="lz-button" の要素で検索開始を検知します -->
</form>
```

設置ルールは簡単です。

1. `<form>` タグに `data-lz` 属性を付与
2. 検索に利用されるパラメーターは `input` 属性で定義
3. `uuid` と `keyword` は必須
4. 検索開始のボタンには `type="submit"` または `class="lz-button"` を付与

### 3. サイトの変更をデプロイ

変更した内容をサーバーにデプロイ(アップロード)してください。完了すればサイト内検索は利用可能です。

## 利用可能なパラメーター

各パラメーターの取り扱いについては [Search API](https://docs.lazysear.ch/api/search/) のドキュメントを確認してください。

- uuid
- keyword
- page
- per_page
- match_count
- match_length

## 対応ブラウザ

以下のブラウザで動作するように開発しています。動作やデザインに問題がある場合は [issue](https://github.com/fillin-inc/lazysearch-js/issues) からお知らせいただけると助かります。

- Firefox
- Google Chrome
- Safari
- Edge
- IE 11
- IE 10

## 参考になる Web サイト

- https://docs.lazysear.ch/
- https://issueoverflow.com/

## LICENSE

MIT ライセンスです。
詳細は [LICENSE](https://github.com/fillin-inc/lazysearch-js/blob/develop/LICENSE) を参照してください。

