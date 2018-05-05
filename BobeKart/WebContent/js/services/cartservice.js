/**
 * Cart Service
 * 
 */
app.service('CartService', [
	'LogService',
	function(LogService) {
		LogService.info("CartService loaded.");

		/**
		 * Cart model
		 */
		var cart = {
				products : [],
				totalPrice : 0
		};

		/**
		 * Add to cart function.
		 */
		this.addToCart = function(product) {
			LogService.info("CartService:addToCart: " + product.id);
			var isProductAdded = false;

			for (var i = 0; i < cart.products.length; i++) {
				var cartProduct = cart.products[i];
				if (cartProduct.id == product.id) {
					cartProduct.quantity += 1;
					cartProduct.totalPrice += product.price;
					isProductAdded = true;
					break;
				}
			}

			if (!isProductAdded) {
				product.quantity = 1;
				product.totalPrice = product.price;
				cart.products.push(product);
			}

			cart.totalPrice += product.price;

			LogService.debug(cart);
		};

		/**
		 * Get cart function.
		 */
		this.getCart = function() {
			LogService.info("CartService:getCart: " + cart.products.length);
			return cart;
		};

		/**
		 * Function to remove product from the cart.
		 */
		this.removeProduct = function(product) {
			LogService.info("CartService:removeProduct: " + product.id);
			for (var i = 0; i < cart.products.length; i++) {

				if (cart.products[i].id == product.id) {
					cart.products.splice(i, 1);
					cart.totalPrice = cart.totalPrice
					- (product.quantity * product.price);
					break;
				}
			}
			LogService.debug(cart);
		};
	} ]);