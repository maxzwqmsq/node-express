>1.初始化

```
npm install
npm run start
```

>2.连接数据库

```javascript
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'MAXDB'
})
connection.connect()
```

>3.git/post样例

```javascript
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

router.get('/queryData', userService.queryData)
router.post('/deleteUser', userService.deleteUser)
```

>4.客户端实现
```javascript
 axios.post('http://192.168.31.133:8080/user/deleteUser', postData)
      .then((response)=>{
          this.queryData();
          this.$Message.info(response.data.msg);
      }).catch((error)=>{
          console.log(error);
      })
    ```