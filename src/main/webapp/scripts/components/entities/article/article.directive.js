angular.module('miagebdxApp')
    .directive('listarticle', function() {
        return {
            restrict: 'AE',
            scope: {
                articles: '=articles',
                animation: '=anim',
                isInRole: '=role',
                search: '=search'
            },
            templateUrl: 'scripts/app/entities/article/articles-list.html'
        };
    });
