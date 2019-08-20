import { util } from "./../index";
export class Loading {
  constructor(isloading) {}

  /** 显示加载中 */
  show(msg) {
    if (this.isloading) this.hide();
    msg = msg || "请稍后...";
    util.f7.f7App.dialog.preloader(msg);
    this.isloading = true;
  }

  /** 关闭加载中 */
  hide() {
    util.f7.f7App.dialog.close();
    this.isloading = false;
  }
}
