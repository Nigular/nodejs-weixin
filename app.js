const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


//app配置
const app = express();

// app.set 设置当前views的路径(模板路径)
// path.join 将多个参数组合成一个 path(简单来说就是几个参数组合成路径)
app.set('views', path.join(__dirname, 'views'));

// 让ejs模板文件使用扩展名为html的文件
app.engine("html",require("ejs").renderFile);

//注册模板引擎的 callback 用来处理ext扩展名的文件默认情况下, 根据文件扩展名require() 对应的模板引擎。
app.set("view engine","html");

//引入token刷新
const getToken = require('./libs/common');
getToken();

//创建菜单
const createMenu = require('./libs/wxCustomeMenu');
//createMenu();

//引入路由
//const weixin = require('./routes/weixin');
const auth = require('./routes/auth');
const userinfo = require('./routes/userinfo');

//启用路由
//app.use('/wechat', weixin);
app.use(auth);
app.use(userinfo);

app.get('/', function (req, res) {
  res.render('index.html');
});

app.listen(8100,function(){  console.log("Server Start!");});

require("./proxy.js");

module.exports = app;