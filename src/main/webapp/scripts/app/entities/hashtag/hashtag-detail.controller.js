'use strict';

angular.module('miagebdxApp')
    .controller('HashtagDetailController', function ($scope, $stateParams, Hashtag, ArticleHashtag) {
        $scope.hashtag = {};
        $scope.load = function (id) {
            Hashtag.get({id: id}, function(result) {
              $scope.hashtag = result;
            });
            $scope.articles = ArticleHashtag.get({id: id});
        };

        $scope.load($stateParams.id);
    });
