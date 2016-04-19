var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Variant = new Schema({
	sku : { type : String , required: true},
	price : { type : String , required: true},
	quantity : { type : String , required: true},
	unit : { type : String , required: true},
	stock : { type : String , required: true},
	promotion : { type : String },
	status: {type:String ,required:true}
	
});

var ProductSchema = new Schema({
	title : { type: String , required:true},
	brand : { type: String , required:true},
	manufacturer : { type : String , required: true},
	description : { type : String , required: true},
	material_feature : { type : String , required: true},
	saleType: {type : String},
	tax : { type : String , required: true},
	category : { type : String , required: true},
	variant : [Variant],
	mainImage : { type : String },
	thumbImage1: { type : String },
	thumbImage2: { type : String },
	thumbImage3: { type : String},
	point1:{type:String},
	point2:{type:String},
	point3:{type:String},
	point4:{type:String},
	status: {type:String ,required:true},
	createdAt:{type:Date} ,
	updatedAt : {type:Date}
});

ProductSchema.pre('save',function(next){
	var product = this;
	var now = new Date();
	product.updatedAt=now;
	if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('Product',ProductSchema);