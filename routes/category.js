var express = require('express');
var Category = require('../models/category');
var Auth = require('../auth') ;
var router = express.Router();

router.get('/', function(req, res, next) {
	Category.find(function(err,categories){
		if(err){
			res.json({message:"error"});
		}
		res.json(categories);
	});
  
});
router.get('/active', function(req, res, next) {
	Category.find({status:"active"},function(err,categories){
		if(err){
			res.json({message:"error"});
		}
		res.json(categories);
	});
  
});

router.get('/:id',function(req,res){
	Category.findOne({"_id":req.params.id},function(err,categories){
		if(err)
		{
			res.send({message:"error"})
		}
		res.send(categories);
	});
});

router.post('/',Auth.isAdmin,function(req,res){
	var category = new Category({
		name : req.body.name,
		status : req.body.status
	});
	category.save(function(err){
		if(err){
			res.json({ message : "Category not created and check if it is already available before trying again"});
			return;
		}
		res.json({ message: "Category has been created"});
	})
});

router.delete('/:id',Auth.isAdmin,function(req,res){
	
	Category.remove({ "_id" : req.params.id},function(err){
		if(err){
			return res.json({message : "cannot delete category"});
		}

		return res.json({message: "Category deleted succesfully"});
	})
});

router.put('/:id',Auth.isAdmin,function(req,res){
	Category.findById(req.params.id, function(err, category) {
		  if (!category)
		    return next(new Error('Could not load Document'));
		  else {
			    // updates here
			    category.name = req.body.name;
			    category.status = req.body.status;

			    category.save(function(err) {
			      if (err)
			        res.json({message:'error'});
			      else
			        res.json({message:'success'});
			    });
	  		}
	});
});

module.exports = router;