/**
 * Created by llaine on 27/02/15.
 */


'use strict';

angular.module('miagebdxApp')
    .service('gMapsAutoC', function () {
        /*
         * Simple constant.
         */
        var MODAL_NAME = '.modal'
          , MODAL_EVENT = 'shown.bs.modal'
          , AUTOC_EVENT = 'place_changed'
          , DURATION_WAIT = 1000;

        /**
         * When the event 'place_changed' is triggered by the input.
         * Aka : When the user select the location in the list.
         *
         * @param input
         * @param cb
         * @private
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
         * @param object
         * @public
         */
        function setLocationOnOpend($scope, type){
            $(MODAL_NAME).on(MODAL_EVENT, function() {
                var ac = createAutocompleteInput('autocomplete');
                onPlaceChanged(ac, function (complete, formated) {
                    $scope.$apply(function () {
                        switch(type){
                            case 'event':
                                $scope.event.location = formated;
                                $scope.event.locationComplete = JSON.stringify(complete);
                                break;
                            case 'people':
                                $scope.people.location = formated;
                                $scope.people.locationComplete = JSON.stringify(complete);
                                break;
                            case 'partner':
                                $scope.partner.location = formated;
                                $scope.partner.locationComplete = JSON.stringify(complete);
                                break;
                        }
                    });
                });
            });
        }

        /**
         * Create a simple google.maps.places.Autocomplete component with the id in params.
         * @param id
         * @returns {google.maps.places.Autocomplete}
         * @private
         */
        function createAutocompleteInput(id) {
            if(id){
                var divAC = document.getElementById(id);
                /* flushing the content */
                divAC.textContent = '';
                return new google.maps.places.Autocomplete(divAC, { types: ['geocode'] });
            }
        }


        /**
         * Initialize a simple Google maps component onto the #id params.
         * Without controls expect for the zoom controls.
         *
         * @param id : String
         * @param position : Object : { lat: Float, lng: Float }
         * @return void
         * @public
         */
        function initialize(id, position, title) {
            if(id && position){
                var mapOptions = {
                    center: position,
                    zoom: 8,
                    streetViewControl: false,
                    mapTypeControl: false,
                    panControl: false,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.SMALL,
                        position: google.maps.ControlPosition.TOP_RIGHT
                    }
                };

                var map = new google.maps.Map(document.getElementById(id),
                    mapOptions);

                var infowindow = new google.maps.InfoWindow({
                    content: '<div class="container">' +
                    '<h1>' + title + '</h1>' +
                    '</div>'
                });

                var marker = new google.maps.Marker({
                    position: position,
                    map: map
                });

                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map,marker);
                });
            }

        }

        function getLocationComplete(){
            /*
             Okay that's quite ugly, but since the $scope.$apply is quite long, wait 0,2 sec
             to wait that the event.location are well changed.
             */
            setTimeout(function () {}, DURATION_WAIT);
        }


        return {
            setLocationOnOpend:setLocationOnOpend,
            initialize:initialize,
            getLocationComplete:getLocationComplete
        };
    });
