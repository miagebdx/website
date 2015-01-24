'use strict';

angular.module('miagebdxApp')
    .controller('PeopleDetailController', function ($scope, $stateParams, People, Event, ArticlePeople) {
        $scope.people = {};
        $scope.load = function (id) {
            People.get({id: id}, function(result) {
              $scope.people = result;
            });
            $scope.articles = ArticlePeople.get({id: id});
        };
        $scope.load($stateParams.id);
    });
