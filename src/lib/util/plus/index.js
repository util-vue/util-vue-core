import { IO } from "./io/io";
import { Helper } from "./helper";
import { SqlLite } from "./sqlite/sqllite";
import { Events } from "./events/events";
var staticPlus = {
  helper: new Helper(),
  io: new IO(),
  sqllite: new SqlLite(),
  events: new Events()
};

export { staticPlus as plus };
