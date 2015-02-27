'use strict';

angular.module('miagebdxApp')
    .controller('PartnerDetailController', function ($scope,
                                                     Animations,
                                                     $stateParams,
                                                     Partner,
                                                     EventPartner,
                                                     gMapsAutoC) {
        $scope.partner = {};
        $scope.events = [];
        $scope.partners = [];


        $scope.load = function (id) {
            $scope.animation = Animations.getAnimation();
            EventPartner.get({id: id}, function(result){$scope.events = result;});
            Partner.get({id: id}, function(result){
                $scope.partner = result;

                var loc = JSON.parse($scope.partner.locationComplete);

                if(loc){
                    gMapsAutoC.initialize('map-canvas', { lat: loc.k, lng: loc.D}, $scope.partner.title);
                }
            });
            Partner.query(function(result){$scope.partners = result;});
        };

        $scope.load($stateParams.id);


    });
