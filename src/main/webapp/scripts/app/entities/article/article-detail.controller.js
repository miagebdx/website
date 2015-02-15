'use strict';

angular.module('miagebdxApp')
    .controller('ArticleDetailController', function ($scope,
                                                     Animations,
                                                     $stateParams,
                                                     Article){
        $scope.article = {};

        $scope.load = function (id) {
            $scope.animation = Animations.getAnimation();
            Article.get({id: id}, function(result){$scope.article = result;});
        };

        $scope.load($stateParams.id);

    });
