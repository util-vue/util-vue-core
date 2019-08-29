/**
 * sqllite数据库操作
 */
export class SqlLite {

    /**
     * 下载文件
     * @param {远程地址} url 
     * @param {回调方法} callBack 
     */
    download(url, callBack) {
        var data = {}; //设置返回对象
        var dtask = plus.downloader.createDownload(url, {}, function (d, status) {
            // 下载完成 status =200完成
            if (status == 200) {
                data.filename = d.filename; //下载文件保存路径
                data.totalSize = d.totalSize; //文件的总大小
                data.downloadedSize = d.downloadedSize; //已完成下载文件的大小
            }
            data.status = status;
            if (callBack)
                callBack(data);
        });
        dtask.start();
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
     * @param {回调方法} callBack
     */
    selectSql(dbName, selectSql, callBack) {
        plus.sqlite.selectSql({
            name: dbName,
            sql: selectSql,
            success: function (data) {
                if (callBack)
                    callBack(data);
            },
            fail: function (e) {
                if (callBack)
                    callBack(e);
            }
        });
    }


    /**
     *  执行增删改等操作的SQL语句
     * @param {数据库名字} dbName 
     * @param {sql语句} sql 
     * @param {回调方法} callBack
     */
    executeSql(dbName, sql, callBack) {
        plus.sqlite.executeSql({
            name: dbName,
            sql: sql,
            success: function (data) {
                if (callBack)
                    callBack(true);
            },
            fail: function (e) {
                if (callBack)
                    callBack(e);
            }
        })
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
