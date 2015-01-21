'use strict';

angular.module('miagebdxApp')
    .controller('HashtagDetailController', function ($scope, $stateParams, Hashtag, Article) {
        $scope.hashtag = {};
        $scope.load = function (id) {
            Hashtag.get({id: id}, function(result) {
              $scope.hashtag = result;
            });
        };


        $scope.loadAll();
        $scope.load($stateParams.id);
    });
