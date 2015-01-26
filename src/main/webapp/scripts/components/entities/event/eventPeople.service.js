'use strict';

angular.module('miagebdxApp')
    .factory('EventPeople', function ($resource) {
        return $resource('api/events/people/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                isArray : true
            }
        });
    });
