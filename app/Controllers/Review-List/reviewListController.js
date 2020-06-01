'use strict';
angular.module('mainApp.controllers')
.controller('reviewListController', ['$scope', '$state','reviewList','$localStorage','$sessionStorage',
 function ($scope, $state,reviewList, $localStorage, $log, $sessionStorage, ) {

      $scope.list = [];
      $scope.list = {};
      
      function initSearchfilterOptions() {
        $scope.searchFilterOptions = {
          jobNumber: '',
          firstName: '',
          doctorName:'',
            
        };
    }
   
    initSearchfilterOptions();
    let paginationOptions = getPaginationOptions();
    paginationOptions.pageNumber = 1;
    $scope.gridOptions = getGridOptionsVerticalScroll();
    $scope.gridOptions.data = [];
    $scope.isSearchDisabled = false;

    //Server side pagination
    $scope.gridOptions.onRegisterApi = (gridApi) => {
        $scope.gridApi = gridApi;
        $scope.gridApi.infiniteScroll.on.needLoadMoreData($scope, showList);
        $scope.gridApi.core.on.sortChanged($scope, (grid, sortColumns) => {
            if (sortColumns.length === 0) {
                paginationOptions.sort = 'asc';
            } else {
                paginationOptions.sort = sortColumns[0].sort.direction;
                paginationOptions.sortColumn = sortColumns[0].name;
            }
            $scope.search();
        });
    };
    $scope.gridOptions.columnDefs = [
      //{ name: 'index', displayName: 'No', width: '50' },
      { name: 'jobNumber', displayName: 'Job No', width: '100' },
      {
          name: 'firstName', field: "fake", displayName: "First Name", width: '150',
          cellTemplate: `<a ng-click="grid.appScope.showList(row.entity, 2)">{{row.entity.firstName}}</a>`
      },
      { name: 'doctorName', displayName: 'Doctor Name', width: '150',
      cellTemplate: `<a ng-click="grid.appScope.showList(row.entity, 2)">{{row.entity.doctorName}}</a>` },
     
  ];

     //Referesh table data
     $scope.refreshData = () => {
      $scope.gridOptions.data = $filter('filter')(list, $scope.searchText);
  };

  $scope.search = function () {       
      paginationOptions.pageNumber = 1;
      $scope.gridOptions.data = [];
      showList();
  };

  $scope.clearSearch = function () {
      initSearchfilterOptions();
      $scope.search();
  };

    //Get Records
    var showList = function () {
      var search = null;
      $scope.searchText = '';
      let pageNumber = paginationOptions.pageNumber;
      let pageSize = $scope.gridOptions.paginationPageSize;
      let sortColumn = paginationOptions.sortColumn === undefined ? '' : paginationOptions.sortColumn;
      let sortOrder = paginationOptions.sort;

        reviewList.getAll(
          function (response, status, headers, config) {
            if (response.status && response.data !== null && response.data.length > 0) {
              paginationOptions.pageNumber++;
              $scope.list = $scope.gridOptions.data.concat(response.data);
              console.log( $scope.list);
              $scope.gridApi.infiniteScroll.dataLoaded();
              $scope.gridOptions.data = $scope.list;
            }
           
          }, function (response, status, headers, config) { });
        };
        if ($localStorage.isPending === true) {
          initSearchfilterOptions();
          $scope.searchFilterOptions.status = 'Pending';
          $scope.searchFilterOptions.doctor = null;
          $localStorage.isPending = false;
          showList();
      }
      else if ($localStorage.isPending === false) {
          showList();
      }
  
        $scope.recordData = function(data){
          console.log(data);
      //  $localStorage.recordsData  = angular.copy(data);

    }


   
}])