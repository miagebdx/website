'use strict';

angular.module('miagebdxApp')
    .controller('ArticleDetailController', function ($scope, $stateParams, Article, People, Hashtag) {
        $scope.article = {};
        $scope.load = function (id) {
            Article.get({id: id}, function(result) {
              $scope.article = result;
            });
        };
        $scope.load($stateParams.id);
    });
