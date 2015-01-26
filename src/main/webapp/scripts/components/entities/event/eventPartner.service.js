'use strict';

angular.module('miagebdxApp')
    .factory('EventPartner', function ($resource) {
        return $resource('api/events/partner/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                isArray: true
            }
        });
    });
