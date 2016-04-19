var express = require('express');
var config = require('../config');
var Auth = require('../auth');
var Order = require('../models/order');
var Product = require('../models/product');
var async = require('async');
var moment = require('moment');
var router = express.Router();

router.get('/', function(req, res, next) {
  Order.find(function(err,orders){
		if(err){
			res.json({message:"error"});
		}
		res.json(orders);
	});
});
router.get('/user',Auth.isUser,function(req,res){
	var decoded=req.decoded ;
	var user_id = decoded['id'];
	
	Order.find({"userId":user_id},function(err,order){
		if(err)
		{
			res.send({message:"error user"})
		}
		res.send(order);
	});
});


router.get('/:id',function(req,res){
	Order.findOne({"_id":req.params.id},function(err,order){
		if(err)
		{
			res.send({message:"error"})
		}
		res.send(order);
	});
});

router.post('/',Auth.isUser,function(req,res){
	console.log(req.body);
	var shipping=0;
	if(parseInt(req.body.subtotal)<600){
		shipping=50;
	}
	var decoded=req.decoded ;
	var user_id = decoded['id'];
	var order = new Order({
	products : req.body.items ,
	userId : user_id ,
	email:req.body.email,
	userName : req.body.name ,
	doorNo : req.body.doorNo ,
	Street1 : req.body.street1 ,
	Street2 : req.body.street2 ,
	city :req.body.city ,
	State : req.body.state ,
	pincode: req.body.pincode,
	landmark:req.body.landmark,
	mobile : req.body.mobile ,
	status : "waiting for acceptance" ,
	shippingCharge : shipping ,
	total : parseInt(req.body.subtotal)+shipping ,
	order_date:moment().format("DD-MM-YYYY"),
	delivery_date:moment().add(10, 'days').format("DD-MM-YYYY"),
	payment : "cod" 
	});

	order.save(function(err){
		if(err){
			res.json({ message : "failed"});
			return;
		}
		
		async.each(req.body.items, function(item,callback) {

		  Product.findById(item.product_id, function(err, product) {
					if(err){
						console.log(err);
					}
					else{
						console.log("product"+product);

						variant = product.variant.id(item.variant_id);
						console.log("items"+variant);
						variant.stock = parseInt(variant.stock)-parseInt(item.quantity);
						
						product.save(function (err) {});
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
			    }
		});
		res.json({ message: "Order has been created"});
	});
});

router.put('/change_status',Auth.isAdmin,function(req,res){
	Order.findById(req.body.order_id, function(err, order) {
		  if (!order)
		    res.json({message : "Order Not Found"});
		  else {
			    
				order.status = req.body.status;

			    order.save(function(err) {
			      if (err)
			        res.json({message:'error'});
			      else
			        res.json({message:'success'});
			    });
	  		}
	});

});


module.exports = router;