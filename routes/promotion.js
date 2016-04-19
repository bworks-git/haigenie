var express = require('express');
var router = express.Router();
var Promotion = require('../models/promotion');
var Auth = require('../auth');

router.get('/',function(req,res){
	Promotion.find(function(err,promotions){
		if(err){
			res.json({message:"error"});
		}
		res.json(promotions);
	});
});
router.post('/',Auth.isAdmin,function(req,res){
	var promotion = new Promotion({
		name : req.body.name,
		freebie:req.body.freebie,
		discount:req.body.discount,
		
	});
	promotion.save(function(err){
		if(err){
			res.json({ message : "Promotion not created"});
			return;
		}
		res.json({ message: "Promotion has been created"});
	})
});

router.delete('/:id',Auth.isAdmin,function(req,res){
	
	Promotion.remove({ "_id" : req.params.id},function(err){
		if(err){
			return res.json({message : "cannot delete promotion"});
		}

		return res.json({message: "promotion deleted succesfully"});
	})
});

module.exports = router;