'use strict';

angular.module('miagebdxApp')
    .controller('PeopleDetailController', function ($scope, $stateParams, People, Event, Article) {
        $scope.people = {};
        $scope.load = function (id) {
            People.get({id: id}, function(result) {
              $scope.people = result;
            });
        };
        $scope.load($stateParams.id);
    });
