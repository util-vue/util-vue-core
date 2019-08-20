export class QueryModel {
  constructor(
    page,
    pageCount,
    pageSize,
    totalCount,
    order,
    hasMore,
    isPulldown,
    loading,
    keyword
  ) {
    this.isPulldown = false;
    this.clear();
    this.page = 1;
    this.pageSize = 10;
    this.loading = false;
    this.firstLoad = true;
    this.keyword = "";
  }

  /**
   * 服务器返回分页对象 进行合并
   * @param {*} pagerModel
   */
  extends(pagerModel) {
    this.firstLoad = false;
    this.page = pagerModel.page;
    this.pageCount = pagerModel.pageCount;
    this.pageSize = pagerModel.pageSize;
    this.totalCount = pagerModel.totalCount;
    this.order = pagerModel.order;
    this.hasMore = this.isHasMore();
    this.loading = false;
    this.isPulldown = false;
  }

  /**
   * 不获取更多
   */
  noMore() {
    this.hasMore = false;
  }

  /**
   * 是否有更多数据
   */
  isHasMore() {
    return this.page < this.pageCount;
  }

  /**
   *  画面加载更多业务
   */
  get pagePreloader() {
    if (this.isPulldown) return false;
    if (this.loading) return true;
    if (this.isNoData) return false;
    return this.hasMore;
  }

  /**
   * 是否允许加载更多
   */
  get canLoadmore() {
    if (this.loading) return false;
    return this.hasMore;
  }

  /**
   * 是否已确定没有数据
   */
  get isNoData() {
    if (this.loading) return false;
    if (this.firstLoad) return false;
    return this.totalCount === 0;
  }

  /**
   * 清空数据
   */
  clear() {
    this.page = 1;
    this.pageCount = 0;
    this.totalCount = 0;
    this.hasMore = true;
  }

  /**
   * 下一页
   */
  nextPage() {
    this.page += 1;
    this.loading = true;
  }

  /**
   * 需要分页请求
   */
  needPageRequest(itemIndex) {
    if (this.page * this.pageSize > itemIndex) return 0;
    var needPage = 0;
    while (true) {
      if ((this.page + needPage) * this.pageSize > itemIndex) break;
      needPage++;
    }
    return needPage;
  }

  /**
   * 下拉刷新
   */
  pullDown() {
    this.isPulldown = true;
    this.loading = true;
  }
}
