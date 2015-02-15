'use strict';

angular.module('miagebdxApp')
    .controller('PeopleDetailController', function ($scope,
                                                    Animations,
                                                    $stateParams,
                                                    People,
                                                    ArticlePeople,
                                                    EventPeople) {
        $scope.people = {};
        $scope.events = [];
        $scope.articles = [];
        $scope.peoples = [];

        $scope.load = function (id) {
            $scope.animation = Animations.getAnimation();
            People.get({id: id}, function(result) {$scope.people = result;});
            ArticlePeople.get({id: id}, function(result){$scope.articles = result;});
            EventPeople.get({id :id}, function(result){$scope.events = result;});
            People.query(function(result){$scope.peoples = result;});

        };

        $scope.load($stateParams.id);
    });
