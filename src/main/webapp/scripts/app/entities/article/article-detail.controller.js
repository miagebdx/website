'use strict';

angular.module('miagebdxApp')
    .controller('ArticleDetailController', function ($scope,Animations, $stateParams, Article) {
        $scope.article = {};
        $scope.animation = Animations[Math.floor((Math.random() * 14) + 1)];
        $scope.load = function (id) {
            Article.get({id: id}, function(result) {
              $scope.article = result;
            });
        };
        $scope.load($stateParams.id);
    });
