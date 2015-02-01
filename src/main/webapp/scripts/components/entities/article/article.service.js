'use strict';

angular.module('miagebdxApp')
    .factory('Article', function ($resource) {
        return $resource('api/articles/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET'
            }
        });
    });
