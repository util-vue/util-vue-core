import { IO } from "./io/io";
import { SqlLite } from "./sqlite/sqllite";
var staticPlus = {
  io: new IO(),
  sqllite: new SqlLite()
};

export { staticPlus as plus };
