/**
 * Header Controller
 */
app.controller('HeaderController', ['$scope', 'LogService', 'CartService', function($scope, LogService, CartService) {
	LogService.info("HeaderController loaded.");
	
	$scope.cart = CartService.getCart();

	$scope.removeProduct = function(product){
		LogService.info("HeaderController:removeProduct: "+product.id)
		CartService.removeProduct(product);
	};

}]);