import { Pinyin } from "./chinesePY";

export class Helper {
  /**
   * 拼音
   */
  get pinyin() {
    return new Pinyin();
  }

  /**
   * 当前时间
   */
  getDate() {
    return new Date();
  }

  /**
   * 时间戳
   */
  getTimeStamp() {
    return Date.parse(new Date());
  }

  /**
   * 获取uuid
   */
  getUUID() {
    if (
      typeof window !== "undefined" &&
      typeof window.crypto !== "undefined" &&
      typeof window.crypto.getRandomValues !== "undefined"
    ) {
      // If we have a cryptographically secure PRNG, use that
      // http://stackoverflow.com/questions/6906916/collisions-when-generating-uuids-in-javascript
      let buf = new Uint16Array(8);
      window.crypto.getRandomValues(buf);
      return (
        this.pad4(buf[0]) +
        this.pad4(buf[1]) +
        "-" +
        this.pad4(buf[2]) +
        "-" +
        this.pad4(buf[3]) +
        "-" +
        this.pad4(buf[4]) +
        "-" +
        this.pad4(buf[5]) +
        this.pad4(buf[6]) +
        this.pad4(buf[7])
      );
    } else {
      // Otherwise, just use Math.random
      // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
      // https://stackoverflow.com/questions/11605068/why-does-jshint-argue-against-bitwise-operators-how-should-i-express-this-code
      return (
        this.random4() +
        this.random4() +
        "-" +
        this.random4() +
        "-" +
        this.random4() +
        "-" +
        this.random4() +
        "-" +
        this.random4() +
        this.random4() +
        this.random4()
      );
    }
  }

  /**
   * guid 空
   */
  getUUIDEmpty() {
    return "00000000-0000-0000-0000-000000000000";
  }

  pad4(num) {
    let ret = num.toString(16);
    while (ret.length < 4) {
      ret = "0" + ret;
    }
    return ret;
  }

  /** 取随机数 */
  random4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  /**
   * 使用循环的方式判断一个元素是否存在于一个数组中
   */
  isInArray(arr, value) {
    for (var i = 0; i < arr.length; i++) {
      if (value === arr[i]) {
        return true;
      }
    }
    return false;
  }

  /**
   * 删除
   */
  remove(arr, value) {
    for (var i = 0; i < arr.length; i++) {
      if (value === arr[i]) {
        arr.splice(i, 1);
        return;
      }
    }
  }

  /**
   * 删除
   */
  removeIds(arr, value) {
    if (arr.indexOf(value >= 0)) arr.replace(arr, `${value},`);
  }

  /**
   * 获取移动设备类型
   */
  getDevice() {
    //判断是否手机端访问
    var userAgentInfo = navigator.userAgent.toLowerCase();
    var Agents = [
      "android",
      "iphone",
      "symbianos",
      "windows phone",
      "ipad",
      "ipod"
    ];
    var ly = document.referrer; //返回导航到当前网页的超链接所在网页的URL
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) >= 0 && (ly == "" || ly == null)) {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) return "Android";
        if (isiOS) return "Ios";
      }
    }
    return "Pc";
  }

  //判断是否是微信浏览器的函数
  isWeiXin() {
    //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    var ua = window.navigator.userAgent.toLowerCase();
    console.log(ua);
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 乘法
   */
  accMul(arg1, arg2) {
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length;
    } catch (e) {}
    try {
      m += s2.split(".")[1].length;
    } catch (e) {}
    return (
      (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
      Math.pow(10, m)
    );
  }
  /**
   * 除法
   */
  accDiv(arg1, arg2) {
    var t1 = 0,
      t2 = 0,
      r1,
      r2;
    try {
      t1 = arg1.toString().split(".")[1].length;
    } catch (e) {}
    try {
      t2 = arg2.toString().split(".")[1].length;
    } catch (e) {}
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * pow(10, t2 - t1);
  }
  /**
   * 加法
   */
  accAdd(arg1, arg2) {
    var r1, r2, m, c;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
      var cm = Math.pow(10, c);
      if (r1 > r2) {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", "")) * cm;
      } else {
        arg1 = Number(arg1.toString().replace(".", "")) * cm;
        arg2 = Number(arg2.toString().replace(".", ""));
      }
    } else {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
  }
  /**
   * 减法
   */
  accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = r1 >= r2 ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  }

  /**
   * 根据元素自定义属性获取元素
   */
  getElementByAttr(tag, attr, value) {
    var aElements = document.getElementsByTagName(tag);
    var aEle = [];
    for (var i = 0; i < aElements.length; i++) {
      if (aElements[i].getAttribute(attr) == value) aEle.push(aElements[i]);
    }
    return aEle;
  }

  /** 日期格式化 */
  formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    let o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + "";
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? str : this.padLeftZero(str)
        );
      }
    }
    return fmt;
  }

  /**
   * 补零
   */
  padLeftZero(str) {
    return ("00" + str).substr(str.length);
  }

  /**
   * 获取参数
   */
  getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  /**
   * 参数对象化
   */
  parseQuery(query) {
    var reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
    var obj = {};
    while (reg.exec(query)) {
      obj[RegExp.$1] = RegExp.$2;
    }
    return obj;
  }

  /** 复制对象 */
  copy(obj) {
    if (!obj) return obj;
    return JSON.parse(JSON.stringify(obj));
  }

  /** 数组排序 */
  arrayTimeSort(array, fieldName, isDesc) {
    fieldName = fieldName || "time";
    var nowdate = new Date();
    array.sort((obj1, obj2) => {
      //倒序排列
      var val1 = new Date(obj1[fieldName]); // 2018-7-11 10:50:29
      var val2 = new Date(obj2[fieldName]);
      var dc1 = Math.abs(parseInt(nowdate - val1) / 1000);
      var dc2 = Math.abs(parseInt(nowdate - val2) / 1000);
      if (isDesc) {
        if (dc1 > dc2) {
          return 1;
        } else if (dc1 < dc2) {
          return -1;
        } else {
          return 0;
        }
      } else {
        if (dc1 < dc2) {
          return 1;
        } else if (dc1 > dc2) {
          return -1;
        } else {
          return 0;
        }
      }
    });
  }

  /** 范围取值 */
  clamp(val, min, max) {
    if (min != undefined && val <= min) return min;
    if (max != undefined && val >= max) return max;
    return val;
  }

  /** 数量简写 */
  numFormat(num) {
    if (num >= 10000) {
      num = Math.round(num / 1000) / 10 + "w";
    } else if (num >= 1000) {
      num = Math.round(num / 100) / 10 + "k";
    }
    return num;
  }

}
