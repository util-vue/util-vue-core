import { util } from "./../../index.js";
//调用相机  - hbuiler 环境
export class Camera {
    open(callback) {
        var cmr = plus.camera.getCamera();
        cmr.captureImage(function (path) {
            plus.gallery.save(path);
            callback(path);
        }, function (e) {

        }, {
                filename: "_doc/gallery/",
                index: 1
            });
    }

    /**
     * 上传
     */
    upload(callback) {
        this.open((file) => {
            util.httpClient.uploadByPlus([file], result => {
                if (callback)
                    callback(result);
            })
        })
    }



    
    single(callback) {
        plus.gallery.pick(function (path) {
            callback(path);
        }, function (e) {

        }, {
                filter: "image"
            });
    }

    multiple(maxImage,callback) {
        plus.gallery.pick(function (e) {
            if (callback)
                callback(e.files);
        }, function (e) {

        }, {
                filter: "image",
                multiple: true,
                maximum: maxImage,
                system: false,
                onmaxed: function (e) {
                    plus.nativeUI.alert('最多只能选择'+maxImage+'张图片');
                }
            });
    }

    uploadSingle(callback) {
        this.single(file => {
            util.httpClient.uploadByPlus([file], result => {
                if (callback)
                    callback(result);
            })
        })
    }

    uploadMultiple(maxImage,callback) {
        this.multiple(maxImage,files => {
            util.httpClient.uploadMultipleByPlus(files, result => {
                if (callback)
                    callback(result);
            })
        })
    }


}