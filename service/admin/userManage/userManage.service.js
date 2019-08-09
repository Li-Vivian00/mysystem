const userManageRep = require('../../../repositories/admin/userManage/userManage.rep')

const getAllUserInfo = async (selectName, params, conn) => {
    const result = await userManageRep.getAllUserInfo(selectName, params, conn)
    const resultArray = result[0]
    if (resultArray === undefined) {
        return '获取用户信息失败'
      } else {
        return result
      }
}

const getOneUserInfo = async (selectName,id,name,conn) => {
    const result = await userManageRep.getOneUserInfo(selectName,id,name,conn)
    const resultArray = result[0]
    if (resultArray === undefined || resultArray === '' || resultArray === null || resultArray === []) {
        return '无该用户信息'
      } else {
        return result
      }
}

const deleteUser = async (sqlDelete, params, conn) => {
    const result = await userManageRep.deleteUser(sqlDelete, params, conn)
    if (result.affectedRows === undefined || result.affectedRows === '' || result.affectedRows === 0) {
        return '删除用户失败'
      } else {
        return result
      }
}

const updateUser = async (updateUser, params, conn) =>{
    const result =await userManageRep.updateUser(updateUser, params, conn)
    if (result.affectedRows === undefined || result.affectedRows === '' || result.affectedRows === 0) {
        return '更新用户失败'
      } else {
        return result
      }
}
module.exports = {
    getAllUserInfo,
    getOneUserInfo,
    deleteUser,
    updateUser
}