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
router.post('/addUser', async (req, res) => {
  const sql = $sql.userinfo.add;
  const params = req.body;
  console.log(params)
  try {
    const result = await userLoginService.addUser(sql, params, conn)
    jsonWrite(res, result);
  } catch (error) {
    console.log(error);
  }
});

//验证是否已存在loginid
router.get('/getUserLoginid', async (req, res) => {
  const selectName = $sql.userinfo.select_name;
  const params = req.query;
  console.log(params)
  try {
    const result = await userLoginService.getUserLoginid(selectName, params, conn)
    console.log(result)
    jsonWrite(res, result)
  } catch (error) {
    console.log(error)
  }
});

//验证是否已存在phone
router.get('/getUserPhone', async (req, res) => {
  const selectName = $sql.userinfo.select_name;
  const params = req.query;
  console.log(params)
  try {
    const result = await userLoginService.getUserPhone(selectName, params, conn)
    console.log(result)
    jsonWrite(res, result)
  } catch (error) {
    console.log(error)
  }
});

//更改密码
router.post('/modifyPassword', async (req, res) => {
  const sql_modify = $sql.userinfo.update_user;
  const params = req.body;
  try {
    const result =  await userLoginService.modifyPassword(sql_modify, params, conn)
    console.log(result)
    jsonWrite(res, result)
  } catch (error) {
    console.log(error)
  }
});
module.exports = router;