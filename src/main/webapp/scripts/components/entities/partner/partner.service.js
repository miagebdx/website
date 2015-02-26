'use strict';

angular.module('miagebdxApp')
    .factory('Partner', function ($resource) {
        return $resource('api/partners/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    if( data.logo !== null ){ data.image = JSON.parse(data.logo); }
                    return data;
                }
            }
        });
    });
