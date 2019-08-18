// import { adminLoginRep } from "../../repositories/login/adminLogin.rep.js"
const adminLoginRep = require('../../repositories/login/adminLogin.rep.js')

const adminLogin = async (selectName, params, conn) => {
    const result = await adminLoginRep.adminLogin(selectName, params, conn)
    const resultArray = result[0]
    if (resultArray === undefined || resultArray === '' || resultArray === 0) {
        return 'loginid not exist'
    } else {
        if (resultArray.password === params.password) {
            return result
        } else {
            return 'password not correct'
        }
    }
}

const modifyPassword =  async (sql_modify, params, conn) => {
    const result =  await adminLoginRep.modifyPassword(sql_modify, params, conn)
    if (result.affectedRows === undefined || result.affectedRows === '' || result.affectedRows === 0) {
        return 'fail to update password'
    }
    else {
        return 'success'
    }
}


const getAdminPhone = async (selectName, params, conn) => {
    const result = await adminLoginRep.adminLogin(selectName, params, conn)
    const resultArray = result[0]
    if (resultArray === undefined || resultArray === '' || resultArray === 0) {
      return 'phone is not exist'
    } else {
      return 'success'
    }
  }

const getAdminInfo = async (selectName, params, conn) => {
    const result = await adminLoginRep.getAdminInfo(selectName, params, conn)
    const resultArray = result[0]
    if (resultArray === undefined || resultArray === '' || resultArray === 0) {
      return 'fail to get admin info'
    } else {
      return resultArray
    }
}
module.exports = {
    adminLogin,
    modifyPassword,
    getAdminPhone,
    getAdminInfo
}