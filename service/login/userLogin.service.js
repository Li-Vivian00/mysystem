const userLoginRep = require('../../repositories/login/userLogin.rep')



const userLogin = async (selectName,params,conn) => {
    const result = await userLoginRep.userLogin(selectName,params,conn)
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

module.exports={
    userLogin
}