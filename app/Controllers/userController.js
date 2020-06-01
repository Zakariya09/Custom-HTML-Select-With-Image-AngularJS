'use strict';
angular.module('mainApp.controllers')
.controller('userController', ['$scope','$state','userService',
 function ($scope,$state,userService) {

    // declaration start
    $scope.user = {};
    $scope.users = [ ];


    //GET user
        $scope.showUserDetails = function () {
          userService.getAll(
            function (response, status, headers, config) {
              if (response.status) {
                $scope.users = response.data;
                console.log($scope.users);

              }
              else {
                toastr.error('Error while loading city List');
              }
            }, function (response, status, headers, config) {
              if (!response.status) {
                toastr.error('Error while loading city List');
              }
            });
          };
          $scope.showUserDetails();

          //POST USER
          $scope.saveUser = function (frmUser, data) {
            if (frmUser.$invalid) {
              angular.forEach(frmUser.$error.required, function (field) {
                  field.$setDirty();
              });
              return;
          }
            console.log(data);
            userService.add(data, function (response, status, headers, config) {
                        if (response.status && status === 201) {
                            toastr.success(response.message);
                            $scope.user = {};
                            //$state.go('base.managestates');
                            $scope.showUserDetails();
                        }
                        else {
                            toastr.error(response.message);
                        }
                    }, function (response, status, headers, config) {
                        if (!response.status) {
                            toastr.error(response.message);
                        }
                    });
            };
            
    //save category end
    //delete book start
    $scope.deleteUser = function (data) {
          swal({
            title: "Are you sure?",
            text: "You will not be able to recover this record!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
          },
          function(){
            var index = $scope.users.indexOf(data);
           swal("Deleted!", "Your record successfully deleted.", "success");
           $scope.users.splice(index, 1);    
          });   
    }
    //edit book details
    $scope.editUser = function(data){
            $scope.user= data;
    }
    //edit book end
}])