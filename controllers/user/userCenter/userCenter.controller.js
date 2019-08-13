const express = require('express');
const router = express.Router();
const models = require('../../../sqlInfo/db');
const mysql = require('mysql');
const $sql = require('../../../sqlInfo/sqlMap');
// 连接数据库
const conn = mysql.createConnection(models.mysql);

conn.connect();
const jsonWrite = function (res, ret) {
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
    const sql = $sql.user.add;
    const params = req.body;
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
    const selectName = $sql.user.selectName;
    const params = req.body;
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
            const resultArray = result[0];
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
    const selectName = $sql.user.selectName;
    // const sql_password = $sql.user.select_password;
    const params = req.body;
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
    const updateUser = $sql.user.updateUser;
    const params = req.body;
    console.log(params);
    if (params.id) {
        updateUser += " username = '" + params.username +
            "' where id ='" + params.id + "'";
    }
    conn.query(updateUser, params.username, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result.affectedRows === undefined || result.affectedRows === '' || result.affectedRows === 0) {
            res.send('更新失败，请联系管理员') //查询不出username，data 返回-1
        } else {
            res.send('ok');
        }
    })
});

//更改密码
router.post('/modifyPassword', (req, res) => {
    const sql_modify = $sql.user.updateUser;
    const params = req.body;
    if (params.id) {
        sql_modify += " password = '" + params.password +
            "' where id ='" + params.id + "'";
    }
    conn.query(sql_modify, params.id, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result.affectedRows === undefined || result.affectedRows === '' || result.affectedRows === 0) {
            res.send('修改密码失败，请联系管理员') //查询不出username，data 返回-1
        } else {
            res.send('ok');
        }
    })
});

//删除用户
router.post('/deleteUser', (req, res) => {
    const sqlDelete = $sql.user.deleteUser;
    const params = req.body;
    conn.query(sqlDelete, params.id, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result.affectedRows === undefined || result.affectedRows === '' || result.affectedRows === 0) {
            res.send('删除用户失败') //查询不出username，data 返回-1
        } else {
            res.send('ok');
        }
    })
})
module.exports = router;