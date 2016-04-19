var express = require('express');
var Review = require('../models/review');
var Auth = require('../auth');
var router = express.Router();

router.get('/all',function(req,res){
	Review.find({},function(err,reviews){
		if(err)
		{
			res.send({message:"error"})
		}
		res.send(reviews);
	});
});
router.get('/:id',function(req,res){
	Review.find({"productId":req.params.id,"status":"active"},function(err,reviews){
		if(err)
		{
			res.send({message:"error"})
		}
		res.send(reviews);
	});
});

router.post('/',Auth.isUser,function(req,res){
	var decoded=req.decoded ;
	var user_id = decoded['id'];
	var user_name = decoded['name'];
	var review = new Review({
		productId:req.body.productId,
		productName:req.body.productName,
		userId: user_id ,
		userName : user_name ,
		rating : req.body.rating ,
		review : req.body.review,
		status : 'inactive'
	});

	review.save(function(err){
		if(err){
			res.json({ message : "Review not added ... try again"});
			return;
		}
		res.json({ message: "Review submitted for approval and Once approved it will be listed here ."});
	});
});

router.put('/:id',Auth.isAdmin,function(req,res){
	
	Review.findById(req.params.id,function(err,review){
		if(err){
			return res.json({message : "cannot change review status"});
		}
		if(review.status=='inactive')
			review.status='active';
		else
			review.status='inactive';
		review.save(function(err){
		if(err){
			res.json({ message : "cannot change review status ... try again"});
			return;
		}
		res.json({ message: "Review status changed successfully ."});
	});
	})
});

module.exports = router;