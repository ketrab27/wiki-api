'use strict';

angular.module('WikiApp').controller('MainCtrl', function(Webservice, $scope, $http, $state, localStorageService, LxNotificationService, $timeout) {

    $scope.searchValue = '';
    $scope.results = {};
    $scope.prompts = {};
    $scope.showPrompt = false;

    // Show/hide prompt, depends of search input focus
    $scope.togglePrompt = function(status) {
        $timeout(function(){
            $scope.showPrompt = status;
        }, 300);
    };

    // Download search results from wiki api and store it in local storage
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

    // Download data from api and show as prompt
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

    // Redirecting on clicking prompt
    $scope.goToPage = function (pageId) {
        $state.go('details', {pageId: pageId})
    };

    // On refreshing page, show searched data from local storage
    $scope.retrieval = function () {
        $scope.searchValue = localStorageService.get('searchValue');
        $scope.results = localStorageService.get('results');
    };
    $scope.retrieval();
});