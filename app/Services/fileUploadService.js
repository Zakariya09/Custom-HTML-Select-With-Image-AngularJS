mainApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

mainApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function (uploadUrl, file, data, sucessFileCallBack, faileFileCallback) {
        console.log("File Upload URL ="+uploadUrl);
        console.log("Data ");
        console.log(data);

        //var fd = Object.toFormData(data);
        var fd = new FormData();
        fd.append('file', file);
        for(key in data){
            
            fd.append(key, data[key]);
        }

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
        .success(function (data) {
            sucessFileCallBack(data);
        })
        .error(function (error) {
            console.log(error);
            faileFileCallback(error);
        });
    }
}]); 