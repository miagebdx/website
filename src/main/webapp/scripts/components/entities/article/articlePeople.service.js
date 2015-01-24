'use strict';

angular.module('miagebdxApp')
    .factory('ArticlePeople', function ($resource) {
        return $resource('api/articles/people/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET', isArray:true
            }
        });
    });
