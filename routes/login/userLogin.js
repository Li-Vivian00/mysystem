var express = require('express');
var router = express.Router();
var models = require('../../sqlInfo/db');
var mysql = require('mysql');
var $sql = require('../../sqlInfo/sqlMap');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

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

//查找用户接口
router.post('/login', (req, res) => {
  var selectName = $sql.userinfo.select_name;
  var params = req.body;
  console.log(params);
  if (params.loginId) {
    selectName += " where loginid ='" + params.loginId + "'";
  }
  conn.query(selectName, params.loginId, function (err, result) {
    if (err) {
      console.log(err);
    }
    //   console.log(JSON.stringify(result))
    console.log(result)
    if (result[0] === undefined || result[0] === '' || result[0] === 0) {
      res.send('-1')
    } else {
      var resultArray = result[0];
      if (resultArray.password === params.password) {
        console.log(resultArray.password)
        jsonWrite(res, result);
      } else {
        res.send('0') //wrong pwd
      }
    }
  })
});

//   var dateStr = function(str) {
//     return new Date(str.slice(0,7));
// }

// 增加用户接口
router.post('/addUser', (req, res) => {
  var sql = $sql.userinfo.add;
  var params = req.body;
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
  var sql_name = $sql.userinfo.select_name;
  var params = req.query.userLoginId;
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
  var sql_modify = $sql.user.update_user;
  var params = req.body;
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