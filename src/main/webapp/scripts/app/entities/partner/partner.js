'use strict';

/* Init partner routing and resolve the view and translate context */

angular.module('miagebdxApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('partner', {
                parent: 'entity',
                url: '/partner',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/partner/partners.html',
                        controller: 'PartnerController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('partner');
                        return $translate.refresh();
                    }]
                }
            })
            .state('partnerDetail', {
                parent: 'entity',
                url: '/partner/:id',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/partner/partner-detail.html',
                        controller: 'PartnerDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('partner');
                        return $translate.refresh();
                    }]
                }
            });
    });
