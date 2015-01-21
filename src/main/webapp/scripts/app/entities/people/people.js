'use strict';

angular.module('miagebdxApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('people', {
                parent: 'entity',
                url: '/people',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/people/peoples.html',
                        controller: 'PeopleController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('people');
                        return $translate.refresh();
                    }]
                }
            })
            .state('peopleDetail', {
                parent: 'entity',
                url: '/people/:id',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/people/people-detail.html',
                        controller: 'PeopleDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('people');
                        return $translate.refresh();
                    }]
                }
            });
    });
