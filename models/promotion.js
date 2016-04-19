var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PromotionSchema = new Schema({
	name : { type:String , required:true },
	freebie: { type:String ,default:"none"  },
	discount: { type:String ,default:"none" },
	status : { type:String  },
	createdAt : { type:Date },
	updatedAt : { type:Date }
});

PromotionSchema.pre('save',function(next){
	var review = this;
	var now = new Date();
	review.updatedAt=now;
	if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('Promotion',PromotionSchema);