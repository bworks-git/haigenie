var express = require('express');
var NutriFact = require('../models/nutrifact');
var Auth = require('../auth');
var router = express.Router();

router.get('/:id',function(req,res){
	NutriFact.find({"productId":req.params.id},function(err,nutrifacts){
		if(err)
		{
			res.send({message:"error"})
		}
		res.send(nutrifacts);
	});
});

router.post('/',Auth.isAdmin,function(req,res){
	var nutrifact = new NutriFact({
		productId:req.body.productId,
		nutrition:req.body.nutrition,
		value : req.body.value
	});

	nutrifact.save(function(err){
		if(err){
			res.json({ message : "Nutrition not added ... try again"});
			return;
		}
		res.json({ message: "Nutrition added to the product"});
	});
});

router.delete('/:id',Auth.isAdmin,function(req,res){
	
	NutriFact.remove({ "_id" : req.params.id},function(err){
		if(err){
			return res.json({message : "cannot delete nutrition"});
		}

		return res.json({message: "nutrition deleted succesfully"});
	})
});

module.exports = router;