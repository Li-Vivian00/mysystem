const express = require('express');
const router = express.Router();
const models = require('../../sqlInfo/db');
const mysql = require('mysql');
const $sql = require('../../sqlInfo/sqlMap');

const adminLoginService = require('../../service/login/adminLogin.service')

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

//管理员接口、登录
router.post('/adminlogin', async (req, res) => {
  const selectName = $sql.admininfo.select_name;
  const params = req.body;
  try {
    const result = await adminLoginService.adminLogin(selectName,params, conn)
    jsonWrite(res, result)
  } catch (error) {
    console.log(error)
  }
});

//获取管理员信息
router.get('/getAdminInfo', (req, res) => {
  const sql_name = $sql.admininfo.select_name;
  const params = req.query.name;
  sql_name += " where loginid = '" + params + "'";
  conn.query(sql_name, params, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result);
    if (result === undefined || result === '' || result === 0) {
      res.send('-1')
    } else {
      jsonWrite(res, result);
    }
  })
});


//更改密码
router.post('/modifyPassword', (req, res) => {
  const sql_modify = $sql.admininfo.update_user;
  const params = req.body;
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

module.exports = router;