/**
 * Product Controller
 */
app.controller('ProductController', [ '$scope', 'LogService', 'CartService',
	'ProductService', function($scope, LogService, CartService, ProductService) {
	LogService.info("ProductController loaded.")

	$scope.init = function() {
		LogService.info("ProductController:init");

		$scope.products = ProductService.getProducts();

		$("#myCarousel").carousel({
			interval : 3000
		});

	};

	$scope.addToCart = function(product) {
		LogService.info("ProductController:addToCart: " + product.id);
		CartService.addToCart(product);
	};

	$scope.init();
}]);