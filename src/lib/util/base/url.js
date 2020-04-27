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
    var result = {
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
      file: decodeURI((a.pathname.match(/\/([^\/?#]+)$/i) || [, ""])[1]),
      hash: a.hash.replace("#", ""),
      path: a.pathname.replace(/^([^\/])/, "/$1"),
      relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ""])[1],
      segments: a.pathname.replace(/^\//, "").split("/")
    };
    return result;
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

  /**修改密码 */
  get editPassWord() {
    return `${util.url.base.systemServer}/api/User/ChangePassword`;
  }

  /**Id登录 */
  get idLogin() {
    return `${util.url.base.systemServer}/api/User/IdLogin`;
  }
  /** 刷新 */
	get refreshSessionKey() {
		return `${util.url.base.systemServer}/api/user/refreshSessionKey`;
	}

	/** 微信登录 */
	get wechatLogin() {
		return `${util.url.base.systemServer}/api/user/wechatLogin`;
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
  //获取所有地区
  get getAllAreaList() {
    return `${util.url.base.commonServer}/api/area/GetAllAsync`;
  }
  //地址转经纬度
  get addressToLngLat() {
    return `${util.url.base.commonServer}/api/area/AddressToLngLat`;
  } /** 查询客户端版本 */
  get getClientVersion() {
    return `${util.url.base.commonServer}/api/ClientVersion/GetClientVersion`;
  }
  /** 查询服务器时间 */
	get getServerTime() {
		return `${util.url.base.commonServer}/api/DataVersion/ServerTime`;
	}
}

/** 楼盘 */
class BuildingUrl {
  /** 建筑风格 */
  get buildingStylePagerQuery() {
    return `${util.url.base.buildingServer}/api/buildingStyle`;
  }
  /** 楼盘客户分页查询 */
	get buildingPagerQuery() {
		return `${util.url.base.buildingServer}/api/building`;
	}
	/** 楼盘客户定位位置查询 */
	get locationQuery() {
		return `${util.url.base.buildingServer}/api/building/locationQuery`;
	}
	/** 楼盘包含样板间 */
	get buildingIncludShowHouse() {
		return `${util.url.base.buildingServer}/api/building/buildingIncludShowHouse`;
	}
	/** 样板间分页查询 */
	get showHousePagerQuery() {
		return `${util.url.base.buildingServer}/api/ShowHouse`;
	}
	/** 统计 */
	get platfromBuildingsMouduleStatistics() {
		return `${util.url.base.buildingServer}/api/building/PlatfromBuildingsMouduleStatistics`;
	}
	/** 已关注 */
	get attentionPagerQuery() {
		return `${util.url.base.buildingServer}/api/building/attentionPagerQuery`;
	}
	/** 楼盘详情 */
	get buildingDetail() {
		return `${util.url.base.buildingServer}/api/building/detail`;
	}
	/** 风格下拉列表 */
	get styleSelectItems() {
		return `${util.url.base.buildingServer}/api/buildingstyle/selectItems`;
	}
	/** 价格下拉列表 */
	get priceRangeSelectItems() {
		return `${util.url.base.buildingServer}/api/showHouse/PriceRangeSelectItems`;
	}
	/** 户型区间选择项目 */
	get housetypeSelectItems() {
		return `${util.url.base.buildingServer}/api/showHouse/HouseTypeSelectItems`;
	}
	/** 样板间详情 */
	get showHouseDetail() {
		return `${util.url.base.buildingServer}/api/showHouse/Detail`;
  }
  /** 收藏的样板间 */
	get collectPagerQuery() {
		return `${util.url.base.buildingServer}/api/showHouse/collectPagerQuery`;
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
  get login() {
    return `${util.url.base.customerServer}/api/Customer/Login`;
  }

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

  /**  获取Uuid */
  get getUuid() {
    return `${util.url.base.customerServer}/api/customer/getUuid`;
  }

  /**獲取客戶信息 */
  get getCustomerInfo() {
    return `${util.url.base.customerServer}/api/customer/LoginCustomer`;
  }
  /**更新客户信息 */
  get saveCustomerInfo() {
    return `${util.url.base.customerServer}/api/customer/Save`;
  }

  /**社區/案例  添加*/
  get sendCommunity() {
    return `${util.url.base.customerServer}/api/Community`;
  }
  /**获取社区、案例 */
  get communityPagerQuery() {
    return `${util.url.base.customerServer}/api/Community`;
  }
  /**删除社区、案例 */
  get deleteCommunity() {
    return `${util.url.base.customerServer}/api/Community/Delete`;
  }

   /**创建意见反馈 */
   get feedbackCreate() {
    return `${util.url.base.customerServer}/api/Feedback`;
  }

  /**互动添加 */
	get interactionAdd() {
		return `${util.url.base.customerServer}/api/CommonInteraction/add`;
	}

	/**互动删除 */
	get interactionDelete() {
		return `${util.url.base.customerServer}/api/CommonInteraction/delete`;
  }
  
  /**搜索记录基础 */
	get searchRecodeBase(){
		return `${util.url.base.customerServer}/api/searchRecode`;
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
  common: new CommonUrl(),
  diy: new DiyUrl(),
  product: new ProductUrl(),
  customer: new CustomerUrl(),
  setDb: new SetDb()
};

export default url;
