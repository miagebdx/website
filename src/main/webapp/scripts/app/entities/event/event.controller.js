'use strict';

/**
 * Event controller
 * @ng-controller
 * @param $scope : To access in scope
 * @param (Service) Animations : Anim ng-repeat
 * @param (Service) Event : Access to Resource Event
 * @param (Service) People : Access to Resource People
 * @param (Service) Partner : Access to Resource Partner
 * @param (Service) Principal : Context security
 * @param (Service) gMapsAutoC : Gmap integration
 * @param $timeout
 * */

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

        /* Init empty var */
        $scope.events = [];
        $scope.partners = [];
        $scope.peoples = [];

        /**
         * Load objects on array
         * Get role, animation
         * @param null
         * @public in scope
         * @return void
         * */
        $scope.loadAll = function() {
            $scope.isInRole = Principal.isInRole;
            $scope.animation = Animations.getAnimation();
            People.query( function( result ){ $scope.peoples = result; } );
            Partner.query( function( result ){ $scope.partners = result; } );
            Event.query( function( result ){ $scope.events = result; } );
        };

        $scope.loadAll();

        /**
         * Load a form in order create item
         * @param id : integer
         * @required (service) Gmaps
         * @public in $scope
         * **/
        $scope.create = function () {

            gMapsAutoC.getLocationComplete();

            Event.save($scope.event,
                function () {
                    $scope.loadAll();
                    $('#saveEventModal').modal('hide');
                    $scope.clear();
                });
        };

        /**
         * Load a form in order update item
         * @param id : Integer
         * @public in $scope
         * **/
        $scope.updateEvent = function (id) {
            Event.get({id: id}, function (resultEvent) {
                $scope.event = resultEvent;
                $('#saveEventModal').modal('show');

            });


        };

        /**
         * Load a form in order delete item
         * @param id : Integer
         * @public in $scope
         * **/
        $scope.deleteEvent = function (id) {
            $scope.event = Event.get({id: id});
            $('#deleteEventConfirmation').modal('show');
        };

        /**
         * Confirm delete and refresh $scope
         * @param id : Integer
         * @public in $scope
         * **/
        $scope.confirmDelete = function (id) {
            Event.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteEventConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        /**
         * Clear $scope
         * @public in $scope
         * **/
        $scope.clear = function () {
            $scope.event = {title: null, description: null, beginDate: null, endDate: null, pinned: null, location: null, locationComplete:null, id: null};
        };

    });
