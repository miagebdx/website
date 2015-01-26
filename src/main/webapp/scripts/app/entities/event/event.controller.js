'use strict';


/*
 * Simple constant.  
 */
var MODAL_NAME = '#saveEventModal'
  , MODAL_EVENT = 'shown.bs.modal'
  , AUTOC_EVENT = 'place_changed'
  , ZINDEX_VAL = 10000;



/**
 * When the event 'place_changed' is triggered by the input.
 * Aka : When the user select the location in the list.
 *
 * @param input
 * @param cb
 */
function onPlaceChanged(input, cb){
    google.maps.event.addListener(input, AUTOC_EVENT, function() {
        cb(input.getPlace());
    });
}

/**
 * Function which create an autocomplete input
 * when the map is opened.
 * @param cb
 */
function onModalOpend(cb){
    $(MODAL_NAME).on(MODAL_EVENT, function() {
        cb(createAutocompleteInput('autocomplete'));
    });
}


/**
 * Create a simple google.maps.places.Autocomplete component with the id in params.
 * @param id
 * @returns {google.maps.places.Autocomplete}
 */
function createAutocompleteInput(id) {
    if(id){
        return new google.maps.places.Autocomplete((document.getElementById(id)), { types: ['geocode'] });
    }
}

/**
 * Todo refacto : does not work yet.
 */
function changeZindexLocation(){
    $(".pac-container").css("z-index", ZINDEX_VAL);
}


angular.module('miagebdxApp')
    .controller('EventController', function ($scope, Event, People, Partner, Principal) {

        var inputLocation;


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

            // TODO Refacto
            /*
            Case 1 : When event is not triggered.
            Case 2 : Check state before saving
             */
            onPlaceChanged(inputLocation, function (location) {

                $scope.event.location = JSON.stringify(location.geometry);

                Event.save($scope.event,
                    function () {
                        $scope.loadAll();
                        $('#saveEventModal').modal('hide');
                        $scope.clear();
                    });
            });


        };

        $scope.updateEvent = function (id) {
            $scope.event = Event.get({id: id});
            $('#saveEventModal').modal('show');
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
            $scope.event = {title: null, description: null, beginDate: null, endDate: null, pinned: null, location: null, id: null};
        };


        /* When the modal is shown */
        onModalOpend(function (autocomplete) {
            inputLocation = autocomplete;
            changeZindexLocation();
        });
    });
