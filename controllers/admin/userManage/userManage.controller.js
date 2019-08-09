const express = require('express');
const router = express.Router();
const models = require('../../../sqlInfo/db');
const mysql = require('mysql');
const $sql = require('../../../sqlInfo/sqlMap');

const userManageService = require('../../../service/admin/userManage/userManage.service')

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

//获取所有用户信息
router.get('/getUser', async (req, res) => {
  const selectName = $sql.userinfo.select_name;
  const params = req.query.name;
  try {
    const result = await userManageService.getAllUserInfo(selectName, params, conn);
    jsonWrite(res, result)
  } catch (error) {
    console.log(error)
  }
});

//获取单个用户信息
router.get('/getOneUser', async (req, res) => {
  const selectName = $sql.userinfo.select_name;
  const id = req.query.id;
  const name = req.query.name
  try {
    const result = await userManageService.getOneUserInfo(selectName, id, name, conn)
    jsonWrite(res, result)
  } catch (error) {
    console.log(error)
  }

});

//更新用户信息
router.post('/updateUser', async (req, res) => {
  const updateUser = $sql.userinfo.update_user;
  const params = req.body;

  try {
    const result = await userManageService.updateUser(updateUser, params, conn);
    jsonWrite(res, result)
  } catch (error) {
    console.log(error)
  }
  
});

//删除用户
router.post('/deleteUser', async (req, res) => {
  const sqlDelete = $sql.admininfo.deleteUser;
  const params = req.body;
  try {
    const result = await userManageService.deleteUser(sqlDelete, params, conn);
    jsonWrite(res, result)
  } catch (error) {
    console.log(error)
  }
})



module.exports = router;