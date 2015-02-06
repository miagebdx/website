'use strict';

angular.module('miagebdxApp')
    .controller('MainController', function (Animations,
                                            $scope,
                                            Principal,
                                            Article,
                                            Event) {

        $scope.articles = [];
        $scope.events = [];


        $scope.loadAll = function() {
            $scope.animation = Animations.getAnimation();
            Article.query(function(result){$scope.articles = result;});
            Event.query(function(result){$scope.events = result;});
        };
        $scope.loadAll();

        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
        });

        $scope.myInterval = 2000;

        $scope.slides = [
            {
                image: '../../assets/images/001.jpg'
            },
            {
                image: '../../assets/images/002.jpg'
            },
            {
                image: '../../assets/images/003.jpg'
            }
        ];
    });
