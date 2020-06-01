'use strict';
angular.module('mainApp.controllers', [])
	.controller('LoginController', ['$rootScope', '$scope', '$localStorage', 'commonService', '$state', '$log',
	   function ($rootScope, $scope, $localStorage, commonService, $state, $log) {
	       $scope.user = {};
	       $scope.users = [];

	       //Get Login Details
	       $scope.login = function (data) {
	           $state.go('base.dashboard');
	          // commonService.postApi('User/LoginValidate', data)
              //.then(function (response) {
              //    if (response.data.status) {
              //        //toastr.success('Login Success....!');
              //        $state.go('base.dashboard');
              //    } else {
              //        toastr.error('Error in login');
              //        console.log('Failed: LoginController: login');
              //        console.log(response);
              //    }
              //}, function (error) {
              //    toastr.error('Error in login');
              //    console.log('Error: LoginController: login');
              //    console.log(error);
              //})
	       };
	   }]);