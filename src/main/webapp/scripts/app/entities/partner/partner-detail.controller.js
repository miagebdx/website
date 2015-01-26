'use strict';

angular.module('miagebdxApp')
    .controller('PartnerDetailController', function ($scope, $stateParams, Partner, EventPartner) {
        $scope.partner = {};
        $scope.load = function (id) {
            Partner.get({id: id}, function(result) {
              $scope.partner = result;
            });
            $scope.events = EventPartner.get({id: id});
        };


        $scope.load($stateParams.id);
    });
