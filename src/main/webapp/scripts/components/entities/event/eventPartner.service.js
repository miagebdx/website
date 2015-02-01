'use strict';

angular.module('miagebdxApp')
    .factory('EventPartner', function ($resource) {
        return $resource('api/events/partner/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                isArray: true,
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.beginDate = new Date(data.beginDate);
                    data.endDate = new Date(data.endDate);
                    return data;
                }
            }
        });
    });
