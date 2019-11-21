export class RequestModel {
  constructor(maskLoading) {
    this.maskLoading = maskLoading || false;
    this.isPulldown = false;
    this.loading = false;
    this.isReload = false;
    this.isError = false;
  }

  /**
   * 处理
   */
  extends() {
    this.loading = false;
    this.isPulldown = false;
    this.isReload = false;
    this.isError = false;
  }

  /**
   * 全部重新加载
   */
  reload() {
    this.isReload = true;
    this.isError = false;
  }

  /**
   * 发生错误
   */
  error() {
    this.isError = true;
    this.isReload = false;
  }

  /**
   * 下拉刷新
   */
  pullDown() {
    this.isPulldown = true;
    this.loading = true;
  }
}
