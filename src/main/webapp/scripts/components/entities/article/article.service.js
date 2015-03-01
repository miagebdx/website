'use strict';

angular.module('miagebdxApp')
    .factory('Article', function ($resource) {
        return $resource('api/articles/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    if( data.date ){
                        var data2form = data.date.split("-");
                        data.date = new Date(new Date(data2form[0], data2form[1] - 1, data2form[2]));

                    }
                    return data;
                }
            }
        });
    });
