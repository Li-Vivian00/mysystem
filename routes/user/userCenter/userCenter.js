var express = require('express');
var router = express.Router();
var models = require('../../../sqlInfo/db');
var mysql = require('mysql');
var $sql = require('../../../sqlInfo/sqlMap');
// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

// 增加用户接口
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    conn.query(sql, [params.username, params.password], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            // console.log(result)
            jsonWrite(res, result);
        }
    })
});

//查找用户接口
router.post('/login', (req, res) => {
    var selectName = $sql.user.selectName;
    var params = req.body;
    console.log(params);
    if (params.username) {
        selectName += " where username ='" + params.username + "'";
    }
    conn.query(selectName, params.username, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(JSON.stringify(result))

        if (result[0] === undefined) {
            res.send('-1') //查询不出username，data 返回-1
        } else {
            var resultArray = result[0];
            console.log(resultArray.password);
            if (resultArray.password === params.password) {
                jsonWrite(res, result);
            } else {
                res.send('0') //wrong pwd
            }
        }
    })
});

//获取用户信息
router.post('/getUser', (req, res) => {
    var selectName = $sql.user.selectName;
    // var sql_password = $sql.user.select_password;
    var params = req.body;
    console.log(params);
    if (params.username) {
        selectName += " where username ='" + params.username + "'";
    }
    conn.query(selectName, params.username, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        if (result[0] === undefined) {
            res.send('-1') //查询不出username，data 返回-1
        } else {
            console.log(result)
            jsonWrite(res, result);
        }
    })
});

//更新用户信息
router.post('/updateUser', (req, res) => {
    var updateUser = $sql.user.updateUser;
    var params = req.body;
    console.log(params);
    if (params.id) {
        updateUser += " username = '" + params.username +
            "' where id ='" + params.id + "'";
    }
    conn.query(updateUser, params.username, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        if (result.affectedRows === undefined || result.affectedRows === '' || result.affectedRows === 0) {
            res.send('更新失败，请联系管理员') //查询不出username，data 返回-1
        } else {
            res.send('ok');
        }
    })
});

//更改密码
router.post('/modifyPassword', (req, res) => {
    var sql_modify = $sql.user.updateUser;
    var params = req.body;
    console.log(params);
    if (params.id) {
        sql_modify += " password = '" + params.password +
            "' where id ='" + params.id + "'";
    }
    conn.query(sql_modify, params.id, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        if (result.affectedRows === undefined || result.affectedRows === '' || result.affectedRows === 0) {
            res.send('修改密码失败，请联系管理员') //查询不出username，data 返回-1
        } else {
            res.send('ok');
        }
    })
});

//删除用户
router.post('/deleteUser', (req, res) => {
    var sqlDelete = $sql.user.deleteUser;
    var params = req.body;
    console.log(params.id)
    conn.query(sqlDelete, params.id, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        // if (result) {
        //   jsonWrite(res, result);
        // } else {
        //   res.send('删除用户失败')
        // }
        if (result.affectedRows === undefined || result.affectedRows === '' || result.affectedRows === 0) {
            res.send('删除用户失败') //查询不出username，data 返回-1
        } else {
            res.send('ok');
        }
    })
})
module.exports = router;