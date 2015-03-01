'use strict';

angular.module('miagebdxApp')
    .controller('EventDetailController', function ($scope,
                                                   $stateParams,
                                                   Event,
                                                   gMapsAutoC){
        $scope.event = {};
        $scope.events = [];

        $scope.load = function (id) {
            Event.query(function(result){$scope.events = result;});
            Event.get({id: id}, function(result) {
                $scope.event = result;

                var loc = JSON.parse($scope.event.locationComplete);

                if(loc && $scope.event.location){
                    gMapsAutoC.initialize('map-canvas', { lat: loc.k, lng: loc.D}, $scope.event.title);
                }
            });
        };
        $scope.load($stateParams.id);

    });
