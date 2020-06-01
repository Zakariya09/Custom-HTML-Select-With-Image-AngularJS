'use strict';
angular.module('mainApp.services', [])
    
    .service('reviewList', ['$http', '$localStorage', function ($http, $localStorage) {
        return {
            getAll: function (successCallback, failureCallback) {
                $http.get(BASE_URL).success(successCallback).error(failureCallback);
            }
        };
    }]);














