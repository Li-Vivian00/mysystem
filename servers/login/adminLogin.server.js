// import { adminLoginRep } from "../../repositories/login/adminLogin.rep.js"
const adminLoginRep = require('../../repositories/login/adminLogin.rep.js')

export const adminLoginServer = (selectName, loginId) => {
    return adminLoginRep(selectName, loginId)
}