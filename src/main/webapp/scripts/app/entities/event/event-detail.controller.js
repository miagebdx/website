'use strict';


/**
 * Initialize a simple Google maps component onto the #id params.
 * Without controls expect for the zoom controls.
 *
 * @param id : String
 * @param position : Object : { lat: Float, lng: Float }
 * @return void
 */
function initialize(id, position) {
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
    }
}


angular.module('miagebdxApp')
    .controller('EventDetailController', function ($scope, $stateParams, Event, People, Partner) {
        $scope.event = {};
        $scope.load = function (id) {
            Event.get({id: id}, function(result) {
              $scope.event = result;
            });
        };
        $scope.load($stateParams.id);

        /* Fake attribute for example purpose only.  */
        initialize('map-canvas', { lat: -34.397, lng: 150.644});
    });
