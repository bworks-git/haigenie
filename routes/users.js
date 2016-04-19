var express = require('express');
var User =require('../models/user');
var Auth = require('../auth');
var nodemailer = require('nodemailer');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({role :"customer"},function(err,customers){
  	if(err){
  		res.send({message: "error"});
  	}
  	else{
  		res.send(customers);
  	}
  })
});
router.get('/details',Auth.isUser,function(req,res,next){
	var decoded=req.decoded ;
	var user_id = decoded['id'];
	User.findById(user_id,function(err,user){
		if(!user) res.send("user not found");
		else res.send(user);
	})
								
});


router.post('/details',Auth.isUser,function(req,res,next){
	var decoded=req.decoded ;
	var user_id = decoded['id'];
	User.findById(user_id, function(err, user) {
		  if (!user)
		    res.json("user not found");
		  else {

		  		user.name = req.body.name;
		  		
		  		user.mobile = req.body.mobile;
		  		user.alternate_mobile = req.body.alternate_mobile;
		  		user.gender = req.body.gender;
		  		user.birthdate = req.body.birthdate;
		  		user.email = req.body.email;
				
				user.save(function (err) {
			  		if (err!=null) res.send({message:"error" ,err:err});
			  		else res.send({message:"success"});
				});
		}
	});
});


router.post('/forgetpassword',function(req,res,next){
			var email = req.body.email;
			User.findOne({ "email" :req.body.email},function(err,user){
				if(!user) console.log("not user"+user+email);
				else{
					var transporter = nodemailer.createTransport('smtps://9ca9bd531110944a4793a9eb5411a17e:f09bd7540d51c12f285682ecca10a1b8@in-v3.mailjet.com');

					// setup e-mail data with unicode symbols
					var mailOptions = {
					    from: '"Haigenie Organic Store" <bworkstechlabs@gmail.com>', // sender address
					    to:email, // list of receivers
					    subject: 'Hello ✔', // Subject line
					    text: 'Hello world 🐴', // plaintext body
					    html: '<b>Your Password : 🐴</b><br/>'+user.password // html body
					};

					// send mail with defined transport object
					transporter.sendMail(mailOptions, function(error, info){
					    if(error){
					        return console.log(error);
					    }
					    console.log('Message sent: ' + info.response);
					});
				}
			});
		
										
});

router.post('/changepassword',Auth.isUser,function(req,res,next){
	var decoded=req.decoded ;
	var user_id = decoded['id'];
	User.findById(user_id, function(err, user) {
		  if (!user)
		    res.json("user not found");
		  else {

		  		if(user.comparePassword(req.body.old_password)){
		  			user.password=req.body.new_password;
		  			user.save(function (err) {
			  		if (err!=null) res.send({message:"error" ,err:err});
			  		else res.send({message:"success"});
				});

		  		} else{
		  			res.send({message:"old password wrong"});
		  		}
				
		}
	});
								
});
router.post('/address',Auth.isUser,function(req,res,next){
	var decoded=req.decoded ;
	var user_id = decoded['id'];
	User.findById(user_id, function(err, user) {
		  if (!user)
		    res.json("user not found");
		  else {

		  		user.doorNo = req.body.doorno;
		  		user.street1 = req.body.street1;
		  		user.street2 = req.body.street2;
		  		user.area = req.body.area;
		  		user.landmark = req.body.landmark;
		  		user.city = req.body.city;
		  		user.state = req.body.state;
		  		user.country = req.body.country;
		  		user.pincode = req.body.pincode;
		  		
				
				user.save(function (err) {
			  		if (err!=null) res.send({message:"error" ,err:err});
			  		else res.send({message:"success"});
				});
		}
	});
								
});

router.get('/me',Auth.isUser,function(req,res){

	res.json(req.decoded);

});
router.post('/register', function(req, res, next) {
  	var user = new User({
  		name : req.body.name,
  		email : req.body.email,
  		password : req.body.password,
  		role : "customer" ,
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
				res.json([{message:"user not found",token:""}]);
			}
			else if(user){
				var validPassword = user.comparePassword(req.body.password);
				if(!validPassword){
					res.json([{message:"invalid password",token:""}]);
				}
				else{
					var token = Auth.createToken(user);

					res.json([{
						message:"success",
						token: token
					}]);
				}
			}
		});
	});
module.exports = router;