'use strict';

angular.module('SiiApp').controller('MainCtrl', function(Webservice, $scope, $http, $state, localStorageService, LxNotificationService) {

    $scope.searchValue = '';
    $scope.results = {};
    $scope.prompts = {};

    $scope.searchApi = function (searchQuery) {
        if(searchQuery !== 'undefined' && searchQuery.length > 1){

            $http.jsonp(Webservice, {
                method: 'GET',
                params: {
                    action: 'query',
                    format: 'json',
                    list: 'search',
                    titles: 'Main page',
                    srsearch: searchQuery
                }
            })
            .then(function (response){
                $scope.results = response.data.query.search;

                localStorageService.set('searchValue', searchQuery);
                localStorageService.set('results', $scope.results);
            }, function(data) {
                console.log(data);
            });
        }else{
            LxNotificationService.error('Zbyt krótka fraza');
        }
    };

    $scope.apiPrompt = function (searchQuery) {
        if(typeof searchQuery !== 'undefined' && searchQuery.length > 1){

            $http.jsonp(Webservice, {
                method: 'GET',
                params: {
                    action: 'query',
                    format: 'json',
                    list: 'search',
                    titles: 'Main page',
                    srsearch: searchQuery
                }
            })
            .then(function (response){
                $scope.prompts = response.data.query.search;
            }, function(data) {
                console.log(data);
            });
        }else{
            $scope.prompts = {};
        }
    };

    $scope.goToPage = function (pageId) {
        $state.go('details', {pageId: pageId})
    };

    $scope.retrieval = function () {
        $scope.searchValue = localStorageService.get('searchValue');
        $scope.results = localStorageService.get('results');
    };
    $scope.retrieval();
});