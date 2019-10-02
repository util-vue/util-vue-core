import { IO } from "./io/io";
import { Helper } from "./helper";
import { SqlLite } from "./sqlite/sqllite";
import { Events } from "./events/events";
import { Camera } from "./camera/util.camera";
var staticPlus = {
  helper: new Helper(),
  io: new IO(),
  sqllite: new SqlLite(),
  events: new Events(),
  camera: new Camera()
};

export { staticPlus as plus };
