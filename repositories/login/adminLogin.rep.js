const adminLogin = (selectName, params, conn) => {
    return new Promise((resolve, reject) => {
        if (params.loginid) {
            selectName += " where " + params.from + " = " + "'" + params.loginid + "'";
        }
        conn.query(selectName, [params.from, params.loginid], (error, result) => {
            if (error) {
                return reject(error)
            } else {
                return resolve(result)
            }
        })
    })
}

const modifyPassword = (sql_modify, params, conn) => {
    return new Promise((resolve, reject) => {
        if (params.phone) {
            sql_modify += " password = " + "'" + params.password + "'" +
                " where " + params.from + " = " + "'" + params.phone + "'";
        }
        console.log(sql_modify);
        conn.query(sql_modify, [params.password, params.from, params.phone], (error, result) => {
            if (error) {
                return reject(error)
            } else {
                return resolve(result)
            }
        })
    })
}

const getAdminInfo = (selectName, params, conn) => {
    return new Promise((resolve, reject) => {
        selectName += " where loginid = '" + params + "'";
        console.log(selectName)
        conn.query(selectName, params, function (error, result) {
            if (error) {
                return reject(error)
            } else {
                return resolve(result)
            }
        })
    })
}
module.exports = {
    adminLogin,
    modifyPassword,
    getAdminInfo
}