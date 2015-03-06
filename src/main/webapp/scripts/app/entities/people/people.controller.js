'use strict';

/**
 * Created by Jermorin @jer_morin
 * Partner controller
 * @ng-controller
 * @param $scope : To access in scope
 * @param (Service) Animations : Anim ng-repeat
 * @param (Service) People : Access to Resource People
 * @param (Service) Principal : Context security
 * @param (Service) gMapsAutoC : Gmap integration
 * */

 angular.module('miagebdxApp')
    .controller('PeopleController', function ($scope,
                                              Animations,
                                              People,
                                              Principal,
                                              gMapsAutoC) {


        /* When the modal is shown, trigger autocomplete input creation. */
        gMapsAutoC.setLocationOnOpend($scope, 'people');

         /* Init empty var */
        $scope.peoples = [];

         /**
          * Load objects on array
          * Get role, animation
          * @param null
          * @public in scope
          * @return void
          * */
        $scope.loadAll = function() {
            $scope.isInRole = Principal.isInRole;
            $scope.animation = Animations.getAnimation();
            People.query(function(result){$scope.peoples = result;});
        };

         /**
          * getPeople avatar
          * @Param partner : object
          * @return image : object (filetype, filename, filesize, size, base64)
          * **/
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

         /**
          * Load a form in order update item
          * @param id : Integer
          * @public in $scope
          * **/
        $scope.update = function (id) {
            $scope.people = People.get({id: id});
            $('#savePeopleModal').modal('show');
        };

         /**
          * Load a form in order delete item
          * @param id : Integer
          * @public in $scope
          * **/
        $scope.delete = function (id) {
            $scope.people = People.get({id: id});
            $('#deletePeopleConfirmation').modal('show');
        };

         /**
          * Confirm delete and refresh $scope
          * @param id : Integer
          * @public in $scope
          * **/
        $scope.confirmDelete = function (id) {
            People.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deletePeopleConfirmation').modal('hide');
                    $scope.clear();
                });
        };

         /**
          * Clear $scope
          * @public in $scope
          * **/
        $scope.clear = function () {
            $scope.people = {name: null, email: null, telephone: null, location: null, locationComplete:null,  website: null, details: null, id: null};
        };
    });
