import { util } from "./../index";
import { HttpClient } from "./httpClient";

export class WebApi {
  /** 发送get请求 */
  get(options) {
    var httpClient = new HttpClient();
    this.httpOptionSetting(options);
    httpClient.get(options);
  }

  /** 发送get请求 */
  post(options) {
    var httpClient = new HttpClient();
    this.httpOptionSetting(options);
    httpClient.post(options);
  }

  /** 发送put请求 */
  put(options) {
    var httpClient = new HttpClient();
    this.httpOptionSetting(options);
    httpClient.put(options);
  }

  /** 发送delete请求 */
  delete(options) {
    var httpClient = new HttpClient();
    this.httpOptionSetting(options);
    httpClient.delete(options);
  }

  //** 发送请求设置 */
  httpOptionSetting(options) {
    options.errorMessage = options.errorMessage === false ? false : true;
    var successCallback = options.success;
    var errorCallback = options.error;
    var completeCallback = options.complete;

    options.success = function(response) {
      if (completeCallback) completeCallback();
      if (options.loading) {
        util.loading.hide();
      }
      if (options.btn && options.btn.stop) {
        options.btn.stop();
      }
      var result = response.body;
      if (result.code === 1) {
        if (successCallback) successCallback(result.data);
      } else {
        if (options.errorMessage) util.message.toast(result.message);
        if (errorCallback) {
          errorCallback(result.message);
        }
      }
    };
    options.error = function(response) {
      if (completeCallback) completeCallback();
      if (options.loading) {
        util.loading.hide();
      }
      if (options.btn && options.btn.play) {
        options.btn.play();
      }
      if (errorCallback) errorCallback("请求出现错误");
    };
  }
}
