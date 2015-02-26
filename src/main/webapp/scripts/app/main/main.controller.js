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


        $scope.slides = [
            '../../assets/images/001.jpg',
            '../../assets/images/002.jpg',
            '../../assets/images/003.jpg'
        ];
    });
