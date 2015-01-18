'use strict';

angular.module('miagebdxApp')
    .controller('EventController', function ($scope, Event, People, Partner) {
        $scope.events = [];
        $scope.peoples = People.query();
        $scope.partners = Partner.query();
        $scope.loadAll = function() {
            Event.query(function(result) {
               $scope.events = result;
            });
        };
        $scope.loadAll();

        $scope.create = function () {
            Event.save($scope.event,
                function () {
                    $scope.loadAll();
                    $('#saveEventModal').modal('hide');
                    $scope.clear();
                });
        };

        $scope.update = function (id) {
            $scope.event = Event.get({id: id});
            $('#saveEventModal').modal('show');
        };

        $scope.delete = function (id) {
            $scope.event = Event.get({id: id});
            $('#deleteEventConfirmation').modal('show');
        };

        $scope.confirmDelete = function (id) {
            Event.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteEventConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.clear = function () {
            $scope.event = {title: null, description: null, beginDate: null, endDate: null, pinned: null, location: null, id: null};
        };
    });
