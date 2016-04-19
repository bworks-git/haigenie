var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NutriFactSchema = new Schema({
	productId : {type:String , required:true},
	nutrition : {type:String , required:true},
	value : {type:String , required:true},
	createdAt : {type:Date},
	updatedAt : {type:Date}
});

NutriFactSchema.pre('save',function(next){
	var nutrifacts = this;
	var now = new Date();
	nutrifacts.updatedAt=now;
	if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model("NutriFact",NutriFactSchema);
