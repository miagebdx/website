'use strict';

angular.module('miagebdxApp')
    .controller('EventDetailController', function ($scope, $stateParams, Event, People, Partner) {
        $scope.event = {};
        $scope.load = function (id) {
            Event.get({id: id}, function(result) {
              $scope.event = result;
            });
        };
        $scope.load($stateParams.id);
    });
