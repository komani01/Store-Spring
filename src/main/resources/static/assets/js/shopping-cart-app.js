const app = angular.module('shopping-cart-app', []);

app.controller('shopping-cart-ctrl', function ($scope, $http) {
	$scope.cart = {
		items: [],

		//Add product
		add(id) {
			var item = this.items.find((item) => item.id == id);
			if (item) {
				item.qty++;
				this.saveToLocalStorage();
			} else {
				$http
					.get(`/rest/products/${id}`)
					.then((resp) => {
						resp.data.qty = 1;
						this.items.push(resp.data);
						this.saveToLocalStorage();
					})
					.catch((err) => {
						console.log(err);
					});
			}
		},

		//Remove Product
		remove(id) {
			var index = this.items.findIndex((item) => item.id == id);
			this.items.splice(index, 1);
			this.saveToLocalStorage();
		},

		//Delete add product
		clear() {
			(this.items = []), this.saveToLocalStorage();
		},

		// Tinh tien 1 san pham
		amt_of(item) {},

		//Get so luong mat hang

		get count() {
			return this.items
				.map((item) => item.qty)
				.reduce((total, qty) => (total += qty), 0);
		},

		//Get thanh tien cac mat hang

		get amount() {
			return this.items
				.map((item) => item.qty * item.price)
				.reduce((total, qty) => (total += qty), 0);
		},

		//Luu vao LocalStorage

		saveToLocalStorage() {
			var json = JSON.stringify(angular.copy(this.items));
			localStorage.setItem('cart', json);
		},

		//Doc gio hang tu LocalStorage

		loadFromLocalStorage() {
			var json = localStorage.getItem('cart');
			this.items = json ? JSON.parse(json) : [];
		},
	};

	$scope.cart.loadFromLocalStorage();

	$scope.order = {
		createDate: new Date(),
		address: '',
		account: {
			username: $('#username').text(),
		},
		get orderDetails() {
			return $scope.cart.items.map((item) => {
				return {
					product: { id: item.id },
					price: item.price,
					quantity: item.qty,
				};
			});
		},
		purchase() {
			var order = angular.copy(this);
			$http
				.post('/rest/orders', order)
				.then((resp) => {
					alert('Order has been completed!!!');
					$scope.cart.clear();
					location.href = '/order/detail/' + resp.data.id;
				})
				.catch((err) => {
					alert('Order has been failed!!!');
					console.log(err);
				});
		},
	};
});
