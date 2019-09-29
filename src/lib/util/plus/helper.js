import {
  util
} from "./../../index.js";
import {
  plus
} from "./index.js";

/** plus工具类 */
export class Helper {
  /** 是否启用了Plus */
  isOpen() {
    if (plus) return true;
    return false;
  }
  getVersionCode() {
    return plus.runtime.versionCode;
  }
  getVersion() {
    return plus.runtime.version;
  }
  //比较版本号
  compareVersion(localVersion, newVersion) {
    var localVersionArray = localVersion.split(".");
    var newVersionArray = newVersion.split(".");
    for (var i = 0; i < localVersionArray.length; i++) {
      var localValue = Number(localVersionArray[i]);
      var newValue = Number(newVersionArray[i]);
      if (localValue > newValue) return false;
      if (localValue < newValue) return true;
    }
    return false;
  }

  // 调用第三方程序打开文件
  launchApp(url) {
    if (plus.os.name == "Android") {
      plus.runtime.launchApplication({
        pname: "com.android.browser",
        extra: {
          url:url
        }
      }, function (e) {
        util.message.toast("打开失败"+e.message);
      });
    } else if (plus.os.name == "iOS") {
      plus.runtime.launchApplication({
        action:url
      }, function (e) {
        util.message.toast("打开失败"+e.message);
      });
    }
  }

}
