'use strict';

angular.module('miagebdxApp')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
