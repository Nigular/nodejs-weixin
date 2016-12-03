const router = require('express').Router();
const getToken = require('../websdk/getWebToken');
const getUserInfo = require('../websdk/getWebUserInfo');

// 引入数据库model模块
const usermodel = require("../database/usermodel.js");

router.get('/user', function (req, res) {
	if(!req.session.openid){
		getToken(req.query.code)
	    .then(function (data) {
			console.log("555"+data);
	        return JSON.parse(data); 
	    })
	    .then(function (data) {
	      getUserInfo(data['access_token'], data['openid']).then(_item => {
	      	var userdata={
				openid : _item.openid,	//微信openid
			    nickname : _item.nickname,	//微信昵称
			    headimgurl  : _item.headimgurl,	//头像
			    sex 	 : _item.sex,	// 性别，男1,9未知
			    city  : _item.city,	//城市
			    province  : _item.province,	//省份
			    country  : _item.country	//国家
			}
	      	usermodel.add(userdata,function(data){
				res.send({code:1});
			});
			req.session.openid=_item.openid;
	        res.render('user.html', {userinfo: _item});      
	      })
	    });
	}else{
		console.log("999");
		usermodel.find({openid:req.session.openid},function(data){
			console.log("666"+data);
			res.render('user.html', {userinfo: data}); 
		});
	}
});

module.exports = router;