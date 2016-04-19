var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
	userId : { type:String , required:true },
	userName : { type:String , required:true },
	productId : { type:String , required:true },
	productName : { type:String  },
	rating : { type:String , required:true },
	review : { type:String , required:true },
	status : { type:String , required:true },
	createdAt : { type:Date },
	updatedAt : { type:Date }
});

ReviewSchema.pre('save',function(next){
	var review = this;
	var now = new Date();
	review.updatedAt=now;
	if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('Review',ReviewSchema);