const mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'MAXDB'
})
connection.connect()

function SySqlConnect(sySql,sqlArr){
  return new Promise((resolve,reject)=>{
      var connection = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'MAXDB'
      })
      // connection.connect()
      connection.getConnection(function(err,conn){
          console.log('123');
          if(err){
              reject(err);
          }else{
              conn.query(sySql,sqlArr,(err,data)=>{
                  if(err){
                      reject(err)
                  }else{
                      resolve(data);
                  }
                  conn.release();
              });                    
          }
          
      })
  }).catch((err)=>{
          console.log(err);
      })
}

let queryData = (req, res) => {
    var sql = `select * from user`;
    var sqlarr = [1];
    var callback = (err, data)=>{
        if (err){
         console.log(err)
        }else{
          res.send({
              'list': data
          })
        }
    }
    // return SySqlConnect(sql, sqlarr);
    connection.query(sql, callback)
}

let getUserInfo = (req, res) => {
    let {id} = req.body;
    var sql = `select * from user where id=?`
    var sqlarr = [id]
    var callback = (err, data)=>{
      if (err){
        console.log(err)
      }else{
        res.send({
          'list': data
        })
      }
    }
    connection.query(sql, sqlarr, callback)
}



let updateUserInfo = (req, res) => {
    let {password, username} = req.body;
    var sql = `update user set password=? where username=?`
    // var sql = `INSERT INTO user (username, password) VALUES (?,?)`
    var sqlarr = [password, username]
    var callback = (err, data)=>{
      if (err){
        console.log(err)
      }else{
        res.send({
          'code': 200,
          'msg': '修改用户信息成功',
        })
      }
    }
    connection.query(sql, sqlarr, callback)
}

let deleteUser = (req, res) => {
  let {id} = req.body;
  var sql = `delete from user where id=?`
  var sqlarr = [id]
  var callback = (err, data)=>{
    if (err){
      console.log(err)
    }else{
      res.send({
        'code': 200,
        'msg': '删除用户信息成功'
      })
    }
  }
  connection.query(sql, sqlarr, callback)
}

function _chooseUser(users, user){
  for (var item in users){
    if(user == item) {
      return true
    }
  }
  return false;
}

let users = [];

let saveUseInfo = async (username, password) => {
  // if(_chooseUser(this.users,username)){
    var sql = `INSERT INTO user (username, password) VALUES (?,?) `
    var sqlarr = [username, password]
    // this.users.push(username);
    return SySqlConnect(sql, sqlarr);
  // }
}

let getPassword =  (username) => {
  var sql = `select password from user where username=? `
  var sqlarr = [username]
  var callback = (err, data)=>{
    if (err){
      console.log(err)
    }else{
      console.log(22222)
      return data[0].password;
    }
  }
  return SySqlConnect(sql, sqlarr)
}

//根据用户名生产code,并在db中设置password affectedRows
let setPassword = async (req, res) => {
  let code =  _rand(1000, 9999);
  //创建用户名以及密码
  let status = await saveUseInfo(req.body.username, code);
  //获取密码并返回
  if(status.affectedRows == 1){
    let getPwd = await getPassword(req.body.username);
    if(getPwd.length){
      res.send({  
        'code': 200,
        'pwd':  getPwd[0].password,
        'msg': '获取验证码成功！'
      })
    }
  }else{
    res.send({
      'code': 401,
      'msg': '获取验证码失败！'
    })
  }
}

function _rand (min, max){
  return Math.floor(Math.random()*(max-min))+min;
}

function _uuid() {
  var temp_url = URL.createObjectURL(new Blob());
  var uuid = temp_url.toString(); // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
  URL.revokeObjectURL(temp_url);
  return uuid.substr(uuid.lastIndexOf("/") + 1);
}





module.exports = {
    queryData, 
    getUserInfo,
    saveUseInfo,
    updateUserInfo,
    deleteUser,
    setPassword
};