const userLogin = (selectName, params, conn) => {
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

const addUser = (sql, params, conn) => {
    return new Promise((resolve, reject) => {
        conn.query(sql, [params.loginid, params.username, params.password, params.repeatpass,
            params.sex, params.phone, params.email, params.card, params.login_id
            ], (error, result) => {
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
            sql_modify += " password = " + "'" + params.password + "'" + ", repeatpass = " + "'" + params.repeatpass + "'" +
                " where " + params.from + " = " + "'" + params.phone + "'";
        }
        console.log(sql_modify);
        conn.query(sql_modify, [params.password, params.repeatpass, params.from, params.phone], (error, result) => {
            if (error) {
                return reject(error)
            } else {
                return resolve(result)
            }
        })
    })
}
module.exports = {
    userLogin,
    addUser,
    modifyPassword
}