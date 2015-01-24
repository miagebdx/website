'use strict';

angular.module('miagebdxApp')
    .factory('ArticleHashtag', function ($resource) {
        return $resource('api/articles/hashtag/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET', isArray:true
            }
        });
    });
