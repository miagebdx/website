'use strict';

angular.module('miagebdxApp')
    .controller('PartnerDetailController', function ($scope,Animations, $stateParams, Partner, EventPartner) {
        $scope.partner = {};
        $scope.animation = Animations[Math.floor((Math.random() * 14) + 1)];
        $scope.load = function (id) {
            Partner.get({id: id}, function(result) {
              $scope.partner = result;
            });
            $scope.events = EventPartner.get({id: id});
        };


        $scope.load($stateParams.id);
    });
