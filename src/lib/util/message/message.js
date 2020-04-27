import { util } from "./../index";

export class Message {
  /** 弹出提示消息 */
  alert(msg) {
    util.f7.f7App.dialog.alert(msg, "提示");
  }

  /** 消息提示 */
  toast(msg, callback) {
    util.f7.f7App.toast
      .create({
        text: msg,
        position: "center",
        closeTimeout: 2000,
        on: {
          closed: callback
        }
      })
      .open();
  }

  /** 确认框 */
  confirm(msg, callBack, noCallBack) {
    util.f7.f7App.dialog.confirm(msg, "询问", callBack, noCallBack);
  }

  /** 单文本输入框 */
  prompt(title, msg, callBack, noCallBack, defaultValue) {
    util.f7.f7App.dialog.prompt(msg, title, callBack, noCallBack, defaultValue);
  }
}
