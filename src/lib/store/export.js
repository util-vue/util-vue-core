import user from "./system/user";
import building from "./building/building";
import common from "./common/common";
import diyHouseType from "./diy/diyHouseType";
import product from "./product/product";
import customer from "./customer/customer";
import productSqlLite from "./product/product-sqllite";
import articleSqlLite from "./article/article-sqllite";
import area from "./common/area";
var stores = {
  user,
  common,
  building,
  diyHouseType,
  product,
  customer,
  articleSqlLite,
  productSqlLite,
  area
};

export const store = stores;
