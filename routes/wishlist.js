var express = require('express');
var config = require('../config');
var Auth = require('../auth');
var Wishlist = require('../models/wishlist');
var Product = require('../models/product');
var async = require('async');
var router = express.Router();

router.get('/',Auth.isUser, function(req, res, next) {
	 var decoded=req.decoded ;
	var user_id = decoded['id'];
	var result = [];
	  Wishlist.find({user_id:user_id}).lean().exec(function(err,wishlist) {
			
			
		async.each(wishlist, function(item,callback) {
			console.log(item.product_id);
		  Product.find({_id:item.product_id}, function(err, product) {
					if(err){
						console.log(err);
					}
					else{
						
						result.push({product:product});
						
					}
					callback();
						
				});
		  
		}, function(err){
			    // if any of the file processing produced an error, err would equal that error
			    if( err ) {
			      // One of the iterations produced an error.
			      // All processing will now stop.
			      console.log('A item failed to process');
			    } else {
			      console.log('order has been processed successfully');
			      res.send(result);
			    }
		});
			
	  });
	  	 
			
});
router.post('/',Auth.isUser, function(req, res, next) {
  var decoded=req.decoded ;
	var user_id = decoded['id'];
	console.log(req.body.product_id);
	Wishlist.find({product_id: req.body.product_id,user_id:user_id}, function (err, wishlist){ 
	    if(wishlist.length){
	    	
	        Wishlist.remove({product_id: req.body.product_id,user_id:user_id},function(err){
						if(err){
							return res.json({message : "error exits"});
						}
						
						return res.json({message: "success" ,action:"removed"});
					});
	    }
	    else{
	    	
	    	var wishlist = new Wishlist({
	    		product_id: req.body.product_id,
	    		user_id:user_id
	    	});
	    	wishlist.save(function(err){
					if(err){
						res.json({ message : "error new"});
						return;
					}
					
					res.json({ message: "success",action:"added"});
				});
	    }
	}); 
});

module.exports = router;
