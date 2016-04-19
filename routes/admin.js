var express = require('express');
var User = require('../models/user');
var Product = require('../models/product');
var Catgory = require('../models/category');
var Order = require('../models/order');
var Auth = require('../auth') ;
var config = require('../config');
var router = express.Router();

router.get('/',function(req,res){
	res.sendFile(config.rootDir+'/public/index.html');
});

router.get('/count',function(req,res){
	Product.count({},function (err, count) {
  		res.send(count);
	});	
});

router.post('/register', function(req, res, next) {
  	var user = new User({
  		name : req.body.name,
  		email : req.body.email,
  		password : req.body.password,
  		role : "admin" ,
  		status : "active"
  	});

  	user.save(function(err){
  		if(err){
  			res.send([{message : "error"}]);
  		}
  		else {
  			res.send([{message: "success"}]);
  		}
  	});
});




router.post('/login',function(req,res){
		User.findOne({ 
			email: req.body.email
		}).exec(function(err,user){
			if(err) throw err;
			if(!user){
				res.json({message:"user not found"});
			}
			else if(user['role']!='admin'){
				res.json({message:"admin not found"});
			}
			else if(user){
				var validPassword = user.comparePassword(req.body.password);
				if(!validPassword){
					res.json({message:"invalid password"});
				}
				else{
					var token = Auth.createToken(user);

					res.json({
						message:"success",
						token: token
					});
				}
			}
		})
	});

router.get('/me',Auth.isAdmin,function(req,res){

	res.json(req.decoded);

});

module.exports = router;


