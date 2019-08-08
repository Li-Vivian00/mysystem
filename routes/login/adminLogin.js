var express = require('express');
var router = express.Router();
var models = require('../../sqlInfo/db');
var mysql = require('mysql');
var $sql = require('../../sqlInfo/sqlMap');

/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
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

//管理员接口、登录
router.post('/adminlogin', (req, res) => {
  var selectName = $sql.admininfo.select_name;
  var params = req.body;
  if (params.loginId) {
    selectName += " where loginid ='" + params.loginId + "'";
  }
  conn.query(selectName, params.loginId, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result[0] === undefined || result[0] === '' || result[0] === 0) {
      res.send('-1')
    } else {
      var resultArray = result[0];
      if (resultArray.password === params.password) {
        jsonWrite(res, result);
      } else {
        res.send('0') 
      }
    }
  })
});

//获取管理员信息
router.get('/getAdminInfo', (req, res) => {
  var sql_name = $sql.admininfo.select_name;
  var params = req.query.name;
  sql_name += " where loginid = '"+ params +"'";
  conn.query(sql_name, params, function(err, result) {
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
var sql = $sql.admininfo.add;
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

//更改密码
router.post('/modifyPassword', (req, res) => {
var sql_modify = $sql.admininfo.update_user;
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
    res.send('修改密码失败，请联系管理员')   //查询不出username，data 返回-1
  } else {
    res.send('ok');
  }
})
});

module.exports = router;