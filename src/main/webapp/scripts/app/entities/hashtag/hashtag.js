'use strict';

angular.module('miagebdxApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('hashtag', {
                parent: 'entity',
                url: '/hashtag',
                data: {
                    roles: ['ROLE_USER']
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/hashtag/hashtags.html',
                        controller: 'HashtagController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('hashtag');
                        return $translate.refresh();
                    }]
                }
            })
            .state('hashtagDetail', {
                parent: 'entity',
                url: '/hashtag/:id',
                data: {
                    roles: ['ROLE_USER']
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/hashtag/hashtag-detail.html',
                        controller: 'HashtagDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('hashtag');
                        return $translate.refresh();
                    }]
                }
            });
    });
