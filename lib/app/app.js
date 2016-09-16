/**
*  Module
*
* Description
*/
var app = angular.module('appModule', []);

app.controller('appController', function($http) {
	var token = "Bearer " + window.localStorage["token"];
	var config = {
		headers : {
			'Content-Type' : 'application/json;charset=UTF-8',
			'Authorization' : token
		}
	};

	var vm = this;
	vm.items = [];
	
	$http.get('http://localhost:10001/v1/apps', config).success(function(data) {
			//console.log(response.data.items)
			vm.items = data.items;			
	}).error(function (status) {
		if(status.code === 401) {
			window.location.href = "/login.html";;
		}
	});

	this.createApp = function() {
		var _name = this.name;
		var _description = this.desc;
		
		var data = {
			"name" : _name, 
			"description" : _description
		};
			
		$http.post('http://localhost:10001/v1/apps', data, config).success(function(data) {
			vm.items.push(data);
		//	vm.init();
		}).error( function(status) {
			if(status.code === '401') {
				window.location.href = "/login.html";;
			}
			vm.message = status.message;
		});		

	};
	
});

app.directive('validateName', function(){
	// Runs during compile
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ngModel) {
			function check_length_name(viewValue) {

				if ( viewValue.length > 10) {
				//	console.log(JSON.stringify(viewValue.length));
					ngModel.$setValidity('name', true);
					return viewValue;
					
				} else {
					ngModel.$setValidity('name', false);
					return undefined;
				}
			}

			ngModel.$parsers.unshift(check_length_name);
		}
	};
});