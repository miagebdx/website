'use strict';

angular.module('miagebdxApp')
    .controller('HashtagDetailController', function (Animations, $scope, $stateParams, Hashtag, ArticleHashtag) {
        $scope.hashtag = {};
        $scope.animation = Animations[Math.floor((Math.random() * 14) + 1)];
        $scope.load = function (id) {
            Hashtag.get({id: id}, function(result) {
              $scope.hashtag = result;
            });
            $scope.articles = ArticleHashtag.get({id: id});
        };

        $scope.load($stateParams.id);
    });
