/**
*  Module
*  Login
* Description
*/
var login = angular.module('login_module', [])

login.controller('loginController', ['$http', function($http) {
	// 	
	this.loginSubmit = function() {
		var _username = this.username;
		var _password = this.password;
		var response = this;
		response.result = [];
		
		$http({method: 'POST', url: 'http://localhost:10001/oauth/spiral/accessToken', headers: {
	    		'Authorization': 'Basic ZmhsaUVqZDM3MWI4NDJjODg4NTA5NDg3MDJhMmM2Y2U4OGJlZGQyNmU1MjRkYjpiZDg5ODU5NWQwODU2ZDhhOTk4YjAwZTc1OTM1ZTQ4Yjg5MzIzOGFk'
	    	}, params : {
	    		grant_type: 'password',
			 	username  : _username,
			 	password  : _password 
	    	}
		}).success(function (data) {
			if(!angular.isUndefined(data.access_token) || data.access_token	 !== null ) {
				response.result.push(data);
				window.localStorage["token"]= data.access_token;
				window.location.href = "/app.html";
			}
		});
	};
}]);

login.directive('usernameValidation', function() {
	// Runs during compile
	 var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// REGEX_EMAIL.test()
	return {
		require : 'ngModel',

		link: function($scope, iElm, iAttrs, controller) {
			function validate_username(viewValue) {
					// body...
				if(re.test(viewValue)) {
					controller.$setValidity('username', true);
					return viewValue;
				} else {
					controller.$setValidity('username', false);
					return undefined;
				}
			}	

			controller.$parsers.unshift(validate_username);
		}
	};
});