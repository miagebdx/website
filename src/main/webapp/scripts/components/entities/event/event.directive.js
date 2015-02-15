angular.module('miagebdxApp')
    .directive('listevents', function() {
    return {
        restrict: 'AE',
        templateUrl: 'scripts/app/entities/event/events-list.html'
    };
});
