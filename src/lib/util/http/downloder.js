import { util } from "./../index";

/** 下载组件 */
export class Downloder {
  /**
   * 下载
   */
  download(url, success, progress, error, defaultDoc) {
    defaultDoc = defaultDoc || "_doc/download/";
    var url = util.url.base.parseURL(url);
    if (!url.file) {
      if (error) error("文件不存在");
      return;
    }
    var filename = defaultDoc + url.file;
    var task = plus.downloader.createDownload(
      url.source,
      {
        filename,
        retry: 5,
        retryInterval: 10
      },
      (download, status) => {
        //下载完成
        if (status == 200) {
          util.plus.io.loadCacheFile(url.source, success, error);
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
