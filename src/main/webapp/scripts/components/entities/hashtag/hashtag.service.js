'use strict';

angular.module('miagebdxApp')
    .factory('Hashtag', function ($resource) {
        return $resource('api/hashtags/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            }
        });
    });
