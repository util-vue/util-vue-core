import Vue from "vue";
import {
  util
} from "./../index";
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
          key == null ?
          i :
          key + (param instanceof Array ? "[" + i + "]" : "." + i);
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

  upload(pos) {
    pos = this.utilHttpHandle(pos);
    pos.method = "POST";
    var formData = new FormData();
    formData.append("file", pos.files);
    pos.data = formData;
    this.send(pos);
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
          .post(options.url, JSON.stringify(options.data), options)
          .then(options.success, options.error);
        break;
      case "PUT":
        axios
          .put(options.url, JSON.stringify(options.data), options)
          .then(options.success, options.error);
        break;
      case "DELETE":
        options.params = options.data;
        axios.delete(options.url, options).then(options.success, options.error);
        break;
    }
  }

  uploadByPlus(files, callback) {
    if (files.length <= 0) {
      util.message.toast("至少选择一个文件");
      return;
    }
    util.loading.show("请稍后");
    var task = plus.uploader.createUpload(
      util.url.commonUrl.upload, {
        method: "POST"
      },
      function (t, status) {
        util.loading.hide();
        //上传完成
        if (status == 200) {
          if (callback) {
            var result = JSON.parse(t.responseText);
            if (result.code === 1) {
              callback(result.data);
            } else {
              util.message.toast(result.message);
            }
          }
        } else {
          util.message.toast("上传失败");
        }
      }
    );
    for (var i = 0; i < files.length; i++) {
      var f = files[i];
      task.addFile(f, {
        key: "file" + i
      });
    }
    task.start();
  }

  uploadMultipleByPlus(files, callback) {
    if (files.length <= 0) {
      util.message.toast("至少选择一个文件");
      return;
    }
    this.uploadMultipleByPlusAsync(files, 0, callback, []);

  }

  uploadMultipleByPlusAsync(files, uploadIndex, callback, fileResult) {
    util.loading.show(`上传中...( ${uploadIndex + 1}/${files.length} )`);
    var _self = this;
    let task = plus.uploader.createUpload(
      util.url.commonUrl.upload, {
        method: "POST"
      },
      function (t, status) {
        //上传完成
        if (status == 200) {
          let result = JSON.parse(t.responseText);
          if (result.code === 1) {
            fileResult.push(result.data);
            if (files.length === uploadIndex + 1) {
              util.loading.hide();
              callback(fileResult);
              return;
            }
            uploadIndex += 1;
            _self.uploadMultipleByPlusAsync(
              files,
              uploadIndex,
              callback,
              fileResult
            );
          } else {
            util.loading.hide();
            util.message.toast(result.message);
          }
        } else {
          util.message.toast("上传失败");
        }
      }
    );
    task.addFile(files[uploadIndex], {
      key: "file0"
    });
    task.start();
  }

}
