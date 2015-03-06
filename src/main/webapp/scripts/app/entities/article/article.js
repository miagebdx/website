'use strict';

/* Init article routing and resolve the view and translate context */

angular.module('miagebdxApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('article', {
                parent: 'entity',
                url: '/article',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/article/articles.html',
                        controller: 'ArticleController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('article');
                        return $translate.refresh();
                    }]
                }
            })
            .state('articleDetail', {
                parent: 'entity',
                url: '/article/:id',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/article/article-detail.html',
                        controller: 'ArticleDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('article');
                        return $translate.refresh();
                    }]
                }
            })

    });
