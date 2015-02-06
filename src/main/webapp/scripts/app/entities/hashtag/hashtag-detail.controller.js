'use strict';

angular.module('miagebdxApp')
    .controller('HashtagDetailController', function (Animations,
                                                     $scope,
                                                     $stateParams,
                                                     Hashtag,
                                                     ArticleHashtag) {

        $scope.hashtag = {};
        $scope.articles = [];

        $scope.load = function (id) {
            $scope.animation = Animations.getAnimation();
            Hashtag.get({id: id}, function(result){$scope.hashtag = result;});
            ArticleHashtag.get({id: id}, function(result){$scope.articles = result;});
        };

        $scope.load($stateParams.id);
    });
