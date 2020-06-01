'use strict';
angular.module('mainApp.controllers')
.controller('reviewDetailsController', ['$scope', '$state','$localStorage', '$log', '$sessionStorage','reviewList',
 function ($scope, $state, $localStorage, $log, $sessionStorage, reviewList ) {

  $scope.recordDetails =   $localStorage.recordsData;
  console.log($scope.recordDetails);


   
}])