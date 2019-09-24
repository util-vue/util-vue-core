import { util } from "./../../index.js";
import { plus } from "./index.js";

/** plus工具类 */
export class Helper {
  /** 是否启用了Plus */
  isOpen() {
    if (plus) return true;
    return false;
  }
}
