const router = require('express').Router();
const getToken = require('../websdk/getWebToken');
const getUserInfo = require('../websdk/getWebUserInfo');

// 引入数据库model模块
const usermodel = require("../database/usermodel.js");

router.get('/user', function (req, res) {
	console.log(req.session.openid);
	if(!req.session.openid){
		getToken(req.query.code)
	    .then(function (data) {
	        return JSON.parse(data); 
	    })
	    .then(function (data) {
	      getUserInfo(data['access_token'], data['openid']).then(_item => {
			var jsondata=JSON.parse(_item);
	      	var userdata={
				openid : jsondata.openid,	//微信openid
			    nickname : jsondata.nickname,	//微信昵称
			    headimgurl  : jsondata.headimgurl,	//头像
			    sex 	 : jsondata.sex,	// 性别，男1,9未知
			    city  : jsondata.city,	//城市
			    province  : jsondata.province,	//省份
			    country  : jsondata.country	//国家
			}
	      	usermodel.add(userdata,function(data){
				
			});
			//console.log(userdata);
			req.session.openid=jsondata.openid;
	        res.render('user.html', {userinfo: userdata});      
	      })
	    });
	}else{
		usermodel.find({openid:req.session.openid},function(data){
			///console.log(data[0]);
			res.render('user.html', {userinfo: data[0]}); 
		});
	}
});

module.exports = router;