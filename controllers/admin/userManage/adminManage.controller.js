const express = require('express');
const router = express.Router();
const models = require('../../../sqlInfo/db');
const mysql = require('mysql');
const $sql = require('../../../sqlInfo/sqlMap');

const adminManageService = require('../../../service/admin/userManage/adminManage.service.js')
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

//获取所有管理员信息
router.get('/getAdmin', async (req, res) => {
  const selectName = $sql.admininfo.select_name;
  const params = req.query.name;
  try {
    const result = await adminManageService.getAllAdminInfo(selectName, params, conn)
    jsonWrite(res, result)
  } catch (error) {
    console.log(error)
  }
});

//获取单个管理员信息
router.get('/getOneAdmin', async (req, res) => {
  const selectName = $sql.admininfo.select_name;
  const id = req.query.id;
  const name = req.query.name
  try {
    const result = await adminManageService.getOneAdminInfo(selectName, id, name, conn)
    jsonWrite(res,result)
  } catch (error) {
    console.log(error)
  }
});

//更新管理员信息
router.post('/updateAdmin', async (req, res) => {
  const updateUser = $sql.admininfo.update_admin;
  const params = req.body;
  try {
    const result = await adminManageService.updateAdmin(updateUser,params, conn)
    jsonWrite(res,result)
  } catch (error) {
    console.log(error)
  }
});

//删除管理员
router.post('/deleteAdmin', async (req, res) => {
  const sqlDelete = $sql.admininfo.deleteAdmin;
  const params = req.body;
  try {
    const result = await adminManageService.deleteAdmin(sqlDelete,params, conn)
    jsonWrite(res,result)
  } catch (error) {
    console.log(error)
  }
})


module.exports = router;