'use strict';

angular.module('miagebdxApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


