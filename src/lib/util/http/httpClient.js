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
  utilHttpHandle(pos) {
    pos.data = pos.data || {};
    pos.headers = pos.headers || {};
    util.globalHeader.merge(pos.headers); //合并全局的头文件
    pos.timeout = 30000;
    return pos;
  }

  /** 发送 */
  get(pos) {
    pos = this.utilHttpHandle(pos);
    pos.method = "GET";
    this.send(pos);
  }

  /** 发送 */
  post(pos) {
    pos = this.utilHttpHandle(pos);
    pos.method = "POST";
    this.send(pos);
  }

  /** 发送 */
  put(pos) {
    pos = this.utilHttpHandle(pos);
    pos.method = "PUT";
    this.send(pos);
  }

  /** 发送 */
  delete(pos) {
    pos = this.utilHttpHandle(pos);
    pos.method = "DELETE";
    this.send(pos);
  }

  /** 发送 */
  send(pos) {
    switch (pos.method) {
      case "GET":
        pos.params = pos.data;
        axios.get(pos.url, pos).then(pos.success, pos.error);
        break;
      case "POST":
        axios.post(pos.url, pos.data).then(pos.success, pos.error);
        break;
      case "PUT":
        axios.put(pos.url, pos.data).then(pos.success, pos.error);
        break;
      case "DELETE":
        pos.params = pos.data;
        axios.delete(pos.url, pos).then(pos.success, pos.error);
        break;
    }
  }
}
