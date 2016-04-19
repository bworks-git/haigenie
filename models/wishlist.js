var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var WishlistSchema = new Schema({
	user_id : {type: String , required : true},
	product_id : { type : String , required : true},
	createdAt : { type:Date },
	updatedAt : { type:Date }
});

WishlistSchema.pre('save',function(next){
	var wishlist = this;
	var now = new Date();
	wishlist.updatedAt=now;
	if ( !this.createdAt ) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('Wishlist',WishlistSchema);