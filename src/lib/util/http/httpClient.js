import Vue from "vue";
import { util } from "./../index";
import axios from "axios";

/** 请求客户端 */
export class HttpClient {
  /**构造 */
  constructor() {
    this.init();
  }

  /** 初始化 */
  init() {
    axios.defaults.timeout = 15000;
    axios.defaults.headers["Content-Type"] = "application/json";
  }

  /**
   * url 参数编译
   */
  urlEncode(param, key, encode) {
    if (param == null) return "";
    var paramStr = "";
    var t = typeof param;
    if (t == "string" || t == "number" || t == "boolean") {
      paramStr +=
        "&" +
        key +
        "=" +
        (encode == null || encode ? encodeURIComponent(param) : param);
    } else {
      for (var i in param) {
        var k =
          key == null
            ? i
            : key + (param instanceof Array ? "[" + i + "]" : "." + i);
        paramStr += this.urlEncode(param[i], k, encode);
      }
    }
    return paramStr;
  }

  //网络请求处理
  utilHttpHandle(options) {
    options.data = options.data || {};
    options.headers = options.headers || {};
    util.globalHeader.merge(options.headers); //合并全局的头文件
    options.timeout = 30000;
    return options;
  }

  /** 发送 */
  get(options) {
    options = this.utilHttpHandle(options);
    options.method = "GET";
    this.send(options);
  }

  /** 发送 */
  post(options) {
    options = this.utilHttpHandle(options);
    options.method = "POST";
    this.send(options);
  }

  /** 发送 */
  put(options) {
    options = this.utilHttpHandle(options);
    options.method = "PUT";
    this.send(options);
  }

  /** 发送 */
  delete(options) {
    options = this.utilHttpHandle(options);
    options.method = "DELETE";
    this.send(options);
  }

  /** 发送 */
  send(options) {
    if (options.loading) {
      util.loading.show();
    }
    if (options.btn && options.btn.stop) {
      options.btn.play();
    }

    switch (options.method) {
      case "GET":
        options.params = options.data;
        axios.get(options.url, options).then(options.success, options.error);
        break;
      case "POST":
        axios
          .post(options.url, options.data)
          .then(options.success, options.error);
        break;
      case "PUT":
        axios
          .put(options.url, options.data)
          .then(options.success, options.error);
        break;
      case "DELETE":
        options.params = options.data;
        axios.delete(options.url, options).then(options.success, options.error);
        break;
    }
  }
}
