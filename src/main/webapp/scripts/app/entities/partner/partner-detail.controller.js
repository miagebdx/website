'use strict';

angular.module('miagebdxApp')
    .controller('PartnerDetailController', function ($scope, $stateParams, Partner, Event) {
        $scope.partner = {};
        $scope.load = function (id) {
            Partner.get({id: id}, function(result) {
              $scope.partner = result;
            });
        };
        $scope.load($stateParams.id);
    });
