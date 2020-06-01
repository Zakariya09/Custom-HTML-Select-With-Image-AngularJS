'use strict';
angular.module('mainApp.controllers')
	.controller('HeaderController', ['$scope', '$localStorage', '$log', 'commonService', '$state',
	 function ($scope, $localStorage, $log, commonService, $state) {
	     $scope.user = {  };
	     $scope.user = $localStorage.user;
	     $scope.profile = {};
	     $scope.IMAGE_URL = IMAGE_URL;

	     //Change password
	     $scope.changePassword = function (profile) {
	         console.log(profile);
	         profile.userID = $localStorage.user.userID;
	         commonService.postApi('user/ChangePassword', profile)
                 .then(function (response) {
                     if (response.data.status) {
                         $log.log(response.data.message);
                         if (response.data.message == 'Password Changed Successfully..') {

                             toastr.success(response.data.message);
                         } else {
                             toastr.error(response.data.message);
                         }
                     } else {
                         toastr.error('Invalid old password');
                         console.log('Failed: userProfileController: changePassword');
                         console.log(response);
                     }
                 }, function (error) {
                     toastr.error('Error', 'OOps something went wrong', 'warning');
                     console.log('Error: userProfileController: changePassword');
                     console.log(error);
                 })
	     }
	     //Get Company Details
	     //$scope.showUser = function () {
	     //    commonService.getApi('User/ShowUser/' + $localStorage.user.userID)
         //     .then(
         //        function (response) {
         //            console.log(response.data.data);
         //            $scope.user = response.data.data;
         //        },
         //        function (error) {
         //            toastr.error('Invalid credentails');
         //        });
	     //}
	     //$scope.showUser();

	     $scope.emptyUserSession = function () {
	         $localStorage.user = undefined;
	         $state.go('auth.login');
	     }
	 }]);