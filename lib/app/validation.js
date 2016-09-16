/**
*  Module
*
* Description
*/
var app = angular.module('validation_module', []);

// app.directive('validateInteger',function(){
// 	// Runs during compile
// 	//var REGEX = /^\-?\d+$/;
// 	return {
// 		restrict: 'A',
// 		require: 'ngModel',

// 		link: function(scope, element, attrs, ngModel) {
// 			function update(viewValue) {
// 				if (viewValue.match(/^\-?\d+$/)) {
// 					ngModel.$setValidity('integer', true);
// 					return viewValue;
// 				}
// 				else {
// 					ngModel.$setValidity('integer', false);
// 					return undefined;
// 				}
// 			}
// 			ngModel.$parsers.unshift(update);
// 		}
// 	};
// });



app.directive('validateInteger', function() {
	var REGEX = /^\-?\d+$/;
	var regex_whitespace = /\s/;
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        /*
        scope.$watch(attrs.ngModel, function(value) {
          var getter = $parse(value);
          update(getter(scope));
        });
        */
	        function checkNumber(viewValue) {
	        	
				if (REGEX.test(viewValue)) {
					console.log( 1 + JSON.stringify(viewValue));
					ngModel.$setValidity('integer', false);
					return undefined;
				}
				else {
					ngModel.$setValidity('integer', true);
					return viewValue;				
				}
			}

			function checkWhitespace(viewValue) {
				
				if(regex_whitespace.test(viewValue)) {
					ngModel.$setValidity('white_space', false);
					return undefined;
				}
				else {
					ngModel.$setValidity('white_space', true);
					return viewValue;
				}
			}		
        
      	 ngModel.$parsers.unshift(checkNumber);
      	ngModel.$parsers.unshift(checkWhitespace);	
      
      }
    };
  });