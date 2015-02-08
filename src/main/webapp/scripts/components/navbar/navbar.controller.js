'use strict';

angular.module('miagebdxApp')
    .controller('NavbarController', function ($log, $rootScope, $scope, $location, $state, Auth, Principal) {
        $scope.isAuthenticated = Principal.isAuthenticated;
        $scope.isInRole = Principal.isInRole('ROLE_ADMIN');

        $scope.$state = $state;

        $scope.logout = function () {
            Auth.logout();
            location.reload();
        };
    });
