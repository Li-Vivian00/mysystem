var express = require('express');
var router = express.Router();
var models = require('../../../sqlInfo/db');
var mysql = require('mysql');
var $sql = require('../../../sqlInfo/sqlMap');


// 连接数据库
let conn = mysql.createConnection(models.mysql);

conn.connect();
let jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

//获取管理员信息
router.get('/getAdmin', (req, res) => {
  let selectName = $sql.admininfo.select_name;
  let params = req.query.name;
  conn.query(selectName, params, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result[0] === undefined) {
      res.send('-1') 
    } else {
      jsonWrite(res, result);
    }
  })
});

//获取单个管理员信息
router.get('/getOneAdmin', (req, res) => {
  let selectName = $sql.admininfo.select_name;
  let id = req.query.id;
  let name = req.query.name
  if (id) {
    selectName += " where " + id + " = " + name
  }
  conn.query(selectName, [id,name], function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result[0] === undefined || result[0] === ''|| result[0] === null || result[0] === []) {
      res.send("无该用户信息")
    } else {
      jsonWrite(res, result);
    }
  })
});

//更新管理员信息
router.post('/updateAdmin', (req, res) => {
  let updateUser = $sql.admininfo.update_admin;
  let params = req.body;
  if (params.adminname) {
    updateUser += " password = '" + params.password + "', email = '" + params.email + "', adminname = '" + params.adminname + "', phone = '" + params.phone + "', card = '" + params.card + "' where loginid = '" + params.loginid + "'";

  }
  conn.query(updateUser, params.adminname, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.affectedRows === undefined || result.affectedRows === '' || result.affectedRows === 0) {
      res.send('更新失败，请联系管理员')
    } else {
      res.send('ok');
    }
  })
});

//删除管理员
router.post('/deleteAdmin', (req, res) => {
  let sqlDelete = $sql.admininfo.deleteAdmin;
  let params = req.body;
  if (params.id) {
    sqlDelete += "where id = " + params.id
  }
  conn.query(sqlDelete, params.id, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.affectedRows === undefined || result.affectedRows === '' || result.affectedRows === 0) {
      res.send('删除用户失败')
    } else {
      res.send('ok');
    }
  })
})

//批量删除管理员
router.post('/batchDeleteAdmin', (req, res) => {
  let sqlDelete = $sql.admininfo.deleteAdmin;
  let params = req.body;
  if (params.id) {
    sqlDelete += "where id in (" + params.id
  }
  conn.query(sqlDelete, params.id, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.affectedRows === undefined || result.affectedRows === '' || result.affectedRows === 0) {
      res.send('删除用户失败')
    } else {
      res.send('ok');
    }
  })
})

module.exports = router;