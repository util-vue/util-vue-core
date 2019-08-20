import Vue from "vue";
import { util } from "./../index";

/** 请求客户端 */
export class HttpClient {
  /**构造 */
  constructor() {
    this.init();
  }

  /** 初始化 */
  init() {
    Vue.http.interceptors.push((request, next) => {
      let timeout;
      // 這裡改用 _timeout
      if (request._timeout) {
        timeout = setTimeout(() => {
          //自定义响应体 status:408,statustext:"请求超时"，并返回给下下边的next
          next(
            request.respondWith(request.body, {
              status: 408,
              statusText: "请求超时"
            })
          );
        }, request._timeout);
      }
      next(response => {
        console.log(response.status); //如果超时输出408
        return response;
      });
    });
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
    pos.headers["Content-Type"] = "application/json";
    util.globalHeader.merge(pos.headers); //合并全局的头文件
    pos._timeout = 10000;
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
        Vue.http.get(pos.url, pos).then(pos.success, pos.error);
        break;
      case "POST":
        Vue.http.post(pos.url, pos.data, pos).then(pos.success, pos.error);
        break;
      case "PUT":
        Vue.http.put(pos.url, pos.data, pos).then(pos.success, pos.error);
        break;
      case "DELETE":
        pos.params = pos.data;
        Vue.http.delete(pos.url, pos).then(pos.success, pos.error);
        break;
    }
  }
}
