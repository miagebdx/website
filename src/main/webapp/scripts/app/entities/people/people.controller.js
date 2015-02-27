'use strict';

angular.module('miagebdxApp')
    .controller('PeopleController', function ($scope,
                                              Animations,
                                              People,
                                              Principal,
                                              gMapsAutoC) {


        /* When the modal is shown, trigger autocomplete input creation. */
        gMapsAutoC.setLocationOnOpend($scope, 'people');

        $scope.peoples = [];

        $scope.loadAll = function() {
            $scope.isInRole = Principal.isInRole;
            $scope.animation = Animations.getAnimation();
            People.query(function(result){$scope.peoples = result;});
        };

        $scope.getImage = function(people){
            return JSON.parse(people.logo);
        };

        $scope.loadAll();

        $scope.create = function () {

            gMapsAutoC.getLocationComplete();

            People.save($scope.people,
                function () {
                    $scope.loadAll();
                    $('#savePeopleModal').modal('hide');
                    $scope.clear();
                });
        };

        $scope.update = function (id) {
            $scope.people = People.get({id: id});
            $('#savePeopleModal').modal('show');
        };

        $scope.delete = function (id) {
            $scope.people = People.get({id: id});
            $('#deletePeopleConfirmation').modal('show');
        };

        $scope.confirmDelete = function (id) {
            People.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deletePeopleConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.clear = function () {
            $scope.people = {name: null, email: null, telephone: null, location: null, locationComplete:null,  website: null, details: null, id: null};
        };
    });
