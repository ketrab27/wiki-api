'use strict';

angular.module('WikiApp').controller('DetailsCtrl', function(Webservice, $scope, $http, $stateParams, $state) {

    $scope.title = '';
    $scope.content = '';
    $scope.pageId = $stateParams.pageId;

    // Redirect to home page on clicking btn
    $scope.backToHome = function () {
        $state.go('home')
    };

    // Get data from api, by query parameter
    $scope.searchApi = function (pageId) {
        $http.jsonp(Webservice, {
            method: 'GET',
            params: {
                action: 'parse',
                format: 'json',
                pageid: pageId
            }
        })
        .then(function (response){
            $scope.title = response.data.parse.title;
            $scope.content = response.data.parse.text['*'];
        }, function(data) {
            console.log(data);
        });
    };

    // Call up the search function
    $scope.searchApi($scope.pageId);
});