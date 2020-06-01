'use strict';
angular.module('mainApp.controllers')
	.controller('SideMenuBarController', ['$rootScope', '$scope', '$localStorage',
	                                function ($rootScope, $scope, $localStorage) {
	                                    $scope.user = $localStorage.user;
 }]);