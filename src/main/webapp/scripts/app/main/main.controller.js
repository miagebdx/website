'use strict';

angular.module('miagebdxApp')
    .controller('MainController', function ($scope, Principal) {
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
