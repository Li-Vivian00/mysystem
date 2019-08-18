const getAllUserInfo = (selectName, params, conn) => {
    return new Promise((resolve, reject) => {
        conn.query(selectName, params, function (error, result) {
            if (error) {
                return reject(error)
            } else {
                return resolve(result)
            }
        })
    })
}

const getOneUserInfo = (selectName, id, name, conn) => {
    return new Promise((resolve, reject) => {
        if (id) {
            selectName += " where " + id + " = " + "'" + name + "'"
        }
        conn.query(selectName, [id, name], function (error, result) {
            if (error) {
                return reject(error)
            } else {
                return resolve(result)
            }
        })
    })
}

const deleteUser = (sqlDelete, params, conn) => {
    return new Promise((resolve, reject) => {
        if (params.Id) {
            sqlDelete += "where id  in (" + params.Id + ")"
        }
        conn.query(sqlDelete, params.Id, function (error, result) {
            if (error) {
                return reject(error)
            } else {
                return resolve(result)
            }
        })
    })
}

const updateUser = (updateUser, params, conn) => {
    return new Promise((resolve, reject) => {
        if (params.username) {
            updateUser += " password = '" + params.password + "', email = '" + params.email + "', username = '" + params.username + "', phone = '" + params.phone + "', card = '" + params.card + "' where loginid = '" + params.loginid + "'";
          }
          conn.query(updateUser, params.username, function (error, result) {
            if (error) {
              return reject(error)
            }
            else {
                return resolve(result)
            }
        })
    })
}
module.exports = {
    getAllUserInfo,
    getOneUserInfo,
    deleteUser,
    updateUser
}