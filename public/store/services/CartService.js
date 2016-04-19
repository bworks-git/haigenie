angular.module('haigenieFront').factory('Cart', ['localStorageService', function(localStorageService){
	var cartFactory = {};
	var math = window.Math;
	cartFactory.getCart = function(){
		return localStorageService.get('cart');
	}

	cartFactory.incrementItem = function(variant_id,tax,price){
		if(localStorageService.get('cart')==null)
			var cart =[] ;
		else var cart = localStorageService.get('cart');
		for(var i=0;i<cart.length;i++){
			if(cart[i].variant_id==variant_id){
				cart[i].quantity=parseInt(cart[i].quantity)+1;
				cart[i].subtotal = math.round((parseInt(cart[i].tax)/100)*parseInt(price)*cart[i].quantity)
				+(parseInt(price)*cart[i].quantity) ;
				localStorageService.set('cart',cart);
				return ;
			}
		}
	}

	cartFactory.decrementItem = function(variant_id,tax,price){
		
		if(localStorageService.get('cart')==null)
			var cart =[] ;
		else var cart = localStorageService.get('cart');
		for(var i=0;i<cart.length;i++){
			
			if(cart[i].variant_id==variant_id){
				if(cart[i].quantity==1){
				
				return;
			}
				
				cart[i].quantity=parseInt(cart[i].quantity)-1;
				cart[i].subtotal = math.round((parseInt(tax)/100)*parseInt(price)*cart[i].quantity)
				+(parseInt(price)*cart[i].quantity) ;
				localStorageService.set('cart',cart);
				return ;
			}
		}
	}

	cartFactory.removeItem = function(index){
		if(localStorageService.get('cart')==null)
			var cart =[] ;
		else var cart = localStorageService.get('cart');
		cart.splice(index,1);
		localStorageService.set('cart',cart);
		return ;
	}
	cartFactory.removeCart = function(){
		localStorageService.remove('cart');
		return;
	}
	cartFactory.setCart = function(product_id,name,variant_id,img,weight,unit,quantity,price,tax,subtotal){
		if(localStorageService.get('cart')==null)
			var cart =[] ;
		else var cart = localStorageService.get('cart');
		for(var i=0;i<cart.length;i++){
			if(cart[i].variant_id==variant_id){
				cart[i].quantity=parseInt(cart[i].quantity)+parseInt(quantity);
				cart[i].subtotal = math.round((parseInt(tax)/100)*parseInt(price)*cart[i].quantity)
				+(parseInt(price)*cart[i].quantity) ;
				localStorageService.set('cart',cart);
				return ;
			}
		}
		cart.push({ 
        "product_id" : product_id,
        "product_name":name,
        "variant_id"  : variant_id,
        "img": img,
        "weight"       : weight ,
        "unit"       : unit ,
        "quantity"       : quantity ,
        "price"       : price ,
        "tax"       : tax ,
        "subtotal"       : subtotal 
    });
		localStorageService.set('cart',cart);
	
	}

	return cartFactory;
}])
