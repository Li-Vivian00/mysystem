var sqlMap = {

    admininfo:{
        add: 'insert into admininfo(username, password) values (?, ?)',
        select_name: 'select * from admininfo',
        update_user: 'update userinfo set',
        update_admin:'update admininfo set',

        deleteUser: 'delete from userinfo ',
        deleteAdmin: 'delete from admininfo '
    },
    userinfo: {
        select_name: 'select * from userinfo',
        add: 'insert into userinfo (loginid, username, password, repeatpass, sex, phone, email, card) values (?,?,?,?,?,?,?,?)',
        update_user: 'update userinfo set'
    }
}

module.exports = sqlMap;
