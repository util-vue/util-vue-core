import { util } from "./../index";
export class ActionSheet {
  open(btns) {
    var actions = util.f7.f7App.actions.create({
      buttons: [
        btns,
        [
          {
            text: "取消",
            color: "red"
          }
        ]
      ]
    });
    actions.open();
  }
}
