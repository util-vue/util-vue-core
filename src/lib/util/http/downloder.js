import {
  util
} from "./../index";

/** 下载组件 */
export class Downloder {
  /**
   * 下载
   */
  download(url, success, progress, error, defaultDoc) {
    defaultDoc = defaultDoc || "_doc/download/";
    var cacheDownload = defaultDoc + "cache/"
    var url = util.url.base.parseURL(url);
    if (!url.file) {
      if (error) error("文件不存在");
      return;
    }
    var self=this;
    //var filename = defaultDoc + url.file;
    var temporaryName = cacheDownload + util.helper.getUUID() + url.file;
    util.plus.io.isExistFile(cacheDownload, () => {
      util.plus.io.removeRecursivelyFile(cacheDownload, () => {
        self.downloadTask(url, temporaryName, defaultDoc, success, error, progress);
      }, () => {
        self.downloadTask(url, temporaryName, defaultDoc, success, error, progress);
      }); //删除临时缓存目录下冗余文件
    }, () => {
      self.downloadTask(url, temporaryName, defaultDoc, success, error, progress);
    })
  }
  downloadTask(url, temporaryName, defaultDoc, success, error, progress) {
    var options = {
      filename: temporaryName,
      retry: 5,
      retryInterval: 10
    };
    var task = plus.downloader.createDownload(
      url.source, options,
      (download, status) => {
        //下载完成
        if (status == 200 && (download.downloadedSize == download.totalSize)) {
            util.plus.io.getFileEntry(temporaryName, f => {
              util.plus.io.getFileEntry(defaultDoc, function (fileEntrys) {
                f.moveTo(fileEntrys, url.file, function (entry) {
                  util.plus.io.loadCacheFile(url.source, success, error, defaultDoc);
                }, error);
              }, error);
            });
        } else {
          if (error) error(download.filename);
        }
      }
    );

    task.addEventListener(
      "statechanged",
      (download, status) => {
        if (
          progress &&
          download &&
          download.totalSize &&
          download.downloadedSize
        )
          progress(
            parseInt(
              (parseFloat(download.downloadedSize + "") /
                parseFloat(download.totalSize + "")) *
              100 +
              ""
            )
          );
      },
      false
    );
    task.start();

  }


}
