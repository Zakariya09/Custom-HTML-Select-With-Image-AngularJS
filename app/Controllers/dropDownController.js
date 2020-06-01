'use strict';
angular.module('mainApp.controllers')
.controller('dropDownController', ['$scope', '$state','reviewList','$localStorage','$sessionStorage',
function ($scope, $state,reviewList, $localStorage, $log, $sessionStorage, ) {
  
  $scope.binder = null;
  $scope.btnName ="Select Country";
  //Get Records
  var showList = function () {
    reviewList.getAll(
      function (response, status, headers, config) {
        if (response) {
          $scope.arr = response;
        }
        
      }, function (response, status, headers, config) { });
    };
    showList();
    
    $scope.options = ["option-1","option-2","option-3"];
    
    
    $scope.getObject = function(obj){
      console.log(obj);
    }
    $scope.moduleCall = function(name){
      console.log(name);
    }
    
    $scope.getData = function(info){
      $scope.btnName = info.name;
    }
  }])