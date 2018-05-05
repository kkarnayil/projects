/**
 * Product Service
 */

app.service('ProductService', ['LogService', function(LogService) {

	LogService.info("ProductService loaded.");

	var products = [
		{
			"id" : 1,
			"class" : "active",
			"name" : "iPhone 7 32GB",
			"desc" : "Take your iPhone experience to the next level with iPhone 7. Featuring new camera systems, a better battery-life, an efficient processor and powerful stereo speakers, this smartphone will drastically enhance your iPhone experience.",
			"price" : 400,
			"image" : "images/1.jpeg"
		},
		{
			"id" : 2,
			"name" : "Macbook pro 13",
			"desc" : "Showcase powerful computing and good looks by investing in this Apple MacBook Pro.  Featuring Retina Display and a powerful processor, this laptop delivers an immersive viewing experience along with seamless multitasking with minimal lag.",
			"price" : 1400,
			"image" : "images/2.jpeg"
		},
		{
			"id" : 3,
			"name" : "Sony PlayStation 4 (PS4)",
			"desc" : "Games Included: Call Of Duty: Infinite Warfare, Modern Warfare(Downloadable Code) & Infamous Second Son",
			"price" : 150,
			"image" : "images/3.jpeg"
		},
		{
			"id" : 4,
			"name" : "iPhone 7 128GB",
			"desc" : "Take your iPhone experience to the next level with iPhone 7. Featuring new camera systems, a better battery-life, an efficient processor and powerful stereo speakers, this smartphone will drastically enhance your iPhone experience.",
			"price" : 500,
			"image" : "images/1.jpeg"
		},
		{
			"id" : 5,
			"name" : "Macbook pro 15",
			"desc" : "Showcase powerful computing and good looks by investing in this Apple MacBook Pro.  Featuring Retina Display and a powerful processor, this laptop delivers an immersive viewing experience along with seamless multitasking with minimal lag.",
			"price" : 1500,
			"image" : "images/2.jpeg"
		},
		{
			"id" : 6,
			"name" : "Sony PlayStation 3 (PS3)",
			"desc" : "Games Included: Call Of Duty: Infinite Warfare, Modern Warfare(Downloadable Code) & Infamous Second Son",
			"price" : 250,
			"image" : "images/3.jpeg"
		},
		{
			"id" : 7,
			"name" : "iPhone 7 64GB",
			"desc" : "Take your iPhone experience to the next level with iPhone 7. Featuring new camera systems, a better battery-life, an efficient processor and powerful stereo speakers, this smartphone will drastically enhance your iPhone experience.",
			"price" : 600,
			"image" : "images/1.jpeg"
		},
		{
			"id" : 8,
			"name" : "Macbook pro 17",
			"desc" : "Showcase powerful computing and good looks by investing in this Apple MacBook Pro.  Featuring Retina Display and a powerful processor, this laptop delivers an immersive viewing experience along with seamless multitasking with minimal lag.",
			"price" : 1600,
			"image" : "images/2.jpeg"
		}

		];

	this.getProducts = function() {
		LogService.info("ProductService:getproducts: "
				+ products.length);
		return products;
	}
}]);
