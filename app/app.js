var SiiApp = angular.module("SiiApp", [
    "lumx",
    "ngAnimate",
    "ui.router",
    "ngSanitize",
    "LocalStorageModule"
]);

SiiApp.factory('settings', ['$rootScope', function ($rootScope) {
    var settings = {
        layout: {
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        }
    };
    $rootScope.settings = settings;

    return settings;
}]);

SiiApp.config(function($sceDelegateProvider, localStorageServiceProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://pl*.wikipedia.org/**'
    ]);

    localStorageServiceProvider
        .setPrefix('SiiApp')
        .setStorageType('sessionStorage');
});

SiiApp.factory('Webservice', function () {
    return 'https://pl.wikipedia.org/w/api.php';
});

SiiApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        // Redirect any unmatched url
        $urlRouterProvider.otherwise("/");

        $locationProvider.html5Mode(true).hashPrefix('!');

        $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: "app/views/home.html",
                    controller: 'MainCtrl',
                    data: {pageTitle: 'strona główna'}
                })

                .state('details', {
                    url: '/wiki/:pageId',
                    templateUrl: "app/views/details.html",
                    controller: 'DetailsCtrl',
                    data: {pageTitle: 'szczegóły z Wiki'}
                })
    }]);

SiiApp.run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
    $rootScope.$state = $state;
    $rootScope.currentDate = new Date();
}]);