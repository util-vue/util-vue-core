import { util } from "./../../index.js";
/**
 * sqllite数据库操作
 */
export class SqlLite {

    /**
     * 下载文件
     * @param {远程地址} url 
     * @param {回调方法} success 
     * @param {错误回调} error 
     */
    updateDb(url, success, error) {
        var _self = this;
        var path = util.url.setDb.caheDb;
        var newPath = util.url.setDb.newDb;
        var dbName = util.url.setDb.dbName;
        var urlFile = util.url.base.parseURL(url);
        util.downloder.download(url, function (file) {
            util.plus.io.isExistFile(newPath + dbName, function (d) {
                if (d) {
                    _self.deleteFile(dbName, newPath, function () {
                        _self.moveFile(path + urlFile.file, newPath, dbName, function (d) {
                            if (success)
                                success(d)
                        }, function (e) {
                            if (error)
                                error(e);
                        });
                    })
                } else {
                    _self.moveFile(path + urlFile.file, newPath, dbName, function (d) {
                        if (success)
                            success(d)
                    }, function (e) {
                        if (error)
                            error(e);
                    });
                }
            })
        }, null, function (e) {
            if (error)
                error(e);
        }, path);
    }

    /**
     * 删除下载的数据库文件
    */
    deleteFile(fileName, path, success, error) {
        util.plus.io.getFileEntry(path + fileName, function (f) {
            util.plus.io.removeFile(f, function (d) {
                if (success)
                    success(d);
            }, function (e) {
                if (error)
                    error(e);
            })
        }, function (e) {
            if (error)
                error(e);
        });
    }

    /**
     * 移动数据库文件
     */
    moveFile(oldFileName, newPath, newName, success, error) {
        util.plus.io.getFileEntry(oldFileName, function (fileEntry) {
            util.plus.io.openOrCrateFolder(newPath, plus.io.PRIVATE_DOC, function () {
                util.plus.io.getFileEntry(newPath, function (fileEntrys) {
                    fileEntry.moveTo(fileEntrys, newName, function (entry) {
                        if (success)
                            success(entry.fullPath);
                    }, function (e) {
                        if (error)
                            error(e);
                    });
                });
            })

        }, function (e) {
            if (error)
                error(e);
        });
    }

    /**
     * 解压压缩包
     * @param {压缩包路径} zip 
     * @param {解压路径} unzip 
     * @param {回调成功方法} success 
     * @param {回调失败方法} error 
     */
    doDecompress(zip, unzip, success, error) {
        plus.zip.decompress(zip, unzip, function () {
            if (success)
                success(unzip);
        }, function (e) {
            if (error)
                error(e.message)
        });
    }


    /**
     * 清空数据/文件
     * @param {文件路径} path  //_downloads/
     * @param {回调方法} callBack 
     */
    clear(path, callBack) {
        plus.io.resolveLocalFileSystemURL(path, function (entry) {
            entry.removeRecursively();
            if (callBack)
                callBack(true)
        }, function () {
            if (callBack)
                callBack(false)
        });
    }

    /**
     * 打开数据库
     * @param {数据库名字} dbName 
     * @param {数据库地址} dbPath 
     * @param {回调方法} callBack 
     */
    openDb(dbName, dbPath, callBack) {
        plus.sqlite.openDatabase({
            name: dbName,
            path: dbPath,
            success: function (e) {
                if (callBack)
                    callBack(true)
            },
            fail: function (e) {
                if (callBack)
                    callBack(false)
            }
        });
    }

    /**
     * 执行查询的SQL语句
     * @param {数据库名字} dbName 
     * @param {sql查询语句} selectSql 
     * @param {回调方法} success
     * @param {回调方法} error
     */
    selectSql(dbName, selectSql, success, error) {
        var _self = this;
        this.openDb(util.url.setDb.databaseName, util.url.setDb.newDb + util.url.setDb.dbName, function (data) {
            console.log("数据库打开成功");
            plus.sqlite.selectSql({
                name: dbName,
                sql: selectSql,
                success: function (data) {
                    if (success)
                        success(data);
                    _self.closeDb(util.url.setDb.databaseName);
                },
                fail: function (e) {
                    if (error)
                        error(e);
                    _self.closeDb(util.url.setDb.databaseName);
                }
            });
        }, function (e) {
            if (error)
                error(e);
        });

    }


    /**
     *  执行增删改等操作的SQL语句
     * @param {数据库名字} dbName 
     * @param {sql语句} sql 
     * @param {回调方法} callBack
     */
    executeSql(dbName, sql, callBack) {
        this.openDb(util.url.setDb.databaseName, util.url.setDb.newDb + util.url.setDb.dbName, function (data) {
            plus.sqlite.executeSql({
                name: dbName,
                sql: sql,
                success: function (data) {
                    if (callBack)
                        callBack(true);
                    _self.closeDb(util.url.setDb.databaseName);
                },
                fail: function (e) {
                    if (callBack)
                        callBack(e);
                    _self.closeDb(util.url.setDb.databaseName);
                }
            })
        }, function (e) {
            if (callBack)
                callBack(e);
        });
    }

    /**
     * 关闭数据库
     * @param {数据库名字} dbName  
     * @param {回调方法} callBack
     */
    closeDb(dbName, callBack) {
        plus.sqlite.closeDatabase({
            name: dbName,
            success: function (e) {
                if (callBack)
                    callBack(true)
            },
            fail: function (e) {
                if (callBack)
                    callBack(false)
            }
        });
    }

} 
