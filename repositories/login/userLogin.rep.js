const userLogin = (selectName, params, conn) => {
    return new Promise((resolve, reject) => {
        if (params.loginId) {
            selectName += " where loginid ='" + params.loginId + "'";
        }
        conn.query(selectName, params.loginId, (error, result) => {
            if (error) {
                return reject(error)
            } else {
                return resolve(result)
            }
        })
    })
}

module.exports = {
    userLogin
}