const express = require('express');
const router = express.Router();
const models = require('../../sqlInfo/db');
const mysql = require('mysql');
const $sql = require('../../sqlInfo/sqlMap');

const userLoginService = require('../../service/login/userLogin.service')
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

//查找用户接口
router.post('/login', async (req, res) => {
  const selectName = $sql.userinfo.select_name;
  const params = req.body;
  try {
    const result = await userLoginService.userLogin(selectName, params, conn)
    jsonWrite(res, result)
  } catch (error) {
    console.log(error)
  }
});

//   const dateStr = function(str) {
//     return new Date(str.slice(0,7));
// }

// 增加用户注册接口
router.post('/addUser', (req, res) => {
  const sql = $sql.userinfo.add;
  const params = req.body;
  conn.query(sql, [params.loginId, params.name, params.pass, params.checkPass,
    params.sex, params.phone, params.email, params.card
  ], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result === undefined || result === '' || result === 0) {
      res.send('注册失败')
    } else {
      jsonWrite(res, result);
    }
  })
});

//获取用户信息
router.get('/getUser', (req, res) => {
  const sql_name = $sql.userinfo.select_name;
  const params = req.query.userLoginId;
  sql_name += " where loginid = '" + params + "'";
  conn.query(sql_name, params, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result === undefined || result === '' || result === 0) {
      res.send('-1')
    } else {
      jsonWrite(res, result);
    }
  })
});

//更改密码
router.post('/modifyPassword', (req, res) => {
  const sql_modify = $sql.user.update_user;
  const params = req.body;
  console.log(params);
  if (params.id) {
    sql_modify += " password = '" + params.pass +
      "',repeatPass = '" + params.checkPass +
      "' where id ='" + params.id + "'";
  }
  conn.query(sql_modify, params.id, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result);
    if (result.affectedRows === undefined || result.affectedRows === '' || result.affectedRows === 0) {
      res.send('-1') //查询不出username，data 返回-1
    } else {
      res.send('ok');
    }
  })
});
module.exports = router;