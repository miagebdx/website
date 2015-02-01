'use strict';

angular.module('miagebdxApp')
    .controller('PartnerController', function ($scope, Animations, Partner, Event, Principal) {
        $scope.partners = [];
        $scope.events = Event.query();
        $scope.animation = Animations[Math.floor((Math.random() * 14) + 1)];
        $scope.loadAll = function() {
            Partner.query(function(result) {
               $scope.partners = result;
            });
        };
        $scope.loadAll();
        $scope.isInRole = Principal.isInRole;

        $scope.create = function () {
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
            $scope.partner = {name: null, location: null, description: null, website: null, email: null, logo: null, telephone: null, id: null};
        };
    });
