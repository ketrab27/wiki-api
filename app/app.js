var WikiApp = angular.module("WikiApp", [
    "lumx",
    "ngAnimate",
    "ui.router",
    "ngSanitize",
    "LocalStorageModule"
]);

// Set app variable settings
WikiApp.factory('settings', ['$rootScope', function ($rootScope) {
    var settings = {
        layout: {
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        }
    };
    $rootScope.settings = settings;

    return settings;
}]);

// Allow downloading data from external resources and configurate local storage
WikiApp.config(function($sceDelegateProvider, localStorageServiceProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://pl*.wikipedia.org/**'
    ]);

    localStorageServiceProvider
        .setPrefix('WikiApp')
        .setStorageType('sessionStorage');
});

// Set global constant value
WikiApp.factory('Webservice', function () {
    return 'https://pl.wikipedia.org/w/api.php';
});

// Application routing
WikiApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
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

// Bind default variables to the view
WikiApp.run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
    $rootScope.$state = $state;
    $rootScope.currentDate = new Date();
}]);