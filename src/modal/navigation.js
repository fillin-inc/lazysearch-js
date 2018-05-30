/**
 * ModalNavigation
 *
 * ナビゲーション操作管理
 */
export default class ModalNavigation {
  /**
   * @constructor
   */
  constructor(el) {
    this.el = el;
    this.nextBtn = this.el.getElementsByClassName('lz-next')[0];
    this.prevBtn = this.el.getElementsByClassName('lz-prev')[0];
    this.totalNum = this.el.getElementsByClassName('lz-total-num')[0];
    this.page = this.el.getElementsByClassName('lz-current-page')[0];
    this.totalPage = this.el.getElementsByClassName('lz-total-page')[0];
  }

  /**
   * ナビゲーション更新
   *
   * 表示対象の値が 1 つでも存在しなければナビゲーション自体を隠す
   *
   * @param {Hash} data - ナビゲーション情報
   */
  update(data) {
    let showFlg = false;

    if (data.count > 0) {
      this.totalNum.innerHTML = data.count;
      showFlg = true;
    }

    if (data.current_page) {
      this.page.innerHTML = data.current_page;
      this.totalPage.innerHTML = Math.ceil(data.count / data.per_page);
    }

    if (data.has_next) {
      this.nextBtn.classList.add('is-active');
      this.nextBtn.dataset.page = data.current_page + 1;
    } else {
      this.nextBtn.classList.remove('is-active');
      this.nextBtn.dataset.page = 1;
    }

    if (data.current_page > 1) {
      this.prevBtn.classList.add('is-active');
      this.prevBtn.dataset.page = data.current_page - 1;
    } else {
      this.prevBtn.classList.remove('is-active');
      this.prevBtn.dataset.page = data.current_page;
    }

    if (showFlg) {
      this.el.classList.add('is-active');
    } else {
      this.el.classList.remove('is-active');
    }
  }
}
