const express = require('express');
const router = express.Router();
const models = require('../../sqlInfo/db');
const mysql = require('mysql');
const $sql = require('../../sqlInfo/sqlMap');

const adminLoginServer = require ('../../servers/login/adminLogin.server.js')
// import { adminLoginServer } from "../../servers/login/adminLogin.server.js"


/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });
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

//管理员接口、登录
router.post('/adminlogin', async (req, res) => {
  const selectName = $sql.admininfo.select_name;
  const params = req.body;
  if (params.loginId) {
    selectName += " where loginid ='" + params.loginId + "'";
  }
  try {
    const resultArray = await adminLoginServer(selectName, params.loginId)
    if (resultArray === undefined || resultArray === '' || resultArray === 0) {
      res.send('-1')
    } else {
      if (resultArray.password === params.password) {
        jsonWrite(res, result);
      } else {
        res.send('0')
      }
    }
  } catch (error) {

  }

  // conn.query(selectName, params.loginId, function (err, result) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   if (result[0] === undefined || result[0] === '' || result[0] === 0) {
  //     res.send('-1')
  //   } else {
  //     const resultArray = result[0];
  //     if (resultArray.password === params.password) {
  //       jsonWrite(res, result);
  //     } else {
  //       res.send('0') 
  //     }
  //   }
  // })
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



// 增加用户接口
router.post('/addUser', (req, res) => {
  const sql = $sql.admininfo.add;
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
      res.send('修改密码失败，请联系管理员')   //查询不出username，data 返回-1
    } else {
      res.send('ok');
    }
  })
});

module.exports = router;