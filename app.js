const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');	//session也要依赖这个模块
var session = require("express-session"); //采用Session短期存储用户名和密码

//app配置
const app = express();

// app.set 设置当前views的路径(模板路径)
// path.join 将多个参数组合成一个 path(简单来说就是几个参数组合成路径)
app.set('views', path.join(__dirname, 'views'));

// 设置默认静态文件夹路径为public (静态页引入时就不需要写public了)
app.use(express.static(path.join(__dirname, 'public')));

// 让ejs模板文件使用扩展名为html的文件
app.engine("html",require("ejs").renderFile);

//注册模板引擎的 callback 用来处理ext扩展名的文件默认情况下, 根据文件扩展名require() 对应的模板引擎。
app.set("view engine","html");

//引入token刷新
const getToken = require('./libs/common');
//getToken();

//创建菜单
const createMenu = require('./libs/wxCustomeMenu');
//createMenu();

//引入路由
//const weixin = require('./routes/weixin');
const auth = require('./routes/auth');
const user = require('./routes/userinfo');

//启用路由
//app.use('/wechat', weixin);
app.use(auth);
app.use(user);

const getWebToken = require('./websdk/getWebToken');
const getJsApiData = require('./libs/getJsApiData');
const getUserInfo = require('./websdk/getWebUserInfo');
const config = require('./config');

app.get('/', function (req, res) {
  var clientUrl = 'http://wechat.gzyuhu.com/';
  getJsApiData(clientUrl).then(data => {
    res.render('index.html', {signature: data[0], timestamp: data[1], nonceStr: data[2], appId: config.appId});
  });
});


app.listen(8100,function(){  console.log("Server Start!");});

module.exports = app;