angular.module('miagebdxApp')
    .directive('listarticle', function() {
        return {
            restrict: 'AE',
            templateUrl: 'scripts/app/entities/article/articles-list.html'
        };
    });
