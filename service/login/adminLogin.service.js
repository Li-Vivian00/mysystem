// import { adminLoginRep } from "../../repositories/login/adminLogin.rep.js"
const adminLoginRep = require('../../repositories/login/adminLogin.rep.js')

const adminLogin = async (selectName, params, conn) => {
    const result = await adminLoginRep.adminLogin(selectName, params, conn)
    const resultArray = result[0]
    if (resultArray === undefined || resultArray === '' || resultArray === 0) {
        return '-1'
    } else {
        if (resultArray.password === params.password) {
            return result
        } else {
            return '0'
        }
    }
}

module.exports = {
    adminLogin
}