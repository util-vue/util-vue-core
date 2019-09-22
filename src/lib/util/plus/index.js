import { IO } from "./io/io";
import { SqlLite } from "./sqlite/sqllite";
import { Events } from "./events/events";
var staticPlus = {
  io: new IO(),
  sqllite: new SqlLite(),
  events: new Events(),
};

export { staticPlus as plus };
