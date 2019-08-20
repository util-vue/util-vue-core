export class GlobalHeader {
  /** 构造 */
  constructor() {
    this._headers = [];
  }

  /**添加 */
  add(key, value) {
    for (const item of this._headers) {
      if (item.key === key) {
        item.value = value;
        return;
      }
    }
    this._headers.push({
      key: key,
      value: value
    });
  }

  /** 删除 */
  remove(key) {
    for (const item of this._headers) {
      if (item.key === key) {
        var index = this._headers.indexOf(item);
        this._headers.splice(index, 1);
        return;
      }
    }
  }

  /** 合并 */
  merge(headers) {
    if (!headers) return;
    for (const item of this._headers) {
      headers[item.key] = item.value;
    }
  }
}
