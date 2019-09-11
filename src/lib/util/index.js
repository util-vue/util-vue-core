import Vue from "vue";
import "./../plus-core/common";

import { Helper } from "./common/helper";
import url from "./base/url";
import { F7 } from "./base/f7";
import { Message } from "./message/message";
import { Downloder } from "./http/downloder"
import { GlobalHeader } from "./http/globalHeader";
import { HttpClient } from "./http/httpClient";
import { WebApi } from "./http/webapi";
import { Loading } from "./loading/loading";
import { store } from "./../store/export";
import { Storage } from "./../util/storage/storage";
import { ActionSheet } from "./../util/actions/actionSheet";
import { plus } from "./../util/plus/index";
import { QueryModel } from "./../util/common/pager";

var staticUtil = {
  helper: new Helper(),
  message: new Message(),
  globalHeader: new GlobalHeader(),
  loading: new Loading(),
  f7: new F7(),
  url: url,
  webApi: new WebApi(),
  storage: new Storage(),
  actionSheet: new ActionSheet(),
  store: store,
  downloder: new Downloder(),
  plus: plus
};

export { staticUtil as util, HttpClient, QueryModel };
