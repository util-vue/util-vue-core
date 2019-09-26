/**
 * 访问地址
 */
import { util } from "./../index";
/**
 * 基础库
 */
class BaseUrl {
  constructor() {
    this._systemServer = "";
  }

  /**初始化 */
  init(options) {
    if (!options) return;
    this._systemServer = options.systemServer;
    this._buildingServer = options.buildingServer;
    this._commonServer = options.commonServer;
    this._productServer = options.productServer;
    this._customerServer = options.customerServer;
    this._diyServer = options.diyServer;
  }

  /** 用户服务器地址 */
  get systemServer() {
    return this._systemServer;
  }

  /** 楼盘服务器地址 */
  get buildingServer() {
    return this._buildingServer;
  }

  /** 楼盘服务器地址 */
  get productServer() {
    return this._productServer;
  }
  
  /** 用户服务器地址 */
  get customerServer() {
    return this._customerServer;
  }

  /** 楼盘服务器地址 */
  get diyServer() {
    return this._diyServer;
  }

  /** 楼盘服务器地址 */
  get commonServer() {
    return this._commonServer;
  }

  /** url 对象 */
  parseURL(url) {
    var a = document.createElement("a");
    a.href = url;
    return {
      source: url,
      protocol: a.protocol.replace(":", ""),
      host: a.hostname,
      port: a.port,
      query: a.search,
      params: (function() {
        var ret = {},
          seg = a.search.replace(/^\?/, "").split("&"),
          len = seg.length,
          i = 0,
          s;
        for (; i < len; i++) {
          if (!seg[i]) {
            continue;
          }
          s = seg[i].split("=");
          ret[s[0]] = s[1];
        }
        return ret;
      })(),
      file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ""])[1],
      hash: a.hash.replace("#", ""),
      path: a.pathname.replace(/^([^\/])/, "/$1"),
      relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ""])[1],
      segments: a.pathname.replace(/^\//, "").split("/")
    };
  }

  /** url参数进行序列化 */
  getParam(path) {
    var result = {},
      param = /([^?=&]+)=([^&]+)/gi,
      match;
    while ((match = param.exec(path)) != null) {
      result[match[1]] = match[2];
    }
    return result;
  }
}

/** 用户相关地址 */
class SystemUrl {
  /** 构造 */
  constructor() {}

  /** 发送验证手机号登录注册一体化令牌 */
  get sendLoginOrRegisterToken() {
    return `${util.url.base.systemServer}/api/sms/SendLoginOrRegisterToken`;
  }

  /** 登录 */
  get loginOrRegister() {
    return `${util.url.base.systemServer}/api/user/LoginOrRegister`;
  }

  /** 登录者用户信息 */
  get get() {
    return `${util.url.base.systemServer}/api/user/get`;
  }

}

/** 楼盘 */
class CommonUrl {
  /** 上传 */
  get upload() {
    return `${util.url.base.commonServer}/api/upload`;
  }
  /** 查询数据版本 */
  get getNewDb() {
    return `${util.url.base.commonServer}/api/dataVersion/getNewDb`;
  }
}

/** 楼盘 */
class BuildingUrl {
  /** 建筑风格 */
  get buildingStylePagerQuery() {
    return `${util.url.base.buildingServer}/api/buildingStyle`;
  }
}

/** 换装 */
class DiyUrl {
  /** 换装户型列表 */
  get diyHouseTypePagerQuery() {
    return `${util.url.base.diyServer}/api/diyHouseType`;
  }
  /** 换装全景详情 */
  get diyPanoramaDetail() {
    return `${util.url.base.diyServer}/api/diyHouseType/diyPanoramaDetail`;
  }
  /** 换装方案查询 */
  get diySchemePagerQuery() {
    return `${util.url.base.diyServer}/api/DiyScheme`;
  }
  /** 换装方案保存 */
  get saveScheme() {
    return `${util.url.base.diyServer}/api/DiyScheme/SaveScheme`;
  }
}

/** 商品 */
class ProductUrl {
  /** 商品清单 */
  get goodsBill() {
    return `${util.url.base.productServer}/api/goods/bill`;
  }
}

/** 用户 */
class CustomerUrl {

  /** 发送评论 */
  get sendComment() {
    return `${util.url.base.customerServer}/api/commonComment`;
  }

  /** 发送评论 */
  get deleteComment() {
    return `${util.url.base.customerServer}/api/commonComment/Delete`;
  }

  /**  获取根目录评论 */
  get rootPagerQuery() {
    return `${util.url.base.customerServer}/api/commonComment/rootPagerQuery`;
  }

  /**  获取子目录评论 */
  get childQuery() {
    return `${util.url.base.customerServer}/api/commonComment/childQuery`;
  }

}

/**
 * 设置数据库缓存地址
 */
class SetDb {
  get caheDb() {
    return "_doc/download/cahedb/";
  }
  get newDb() {
    return "_doc/download/db/";
  }
  get dbName() { 
    return "daogou.db";
  }
  get databaseName() {
    return "daogou";
  }
}

var url = {
  base: new BaseUrl(),
  system: new SystemUrl(),
  building: new BuildingUrl(),
  commonUrl: new CommonUrl(),
  diyUrl: new DiyUrl(),
  productUrl: new ProductUrl(),
  customerUrl: new CustomerUrl(),
  setDb: new SetDb()
};

export default url;
