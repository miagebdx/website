'use strict';

angular.module('miagebdxApp')
    .controller('PartnerDetailController', function ($scope,
                                                     Animations,
                                                     $stateParams,
                                                     Partner,
                                                     EventPartner) {
        $scope.partner = {};
        $scope.events = [];

        $scope.load = function (id) {
            $scope.animation = Animations.getAnimation();
            EventPartner.get({id: id}, function(result){$scope.events = result;});
            Partner.get({id: id}, function(result){$scope.partner = result;});
        };


        $scope.load($stateParams.id);
    });
