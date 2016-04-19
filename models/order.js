var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Items = new Schema({
	product_id : String ,
	product_name : String ,
	img:String,
	variant_id : String ,
	weight : String,
	unit : String,
	quantity : String ,
	tax : String ,
	price: String ,
	subtotal : String
});

var OrderSchema = new Schema({
	products : [Items] ,
	userId : String ,
	email:String,
	userName : String ,
	doorNo : String ,
	Street1 : String ,
	Street2 : String ,
	city :String ,
	State : String ,
	pincode: String,
	landmark:String,
	mobile : String ,
	status : String ,
	shippingCharge : String ,
	total :String ,
	payment : String ,
	order_date: String,
	delivery_date : String,
	createdAt : Date ,
	updatedAt : Date 
});

OrderSchema.pre('save',function(next){
	var order = this;
	var now = new Date();
	order.updatedAt=now;
	if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('Order',OrderSchema);