import user from "./system/user";
import building from "./building/building";
import common from "./common/common";
import diyHouseType from "./diy/diyHouseType";
import product from "./product/product";
import productSqlLite from "./product/product-sqllite";
import articleSqlLite from "./article/article-sqllite";
var stores = {
  user,
  common,
  building,
  diyHouseType,
  product,
  articleSqlLite,
  productSqlLite
};

export const store = stores;
