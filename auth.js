var config = require('./config');
var jwt = require('jsonwebtoken');
var secretKey = config.secretKey;

module.exports = {
	isAdmin : function(req,res,next){
			
					var token = req.body.token || req.params.token || req.headers['x-access-token'];
					if(token){
						jwt.verify(token,secretKey,function(err,decoded){
							if(err){
								res.status(403).send({ message:"error"});
							}
							else{
								req.decoded = decoded;
								if(decoded['role']!='admin'){
									res.status(403).send({ message:"not admin"});
								}
								else next();
							}
						});
					}
					else{
						res.status(403).send({ message:"no token provided"});
					}
							
				},
	isUser : function(req,res,next){

		var token = req.body.token || req.params.token || req.headers['x-access-token'];
		if(token){
			jwt.verify(token,secretKey,function(err,decoded){
				if(err){
					res.send({ message:"error token"});
				}
				else{
					req.decoded = decoded;
					next();
				}
			});
		}
		else{
			res.send({ message:"no token provided"});
		}
				
	},
	createToken : function createToken(user){
					var token = jwt.sign({
						id : user._id,
						name: user.name,
						role: user.role
					},secretKey,{
						expiresInminute:1440
					});
					return token;
				}

}

