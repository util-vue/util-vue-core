/*
 * storage 主要放项目中的storage相关操作：存取等
 */
export class Storage {
  /** 对本地数据进行操作的相关方法，如localStorage的封装 */
  setStorage(key, value, duration) {
    var data = {
      value: value,
      expiryTime:
        !duration || isNaN(duration)
          ? 0
          : this.getCurrentTimeStamp() + parseInt(duration)
    };
    localStorage[key] = JSON.stringify(data);
  }

  /** 获取仓储 */
  getStorage(key) {
    var data = localStorage[key];
    if (!data || data === "null") {
      return null;
    }
    var now = this.getCurrentTimeStamp();
    var obj;
    try {
      obj = JSON.parse(data);
    } catch (e) {
      return null;
    }
    if (obj.expiryTime === 0 || obj.expiryTime > now) {
      return obj.value;
    }
    return null;
  }

  /** 删除仓储 */
  removeStorage(key) {
    localStorage.removeItem(key);
  }

  getCurrentTimeStamp() {
    return Date.parse(new Date());
  }
}
