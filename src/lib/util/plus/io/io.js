import {
  util
} from "./../../index.js";
/** 文件对象 */
export class IO {
  /**获取私有文件目录对象 plus.io.PRIVATE_DOC|PRIVATE_WWW|PRIVATE_DOCUMENTS|PRIVATE_DOWNLOADS */
  getPrivateDocFileSystem(code, callBack) {
    plus.io.requestFileSystem(code, function (fs) {
      if (callBack) callBack(fs);
    });
  }
  /** 打开或者创建文件夹 */
  openOrCrateFolder(path, code, success, error) {
    this.getPrivateDocFileSystem(code, fs => {
      fs.root.getDirectory(path, {
        create: true
      }, function (fileEntry) {
        if (success)
          success(fileEntry);
      }, function (e) {
        if (error)
          error(e);
      });
    });
  }
  /**
   * 移动文件
   * @param {原始文件对象} fileEntry 
   * @param {移动到目标文件夹对象} dstEntry 
   * @param {文件新名称} newName 
   * @param {回调成功方法} callback 
   * @param {失败} error 
   */
  moveFile(fileEntry, dstEntry, newName, success, error) {
    fileEntry.moveTo(dstEntry, newName, function (entry) {
      if (success)
        success(true);
    }, function (e) {
      if (error)
        error(false);
    });

  }
  /**
   * 获取fileEntry
   */
  getFileEntry(path, callback, error) {
    plus.io.resolveLocalFileSystemURL(
      path,
      entry => {
        if (callback)
          callback(entry);
      },
      e => {
        if (error)
          error(e);
      }
    );
  }

  /**
   * 删除文件/删除目录
   * @param {删除文件、目录对象} entry 
   * @param {回调成功方法} success 
   * @param {失败} error 
   */
  removeFile(entry, success, error) {
    entry.remove(function (entry) {
      if (success)
        success(true);
    }, function (e) {
      if (error)
        error(e.message);
    });
  }

  /**
   * 递归删除目录
   * @param {删除文件、目录对象} entry 
   * @param {回调成功方法} success 
   * @param {失败} error 
   */
  removeRecursivelyFile(path, success, error) {
    this.getFileEntry(path, function (f) {
      f.removeRecursively(function (entry) {
        if (success)
          success(true);
      }, function (e) {
        if (error)
          error(e.message);
      });
    }, e => {
      if (error)
        error(e);
    });
  }



  /** 打开或者创建文件 */
  openOrCrate(path, code, callBack) {
    this.getPrivateDocFileSystem(code, fs => {
      fs.root.getFile(path, {
        create: true
      }, function (fileEntry) {
        return fileEntry;
      });
    });
  }



  /**文件是否存在 */
  isExistFile(path, callback, error) {
    plus.io.resolveLocalFileSystemURL(
      path,
      entry => {
        if (callback) callback(true);
      },
      e => {
        if (callback) callback(false);
      }
    );
  }



  /** 网络文件是否存在 */
  isExistUrlFile(url, callback, error, defaultDoc) {
    defaultDoc = defaultDoc || "_doc/download/";
    var url = util.url.base.parseURL(url);
    if (!url.file) {
      if (error) error("文件不存在");
      return;
    }
    var filename = defaultDoc + url.file;
    this.isExistFile(filename, callback, error);
  }

  /** 加载网络文件 并进行本地缓存 */
  loadUrlFileAndCache(url, success, progress, error, defaultDoc) {
    if (!window.plus) {
      this.loadHttpImage(url, success, progress, error);
      return;
    }
    var _self = this;
    //判断本地文件是否存在
    this.isExistUrlFile(
      url,
      result => {
        if (result) {
          //如果文件存在  返回file
          _self.loadCacheFile(url, success, error, defaultDoc);
          return;
        }
        util.downloder.download(url, success, progress, error, defaultDoc);
      },
      e => {
        console.log(e);
      },
      defaultDoc
    );
  }


  /** 批量加载网络文件 并进行本地缓存 */
  loadUrlFileAndCacheArray(urlList, success, progress, error, defaultDoc) {
    var _self = this;
    var resultArray = [];
    //判断本地文件是否存在
    for (let i in urlList) {
      this.isExistUrlFile(
        urlList[i],
        result => {
          if (result) {
            //如果文件存在  返回file
            _self.loadCacheFile(urlList[i], function (data) {
              resultArray.push(data.fullPath);
              if (urlList.length - 1 == i) {
                if (success)
                  success(resultArray);
              }
            }, error, defaultDoc);
            return;
          }
          util.downloder.download(urlList[i], function (d) {
            resultArray.push(d.fullPath);
            if (urlList.length - 1 == i) {
              if (success)
                success(resultArray);
            }
          }, progress, error, defaultDoc);
        },
        e => {
          console.log(e);
        }, defaultDoc);
    }
  }



  /**读取缓存文件 */
  loadCacheFile(url, success, error, defaultDoc) {
    defaultDoc = defaultDoc || "_doc/download/";
    var url = util.url.base.parseURL(url);
    if (!url.file) {
      if (error) error("文件不存在");
      return;
    }
    var filename = defaultDoc + url.file;
    this.loadLocalFile(filename, success, error);
  }

  /** 读取本地文件 */
  loadLocalFile(path, success, error) {
    plus.io.resolveLocalFileSystemURL(
      path,
      entry => {
        entry.file(file => {
          if (success) success(file);
        }, error);
      },
      error
    );
  }

  /** 使用http进行图片加载 */
  loadHttpImage(url, success, progress, error) {
    var img = document.createElement("img");
    img.onload = () => {
      if (success) success({
        fullPath: url
      });
    };
    img.onerror = () => {
      if (error) error("加载失败");
    };
    img.src = url;
  }
  /**打开文件 _doc/a.pdf*/
  openFile(filename) {
    plus.runtime.openFile(filename);
  }

  // 保存图片到相册中 
  savePicture(path, successCB, errorCB) {
    this.loadUrlFileAndCache(path, function (d) {
      plus.gallery.save(d.fullPath, function () {
        if (successCB)
          successCB(true)
      }, function (e) {
        if (errorCB)
          errorCB(false)
      });
    }, e => {
      if (errorCB)
        errorCB(e)
    });
  }

}
