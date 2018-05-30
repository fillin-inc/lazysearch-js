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
  }

  /**
   * ナビゲーション更新
   *
   * 表示対象の値が 1 つでも存在しなければナビゲーション自体を隠す
   *
   * @param {Hash} data - ナビゲーション情報
   */
  update(data) {
    const nextBtn = this.el.getElementsByClassName('lz-next')[0];
    const prevBtn = this.el.getElementsByClassName('lz-prev')[0];
    const totalNum = this.el.getElementsByClassName('lz-total-num')[0];
    const page = this.el.getElementsByClassName('lz-current-page')[0];
    const totalPage = this.el.getElementsByClassName('lz-total-page')[0];
    let showFlg = false;

    if (data.count) {
      totalNum.innerHTML = data.count;
      showFlg = true;
    }

    if (data.page) {
      page.innerHTML = data.page;
      totalPage.innerHTML = Math.ceil(data.count / data.per_page);
      showFlg = true;
    }

    if (data.has_next) {
      nextBtn.classList.add('is-active');
      nextBtn.dataset.page = data.page + 1;
      showFlg = true;
    } else {
      nextBtn.classList.remove('is-active');
      nextBtn.dataset.page = 1;
    }

    if (data.page > 1) {
      prevBtn.classList.add('is-active');
      prevBtn.dataset.page = data.page - 1;
      showFlg = true;
    } else {
      prevBtn.classList.remove('is-active');
      prevBtn.dataset.page = data.page;
    }

    if (showFlg) {
      el.classList.add('is-active');
    } else {
      el.classList.remove('is-active');
    }
  }
}
