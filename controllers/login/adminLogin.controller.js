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
    const result = await adminLoginService.adminLogin(selectName, params, conn)
    jsonWrite(res, result)
  } catch (error) {
    console.log(error)
  }
});

//获取登录管理员信息
router.get('/getAdminInfo', async (req, res) => {
  const selectName = $sql.admininfo.select_name;
  const params = req.query.adminLoginId;
  console.log(params)
  try {
    const result = await adminLoginService.getAdminInfo(selectName, params, conn)
    console.log(result)
    jsonWrite(res, result)
  } catch (error) {
    console.log(error)
  }

});


//更改密码
router.post('/modifyPassword', async  (req, res) => {
  const sql_modify = $sql.admininfo.update_admin;
  const params = req.body;
  try {
    const result =  await adminLoginService.modifyPassword(sql_modify, params, conn)
    console.log(result)
    jsonWrite(res, result)
  } catch (error) {
    console.log(error)
  }

});

//验证是否已存在phone
router.get('/getAdminPhone', async (req, res) => {
  const selectName = $sql.admininfo.select_name;
  const params = req.query;
  console.log(params)
  try {
    const result = await adminLoginService.getAdminPhone(selectName, params, conn)
    console.log(result)
    jsonWrite(res, result)
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;