'use strict';

angular.module('miagebdxApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('event', {
                parent: 'entity',
                url: '/event',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/event/events.html',
                        controller: 'EventController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('event');
                        return $translate.refresh();
                    }]
                }
            })
            .state('eventDetail', {
                parent: 'entity',
                url: '/event/:id',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/event/event-detail.html',
                        controller: 'EventDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('event');
                        return $translate.refresh();
                    }]
                }
            });
    });
