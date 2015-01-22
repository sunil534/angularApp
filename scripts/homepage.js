var displayContentSec = "";

var myApp = angular.module('myapp', ['ngRoute','firebase','ngResource']);


myApp.config(['$routeProvider',function($routeProvider){
	
	$routeProvider
	.when('/page2', {
    templateUrl: '/view/page2.html',
    controller: 'secondPageController'})
	.when('/', {
    templateUrl: '/view/page1.html'})

	
	
}]);

myApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

myApp.factory('FirstService', function($rootScope){
var service = {};
service.updateValue = function(value){
    this.valueToDisplay = value;
    $rootScope.$broadcast("valuesUpdated");
  }
 
  return service;

});




myApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);




function firstController($scope,FirstService,$window,$rootScope,$http,$firebase) {
 
  
  var ref = new Firebase("https://myfirstangap.firebaseio.com/");  
  
   var sync = $firebase(ref);
  
	/* var syncObject = sync.$asObject(); */
	
	$scope.data = sync.$asArray();
	FirstService.updateValue($scope.data);
  /* syncObject.$bindTo($scope, "data"); */
  
 
  
  $scope.addNewEntry = function(newName,newMessage) {
	 $scope.data.$add({name: newName,message:newMessage});
	 $scope.newName='';
	 $scope.newMessage='';
  }
  		$scope.pagename ="page1";
}
 function secondPageController($scope,FirstService,$window,$rootScope,$http) {
 
		$scope.data = FirstService.valueToDisplay;
		$scope.page2name ="page2";
		
		$http({
        url: '/get/passengerDetails',
        method: "get",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data, status, headers, config) {
          
			console.log(data);
			$scope.jsonData = data;
			$scope.passengerData = data.passInfo;
			
			
        }).error(function (data, status, headers, config) {
            $scope.status = status + ' ' + headers;
        });
		$scope.addPasInfo = function(newName,newPlace){
			var newEntry={name:newName,place:newPlace};
			$scope.jsonData.passInfo.push(newEntry);
		
			$http.post('/post/passengerDetails', $scope.jsonData).
			  success(function(data, status, headers, config) {
				$scope.jsonData = data;
				$scope.passengerData = data.passInfo;
			  }).
			  error(function(data, status, headers, config) {
			
			  });
		}
		
		$scope.removeItem = function(index){
				$scope.jsonData.passInfo.splice(index, 1);
				$http.post('/post/passengerDetails', $scope.jsonData).
			  success(function(data, status, headers, config) {
				$scope.jsonData = data;
				$scope.passengerData = data.passInfo;
			  }).
			  error(function(data, status, headers, config) {
			
			  });
			}
}





