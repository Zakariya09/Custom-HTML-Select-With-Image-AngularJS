
var mainApp = angular.module('mainApp',
    ['ui.router',
    'mainApp.controllers',
    'mainApp.services',
     'http-auth-interceptor',
     'ngStorage',
     'ngResource',
     'ngFileUpload',
     'chieffancypants.loadingBar',
     'ladda',
     'ngAnimate',
     'ngSanitize',
     '720kb.datepicker',
     'ui.bootstrap',
     'angularUtils.directives.dirPagination',
     'selectize',
    ]
 );

mainApp.constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    user: 'user'
});

var BASE_URL = "https://restcountries.eu/rest/v2/all"
var IMAGE_URL = "http://justooh-live-development.azurewebsites.net/flags-mini/";

mainApp.config([
    '$stateProvider', '$urlRouterProvider', '$locationProvider', 'cfpLoadingBarProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
        $urlRouterProvider.otherwise("Drop-Down");
        $stateProvider
            //Media owner and advertizing agency base started
            .state('base', {
                abstract: true,
                url: '/',
                views: {
                    "": {
                        templateUrl: './app/Templates/_tpl.base.html',
                    },
                    "header@base": {
                        templateUrl: './app/Views/Common/_header.html',
                    },
                   
                    "footer@base": {
                        templateUrl: './app/Views/Common/_footer.html',
                    }
                }

            })
            //Media owner and advertizing agency base ended

            //Admin base started
              .state('adminBase', {
                  abstract: true,
                  url: '/',
                  views: {
                      "": {
                          templateUrl: './app/Templates/_tpl.adminBase.html',
                      },
                      "header@adminBase": {
                          templateUrl: './app/Views/Admin/Common/_header.html',
                          //controller: 'AdminController'
                      },
                    //   "sidebar@adminBase": {
                    //       templateUrl: './app/Views/Admin/Common/_sidebar.left.html',
                    //   },
                      "footer@adminBase": {
                          templateUrl: './app/Views/Admin/Common/_footer.html',
                      }
                  }
              })
            //Admin base ended

            //Sub admin base started
            .state('subAdminBase', {
                abstract: true,
                url: '/',
                views: {
                    "": {
                        templateUrl: './app/Templates/_tpl.subAdminBase.html',
                    },
                    "header@subAdminBase": {
                        templateUrl: './app/Views/SubAdmin/Common/_header.html',
                        controller: 'SubAdminController'
                    },
                    
                    "footer@subAdminBase": {
                        templateUrl: './app/Views/SubAdmin/Common/_footer.html',
                    }
                }
            })
            //Sub admin base ended

            //Auth states started
            .state('auth', {
                abstract: true,
                url: '/',
                templateUrl: './app/Templates/_tpl.auth.html',
            })

            .state('auth.login', {
                url: 'login',
                views: {
                    'body@auth': {
                        templateUrl: './app/Views/_login.html',
                        controller: 'LoginController'
                    }
                }
            })

            .state('base.Drop-Down', {
                url: 'Drop-Down',
                views: {
                    'body@base': {
                        templateUrl: './app/Views/_dropDown.html',
                        controller: 'dropDownController'
                    }
                }
            })  
    }
]);

mainApp.run(
    ['$rootScope', '$location', '$http', '$q', '$state', '$stateParams', '$localStorage',
    function ($rootScope, $location, $http, $q, $state, $stateParams, $localStorage) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.BASE_URL = BASE_URL;
        $rootScope.IMAGE_URL = IMAGE_URL;
        $state.transitionTo('auth.login');

        //Here we check if user is not login and try to enter in system then must be redirected to login
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

        });
    }]);