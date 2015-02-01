'use strict';

angular.module('miagebdxApp')
    .controller('PeopleDetailController', function ($scope, $stateParams, People, Event, ArticlePeople, EventPeople) {
        $scope.people = {};
        $scope.load = function (id) {
            People.get({id: id}, function(result) {
              $scope.people = result;
            });
            $scope.articles = ArticlePeople.get({id: id});
            $scope.events = EventPeople.get({id :id});
        };
        $scope.load($stateParams.id);
    });
