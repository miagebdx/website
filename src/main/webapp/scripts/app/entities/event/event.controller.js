'use strict';


/*
 * Simple constant.
 */
var MODAL_NAME = '#saveEventModal'
  , MODAL_EVENT = 'shown.bs.modal'
  , AUTOC_EVENT = 'place_changed';

/**
 * When the event 'place_changed' is triggered by the input.
 * Aka : When the user select the location in the list.
 *
 * @param input
 * @param cb
 */
function onPlaceChanged(input, cb){
    google.maps.event.addListener(input, AUTOC_EVENT, function() {
        cb(input.getPlace().geometry.location, input.getPlace().formatted_address);
    });
}

/**
 * Okay here happend the magic.
 * Create and trigger the autocomplete value when the popup is selected.
 *
 * Apply those value on the event object.
 *
 * @param $scope
 */
function setLocationOnOpend($scope){
    $(MODAL_NAME).on(MODAL_EVENT, function() {
        var ac = createAutocompleteInput('autocomplete');
        onPlaceChanged(ac, function (complete, formated) {
            $scope.$apply(function () {
                $scope.event.location = JSON.stringify(formated);
                $scope.event.locationComplete = JSON.stringify(complete);
            })
        });

    });
}

/**
 * Create a simple google.maps.places.Autocomplete component with the id in params.
 * @param id
 * @returns {google.maps.places.Autocomplete}
 */
function createAutocompleteInput(id) {
    if(id){
        var divAC = document.getElementById(id);
        /* flushing the content */
        divAC.textContent = '';
        return new google.maps.places.Autocomplete(divAC, { types: ['geocode'] });
    }
}


angular.module('miagebdxApp')
    .controller('EventController', function ($scope, $timeout, Event, People, Partner, Principal) {


        /* When the modal is shown */
        setLocationOnOpend($scope);

        $scope.events = [];
        $scope.peoples = People.query();
        $scope.partners = Partner.query();
        $scope.loadAll = function() {
            Event.query(function(result) {
               $scope.events = result;
            });
        };
        $scope.loadAll();

        $scope.isInRole = Principal.isInRole;

        $scope.create = function () {
            /*
                Okay that's quite ugly, but since the $scope.$apply is quite long, wait 0,2 sec
                to wait that the event.location are well changed.
              */
            $timeout(function () {}, 200);

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
