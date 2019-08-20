import user from "./system/user";
import building from "./building/building";
import common from "./common/common";
import diyHouseType from "./diy/diyHouseType";
import product from "./product/product";

var stores = {
  user,
  common,
  building,
  diyHouseType,
  product
};

export const store = stores;
