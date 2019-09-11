import user from "./system/user";
import building from "./building/building";
import common from "./common/common";
import diyHouseType from "./diy/diyHouseType";
import product from "./product/product";
import article from "./article/article";
var stores = {
  user,
  common,
  building,
  diyHouseType,
  product,
  article
};

export const store = stores;
