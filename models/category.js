var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
	name: {type:String , required:true , unique:true},
	status : { type:String , required:true },
	createdAt : { type:Date },
	updatedAt : { type:Date }
});

CategorySchema.pre('save',function(next){
	var user = this;
	var now = new Date();
	user.updatedAt=now;
	if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('Category',CategorySchema);