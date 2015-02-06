'use strict';


/**
 * Initialize a simple Google maps component onto the #id params.
 * Without controls expect for the zoom controls.
 *
 * @param id : String
 * @param position : Object : { lat: Float, lng: Float }
 * @return void
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


angular.module('miagebdxApp')
    .controller('EventDetailController', function ($scope,
                                                   $stateParams,
                                                   Event){
        $scope.event = {};
        $scope.load = function (id) {
            Event.get({id: id}, function(result) {
                $scope.event = result;

                var loc = JSON.parse($scope.event.locationComplete);

                if(loc){
                    initialize('map-canvas', { lat: loc.k, lng: loc.D}, $scope.event.title);
                }
            });
        };
        $scope.load($stateParams.id);

    });
