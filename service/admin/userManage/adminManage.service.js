const adminManageRep = require('../../../repositories/admin/userManage/adminManage.rep')


const getAllAdminInfo = async (selectName, params, conn) => {
    const result = await adminManageRep.getAllAdminInfo(selectName, params, conn)
    const resultArray = result[0]
    if (resultArray === undefined) {
        return '获取用户信息失败'
    } else {
        return result
    }
}

const getOneAdminInfo = async (selectName, id, name, conn) => {
    const result = await adminManageRep.getOneAdminInfo(selectName, id, name, conn)
    const resultArray = result[0]
    if (resultArray === undefined || resultArray === '' || resultArray === null || result[0] === []) {
        return "无该用户信息"
    } else {
        return result
    }
}

const updateAdmin = async (updateUser,params, conn) => {
    const result = await adminManageRep.updateAdmin(updateUser,params, conn)
    if (result.affectedRows === undefined || result.affectedRows === '' || result.affectedRows === 0) {
        return '更新失败，请联系管理员'
    } else {
        return result
    }
}

const deleteAdmin = async (sqlDelete,params, conn) => {
    const result = await adminManageRep.deleteAdmin(sqlDelete,params, conn)
    if (result.affectedRows === undefined || result.affectedRows === '' || result.affectedRows === 0) {
        return '删除用户失败'
    } else {
        return result
    }
}
module.exports = {
    getAllAdminInfo,
    getOneAdminInfo,
    updateAdmin,
    deleteAdmin
}