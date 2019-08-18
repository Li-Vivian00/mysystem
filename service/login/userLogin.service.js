const userLoginRep = require('../../repositories/login/userLogin.rep')



const userLogin = async (selectName, params, conn) => {
  const result = await userLoginRep.userLogin(selectName, params, conn)
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

const getUserLoginid = async (selectName, params, conn) => {
  const result = await userLoginRep.userLogin(selectName, params, conn)
  const resultArray = result[0]
  if (resultArray === undefined || resultArray === '' || resultArray === 0) {
    return 'success'
  } else {
    return 'loginid is exist'
  }
}

const getUserPhone = async (selectName, params, conn) => {
  const result = await userLoginRep.userLogin(selectName, params, conn)
  const resultArray = result[0]
  if (resultArray === undefined || resultArray === '' || resultArray === 0) {
    return 'success'
  } else {
    return 'phone is exist'
  }
}

const addUser = async (sql, params, conn) => {
  const result = await userLoginRep.addUser(sql, params, conn)
  if (result === undefined || result === '' || result === 0) {
    return 'fail to register'
  } else {
    return 'success'
  }
}

const modifyPassword =  async (sql_modify, params, conn) => {
  const result =  await userLoginRep.modifyPassword(sql_modify, params, conn)
  if (result.affectedRows === undefined || result.affectedRows === '' || result.affectedRows === 0) {
      return 'fail to update password'
  }
  else {
      return 'success'
  }
}


module.exports = {
  userLogin,
  getUserLoginid,
  getUserPhone,
  addUser,
  modifyPassword
}