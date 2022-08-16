app.controller('product-ctrl', function ($scope, $http) {
	$scope.items = [];
	$scope.cates = [];
	$scope.form = {};

	$scope.initialize = function () {
		//load product

		$http
			.get('/rest/products')
			.then((res) => {
				$scope.items = res.data;
				$scope.items.forEach((item) => {
					item.createDate = new Date(item.createDate);
				});
			})
			.catch((err) => {
				console.log(err);
			});
		//load categories
		$http
			.get('/rest/categories')
			.then((res) => {
				$scope.cates = res.data;
			})
			.catch((err) => {
				console.log(err);
			});
	};

	//Khoi dau
	$scope.initialize();

	//Xoa form
	$scope.reset = function () {
		$scope.form = {
			createDate: new Date(),
			image: 'cloud-upload.jpg',
			available: true,
		};
	};

	//Hien thi len Form

	$scope.edit = function (item) {
		$scope.form = angular.copy(item);
		$('.nav-tabs a:eq(0)').tab('show');
	};

	//Them san pham
	$scope.create = function () {
		var item = angular.copy($scope.form);
		$http
			.post(`/rest/products`, item)
			.then((res) => {
				res.data.createDate = new Date(res.data.createDate);
				$scope.items.push(res.data);
				$scope.reset();
				alert('Add product completed!!');
			})
			.catch((err) => {});
	};

	//Xoa san pham
	$scope.delete = function (item) {
		$http
			.delete(`/rest/products/${item.id}`)
			.then((res) => {
				const index = $scope.items.findIndex((p) => p.id == item.id);
				$scope.items.splice(index, 1);
				$scope.reset();
				alert('Delete product succesfully!!');
			})
			.catch((err) => {
				console.log(err);
				alert('Delete product failed!!');
			});
	};

	//Cap nhat san pham
	$scope.update = function () {
		var item = angular.copy($scope.form);
		$http
			.put(`/rest/products/${item.id}`, item)
			.then((res) => {
				var index = $scope.items.findIndex((p) => p.id == item.id);
				$scope.items[index] = item;
				alert('Update product succesfully!!');
			})
			.catch((err) => {
				console.log(err);
				alert('Update product failed!!');
			});
	};

	//Upload hinh
	$scope.imageChanged = function (files) {
		var data = new FormData();
		data.append('file', files[0]);
		$http
			.post('/rest/upload/images', data, {
				transformRequest: angular.identity,
				headers: { 'Content-Type': undefined },
			})
			.then((res) => {
				$scope.form.image = res.data.name;
			})
			.catch((err) => {
				console.log(err);
				alert('Upload images Error!!');
			});
	};

	//Phan trang
	$scope.pager = {
		page: 0,
		size: 10,
		get items() {
			var start = this.page * this.size;
			return $scope.items.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil((1.0 * $scope.items.length) / this.size);
		},
	};
});
