var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name : String ,
	firstName: String,
	lastName: String,
	email :{ type:String , required:true , unique:true},
	password :{ type:String , required:true },
	role :{ type:String , required:true },
	mobile : {type:String},
	alternate_mobile : {type:String},
	birthdate : {type:String},
	gender:{type:String},
	country:{type:String},
	city : {type:String},
	state : {type:String},
	pincode : {type:String},
	street1 : {type:String},
	street2 : {type:String},
	doorNo : {type:String},
	area : {type:String},
	landmark:{type:String},
	status :{ type:String , required:true}
});

UserSchema.pre('save',function(next){
	var user = this ;
	if(!user.isModified('password')) return next();

	bcrypt.hash(user.password,null,null,function(err,hash){
		if(err) return next(err);

		user.password = hash;
		next();
	});

});

UserSchema.methods.comparePassword = function(password){

	var user = this;
	return bcrypt.compareSync(password,user.password);

}

module.exports = mongoose.model('User',UserSchema);