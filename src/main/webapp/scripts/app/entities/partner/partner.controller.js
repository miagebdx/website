'use strict';

angular.module('miagebdxApp')
    .controller('PartnerController', function ($scope,
                                               Animations,
                                               Partner,
                                               Event,
                                               Principal,
                                               gMapsAutoC) {


        /* When the modal is shown, trigger autocomplete input creation. */
        gMapsAutoC.setLocationOnOpend($scope, 'partner');

        $scope.partners = [];
        $scope.events = [];

        $scope.loadAll = function() {
            $scope.isInRole = Principal.isInRole;
            $scope.animation = Animations.getAnimation();
            Event.query(function(result){$scope.events = result;});
            Partner.query(function(result){$scope.partners = result;});
        };

        $scope.getImage = function(partner){
            return JSON.parse(partner.logo);
        };

        $scope.loadAll();

        $scope.create = function () {

            gMapsAutoC.getLocationComplete();

            Partner.save($scope.partner,
                function () {
                    $scope.loadAll();
                    $('#savePartnerModal').modal('hide');
                    $scope.clear();
                });
        };

        $scope.update = function (id) {
            $scope.partner = Partner.get({id: id});
            $('#savePartnerModal').modal('show');
        };

        $scope.delete = function (id) {
            $scope.partner = Partner.get({id: id});
            $('#deletePartnerConfirmation').modal('show');
        };

        $scope.confirmDelete = function (id) {
            Partner.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deletePartnerConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.clear = function () {
            $scope.partner = {name: null, location: null, locationComplete:null,  description: null, website: null, email: null, logo: null, telephone: null, id: null};
        };
    });
