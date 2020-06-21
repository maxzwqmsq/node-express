var express = require('express');
var app = express();
var userRouter = require('./router/user')
var bodyParser = require('body-parser');/*post方法*/
app.use(bodyParser.json());// 添加json解析
app.use(bodyParser.urlencoded({extended: false}));

//CONNECT DB
// const mysql = require('mysql')
// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '1234',
//   database: 'MAXDB'
// })
// connection.connect()
// connection.end()

app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
      res.send(200);
    }
    else {
      next();
    }
});

app.use('/user', userRouter);


var server = app.listen(8080, function(){
    var host = "https://192.168.31.133"
    var port = server.address().port
    
    console.log(host, port)
})



