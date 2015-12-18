'use strict';

var $routeProviderReference;
var myapp = angular.module('myapp', ['ngRoute']);

myapp.config(['$routeProvider', function($routeProvider) {
    $routeProviderReference = $routeProvider;
}]);

myapp.run(['$rootScope', '$http', '$route', function($rootScope, $http, $route) {

    $http.get('http://localhost:3000/db/').success(function (data) {

        angular.forEach(data, function (route) {
            var routeCtrl;
            switch(route.template) {
                case 'partial1.html':
                    routeCtrl = 'MainCtrl';
                    break;
                case 'partial2.html':
                    routeCtrl = 'Partial2Ctrl';
                    break;
                case 'partial3.html':
                    routeCtrl = 'Partial3Ctrl';
                    break;
                default: routeCtrl = 'DefaultCtrl';
            }

            $routeProviderReference.when(
                route.when,
                {
                    templateUrl: 'views/' + route.template,
                    controller: routeCtrl
                }
            );
        });
        $routeProviderReference.otherwise({
            redirectTo: '/'
        });

        $route.reload();
    });

}]);

myapp.controller('MainCtrl', function($scope,$http) {
    $scope.title = 'Main Template';

    $http.get('http://localhost:3000/db/').success(function(data) {
        $scope.pages = data;
    });
});
myapp.controller('Partial2Ctrl', function($scope,$http) {
    $scope.title = 'Template Two';
});
myapp.controller('Partial3Ctrl', function($scope,$http) {
    $scope.title = 'Template Three';
});
myapp.controller('DefaultCtrl', function($scope,$http) {
    $scope.title = 'Default';
});