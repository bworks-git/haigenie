var express = require('express');
var Auth = require('../auth');
var Product = require('../models/product')
var router = express.Router();

router.get("/",function(req,res){
	Product.find(function(err,products){
		res.send(products);
	});
});
router.get('/category',function(req,res){
	Product.find({status:"active"},function(err,categories){
		if(err)
		{
			res.send({message:"error"})
		}
		res.send(categories);
	});
});

router.get('/:id',function(req,res){
	Product.findOne({"_id":req.params.id},function(err,categories){
		if(err)
		{
			res.send({message:"error"})
		}
		res.send(categories);
	});
});


router.put('/change_status/:id',Auth.isAdmin,function(req,res){
	Product.findById(req.params.id, function(err, product) {
		  if (!product)
		    res.json({message : "Product Not Found"});
		  else {
			    
				product.status = req.body.status;

			    product.save(function(err) {
			      if (err)
			        res.json({message:'error'});
			      else
			        res.json({message:'success'});
			    });
	  		}
	});

});



router.post('/',Auth.isAdmin,function(req,res){
	var product = new Product({
		title : req.body.title,
		brand : req.body.brand,
		manufacturer : req.body.manufacturer,
		description : req.body.description,
		variant : [ 
					{
						sku : req.body.sku,
						price : req.body.price,
						quantity : req.body.quantity,
						unit : req.body.unit,
						stock : req.body.stock,
						promotion : req.body.promotion,
						status: "active"
					}
				],
		material_feature : req.body.material_feature,
		saleType: req.body.saleType,
		tax : req.body.tax,
		category : req.body.category,
		mainImage : req.body.mainImage,
		thumbImage1: req.body.thumbImage1,
		thumbImage2: req.body.thumbImage2,
		thumbImage3: req.body.thumbImage3,
		point1: req.body.point1,
		point2: req.body.point2,
		point3: req.body.point3,
		point4: req.body.point4,
		status: req.body.status,
	});

	product.save(function(err){
		if(err){
			res.json({ message : "Product not created ... try again"});
			return;
		}
		res.json({ message: "Product has been created"});
	});
});

router.delete('/variant/:id/:variant',Auth.isAdmin,function(req,res){
	Product.findById(req.params.id, function(err, product) {
		  if (!product)
		    res.json(product);
		  else {
				product.variant.id(req.params.variant).remove();
				product.save(function (err) {
			  		if (err!=null) res.send({message:"error" ,err:err});
			  		else res.send({message:"success"});
				});
			}
		});
});

router.delete('/:id',Auth.isAdmin,function(req,res){
	
	Product.remove({ "_id" : req.params.id},function(err){
		if(err){
			return res.json({message : "cannot delete product"});
		}

		return res.json({message: "Product deleted succesfully"});
	})
});


router.put('/:id',Auth.isAdmin,function(req,res){
	Product.findById(req.params.id, function(err, product) {
		  if (!product)
		    res.json({message : "Product Not Found"});
		  else {
			    // updates here
			    product.title = req.body.title;
				product.brand = req.body.brand;
				product.manufacturer = req.body.manufacturer;
				product.description = req.body.description;
				/*product.price = req.body.price;
				product.sku = req.body.sku,
				product.quantity = req.body.quantity;
				product.unit = req.body.unit;
				product.stock = req.body.stock;*/
				product.material_feature = req.body.material_feature;
				product.promotion = req.body.promotion;
				product.saleType = req.body.saleType;
				product.tax = req.body.tax;
				product.category = req.body.category;
				product.mainImage = req.body.mainImage;
				product.thumbImage1 = req.body.thumbImage1;
				product.thumbImage2 = req.body.thumbImage2;
				product.thumbImage3 =  req.body.thumbImage3;
				product.point1 = req.body.point1;
				product.point2 = req.body.point2;
				product.point3 = req.body.point3;
				product.point4 = req.body.point4;
				product.status = req.body.status;

			    product.save(function(err) {
			      if (err)
			        res.json({message:'error'+err});
			      else
			        res.json({message:'success'});
			    });
	  		}
	});
});

router.post('/variant',function(req,res){
	Product.findById(req.body.id, function(err, product) {
		  if (!product)
		    res.json(product);
		  else {
				product.variant.push({
					sku : req.body.sku,
					price : req.body.price,
					quantity : req.body.quantity ,
					unit : req.body.unit,
					promotion : req.body.promotion,
					stock : req.body.stock,
					status : req.body.status
				});
				product.save(function (err) {
			  		if (err!=null) res.send({message:"error" ,err:err});
			  		else res.send({message:"success"});
				});
			}
		});
});

router.get('/variant/:id/:variant',function(req,res){
	Product.findById(req.params.id, function(err, product) {
		  if (!product)
		    res.json("product not found");
		  else {
				res.send(product.variant.id(req.params.variant));
		}
	});
});

router.put('/variant/:id/:variant',function(req,res){
	Product.findById(req.params.id, function(err, product) {
		  if (!product)
		    res.json("product not found");
		  else {
				var variant = product.variant.id(req.params.variant);
				variant.sku = req.body.sku;
				variant.quantity = req.body.quantity;
				variant.unit = req.body.unit;
				variant.price = req.body.price;
				variant.promotion= req.body.promotion;
				variant.stock = req.body.stock;
				variant.status = req.body.status;
				product.save(function (err) {
			  		if (err!=null) res.send({message:"error" ,err:err});
			  		else res.send({message:"success"});
				});
		}
	});
});


module.exports = router;