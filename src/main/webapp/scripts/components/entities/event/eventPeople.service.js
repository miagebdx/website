'use strict';

angular.module('miagebdxApp')
    .factory('EventPeople', function ($resource) {
        return $resource('api/events/people/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                isArray: true,
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    if(data.beginDate && data.endDate) {
                        data.beginDate = new Date(data.beginDate);
                        data.endDate = new Date(data.endDate);
                    }
                    return data;
                }
            }
        });
    });
