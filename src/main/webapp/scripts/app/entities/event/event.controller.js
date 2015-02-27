'use strict';

angular.module('miagebdxApp')
    .controller('EventController', function ($scope,
                                             Animations,
                                             $timeout,
                                             Event,
                                             Principal,
                                             People,
                                             Partner,
                                             gMapsAutoC) {

        /* When the modal is shown, trigger autocomplete input creation. */
        gMapsAutoC.setLocationOnOpend($scope, 'event');

        $scope.events = [];
        $scope.partners = [];
        $scope.peoples = [];

        $scope.loadAll = function() {
            People.query(function(result){$scope.peoples = result;});
            Partner.query(function(result){$scope.partners = result;});
            $scope.isInRole = Principal.isInRole;
            $scope.animation = Animations.getAnimation();
            Event.query(function(result){$scope.events = result;});
        };

        $scope.loadAll();

        $scope.create = function () {

            gMapsAutoC.getLocationComplete();

            Event.save($scope.event,
                function () {
                    $scope.loadAll();
                    $('#saveEventModal').modal('hide');
                    $scope.clear();
                });
        };

        $scope.updateEvent = function (id) {
            Event.get({id: id}, function (resultEvent) {
                $scope.event = resultEvent;
                $('#saveEventModal').modal('show');

            });


        };

        $scope.deleteEvent = function (id) {
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
            $scope.event = {title: null, description: null, beginDate: null, endDate: null, pinned: null, location: null, locationComplete:null, id: null};
        };

    });
