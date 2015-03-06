'use strict';

/* Init hashtag routing and resolve the view and translate context */

angular.module('miagebdxApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('hashtag', {
                parent: 'entity',
                url: '/hashtag',
                data: {
                    roles: []
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
                    roles: []
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
