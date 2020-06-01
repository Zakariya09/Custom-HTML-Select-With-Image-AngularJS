mainApp.directive('selectTwo', ['$timeout', function($timeout) {
	return {
    restrict: 'EA',
    transclude: true,
    terminal: true,
    scope: {
      items: "=",
      itemsSelected: "="
    },
    link: function($scope, $element, $attrs, $controller) {

      //format options https://select2.github.io/select2/#documentation
      function format(state) {

        //init default state
        var optionTemplate = state.text;
        if (!state.id || state.id == 0) { //option group or no selection item
          return optionTemplate;
        }

        return optionTemplate;
      }

      //init on load
      $timeout(function() {

        //if multiple options are possible, parse an comma seperated list into itemsSelected like 1,2,5,23,21
        if (angular.isString($scope.itemsSelected) && $scope.itemsSelected.split(',').length > 1) {
          $scope.itemsSelected = $scope.itemsSelected.split(',');
        }

        $($element[0]).select2({
          formatResult: format,
          formatSelection: format,
          escapeMarkup: function(m) {
            return m;
          }
        }).val($scope.itemsSelected == undefined ? [0] : [$scope.itemsSelected]).trigger("change");
      });
    }
  };
}]);