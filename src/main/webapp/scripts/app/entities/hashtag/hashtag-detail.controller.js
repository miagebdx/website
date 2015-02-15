'use strict';

angular.module('miagebdxApp')
    .controller('HashtagDetailController', function (Animations,
                                                     $scope,
                                                     $stateParams,
                                                     Hashtag,
                                                     ArticleHashtag) {

        $scope.hashtag = {};
        $scope.articles = [];
        $scope.hashtags = [];

        $scope.load = function (id) {
            Hashtag.query(function(result){$scope.hashtags = result;});
            $scope.animation = Animations.getAnimation();
            Hashtag.get({id: id}, function(result){$scope.hashtag = result;});
            ArticleHashtag.get({id: id}, function(result){$scope.articles = result;});
        };

        $scope.load($stateParams.id);
    });
