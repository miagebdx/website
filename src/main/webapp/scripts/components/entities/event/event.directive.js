angular.module('miagebdxApp')
    .directive('listevents', function() {
    return {
        restrict: 'AE',
        scope: {
            events: '=events',
            animation:'=anim',
            isInRole: '=role',
            search: '=search'
        },
        templateUrl: 'scripts/app/entities/event/events-list.html'
    };
});
