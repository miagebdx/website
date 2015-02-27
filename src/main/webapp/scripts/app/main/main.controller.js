'use strict';

angular.module('miagebdxApp')
    .controller('MainController', function (Animations,
                                            $scope,
                                            Principal,
                                            Article,
                                            Event) {

        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
        });

        $scope.articles = [];
        $scope.events = [];



        $scope.loadAll = function() {
            $scope.animation = Animations.getAnimation();
            Article.query(function(result){$scope.articles = result;});
            Event.query(function(result){$scope.events = result;});
        };
        $scope.loadAll();

        $(function() {
            $(".rslides").responsiveSlides();
        });
    });
