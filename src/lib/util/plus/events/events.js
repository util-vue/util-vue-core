import { util } from "./../../index.js";
/**
 * Events模块管理客户端事件
 */
export class Events {
     onNetChange(callback){
        var nt = plus.networkinfo.getCurrentType();
        switch (nt){
            case plus.networkinfo.CONNECTION_ETHERNET:
            case plus.networkinfo.CONNECTION_WIFI:
              if(callback)
                callback(true); 
            break; 
            case plus.networkinfo.CONNECTION_CELL2G:
            case plus.networkinfo.CONNECTION_CELL3G:
            case plus.networkinfo.CONNECTION_CELL4G:
              if(callback)
                callback(true); 
            break; 
            default:
              if(callback)
                callback(false); 
            break;
        }
    }
} 
