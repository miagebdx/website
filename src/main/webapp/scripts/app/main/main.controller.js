'use strict';

angular.module('miagebdxApp')
    .controller('MainController', function ($scope, Principal, Article) {

        $scope.articles = [];

        $scope.loadAll = function() {
            Article.query(function(result) {
                $scope.articles = result;
            });
        };
        $scope.loadAll();

        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
        });

        $scope.myInterval = 4000;

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
