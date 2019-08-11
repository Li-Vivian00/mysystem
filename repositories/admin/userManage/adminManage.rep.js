const getAllAdminInfo = (selectName, params, conn) => {
    return new Promise((resolve, reject) => {
        conn.query(selectName, params, (error, result) => {
            if (error) {
                return reject(error)
            }
            else {
                return resolve(result)
            }
        })
    })
}

const getOneAdminInfo = (selectName, id, name, conn) => {
    return new Promise((resolve, reject) => {
        if (id) {
            selectName += " where " + id + " = " + name
        }
        conn.query(selectName, [id, name], (error, result) => {
            if (error) {
                return reject(error)
            }
            else {
                return resolve(result)
            }
        })
    })
}

const updateAdmin = (updateUser, params, conn) => {
    return new Promise((resolve, reject) => {
        if (params.adminname) {
            updateUser += " password = '" + params.password + "', email = '" + params.email + "', adminname = '" + params.adminname + "', phone = '" + params.phone + "', card = '" + params.card + "' where loginid = '" + params.loginid + "'";
        }
        conn.query(updateUser, params.adminname, (error, result) => {
            if (error) {
                return reject(error)
            }
            else {
                return resolve(result)
            }
        })
    })
}

const deleteAdmin = (sqlDelete,params, conn) => {
    return new Promise((resolve, reject) => {
        if (params.id) {
            sqlDelete += "where id in (" + params.id + ")"
        }
        conn.query(sqlDelete, params.id, (error, result) => {
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
    getAllAdminInfo,
    getOneAdminInfo,
    updateAdmin,
    deleteAdmin
}