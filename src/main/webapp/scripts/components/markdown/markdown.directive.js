'use strict';

angular.module('miagebdxApp')
    .directive('markdown', function ($sanitize) {
        var converter = new Showdown.converter();
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                function renderMarkdown() {
                    var htmlText = converter.makeHtml(scope.$eval(attrs.markdown)  || '');
                    element.html($sanitize(htmlText));
                }

                scope.$watch(attrs.markdown, function(){
                    renderMarkdown();
                });

                renderMarkdown();
            }
        };
    });
