export const adminLoginRep = (selectName, loginId) => {
    conn.query(selectName, loginId, function (err, result) {
        if (error) {
            console.log(error)
        } else {
            var resultArray = result[0];
            return resultArray
        }
    })
}