mainApp.factory('commonService', ['$http', function ($http) {
    var commonServiceFactory = {};

    var _getApi = function (controller) {
        return $http.get(BASEURL + controller).then(function (results) {
            return results;
        });
    };

    var _getIdApi = function (controller, id) {
        return $http.get(BASEURL + controller + '/' + id).then(function (results) {
            return results;
        });
    };

    var _postApi = function (controller, data) {
        return $http.post(BASEURL + controller, data).then(function (results) {
            return results;
        });
    };

    var _putApi = function (controller, data) {
        return $http.put(BASEURL + controller + '/' + data.id, data).then(function (results) {
            return results;
        });
    };

    var _deactiveApi = function (controller) {
        return $http.put(BASEURL + controller).then(function (results) {
            return results;
        });
    };

    var _saveFile = function (fileData) {
        var fd = new FormData();
        fd.append('file', fileData);
        return $http.post(BASEURL, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function (response) {
            return response;
        });
    };

    commonServiceFactory.getApi = _getApi;
    commonServiceFactory.getIdApi = _getIdApi;
    commonServiceFactory.postApi = _postApi;
    commonServiceFactory.putApi = _putApi;
    commonServiceFactory.saveFile = _saveFile;
    commonServiceFactory.deactiveApi = _deactiveApi;
    return commonServiceFactory;
}]);
