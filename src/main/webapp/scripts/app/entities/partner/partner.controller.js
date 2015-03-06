'use strict';

/**
 * Created by Jermorin @jer_morin
 * Partner controller
 * @ng-controller
 * @param $scope : To access in scope
 * @param (Service) Animations : Anim ng-repeat
 * @param (Service) Partner : Access to Resource Partner
 * @param (Service) Principal : Context security
 * @param (Service) gMapsAutoC : Gmap integration
 * */

angular.module('miagebdxApp')
    .controller('PartnerController', function ($scope,
                                               Animations,
                                               Partner,
                                               Principal,
                                               gMapsAutoC) {


        /* When the modal is shown, trigger autocomplete input creation. */
        gMapsAutoC.setLocationOnOpend($scope, 'partner');

        /* Init empty var */
        $scope.partners = [];

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
            Partner.query(function(result){$scope.partners = result;});
        };

        /**
         * getPartner avatar
         * @Param partner : object
         * @return image : object (filetype, filename, filesize, size, base64)
         * **/
        $scope.getImage = function(partner){
            return JSON.parse(partner.logo);
        };

        $scope.loadAll();

        /**
         * Load a form in order create item
         * @param id : integer
         * @required (service) Gmaps
         * @public in $scope
         * **/
        $scope.create = function () {

            gMapsAutoC.getLocationComplete();

            Partner.save($scope.partner,
                function () {
                    $scope.loadAll();
                    $('#savePartnerModal').modal('hide');
                    $scope.clear();
                });
        };

        /**
         * Load a form in order update item
         * @param id : Integer
         * @public in $scope
         * **/
        $scope.update = function (id) {
            $scope.partner = Partner.get({id: id});
            $('#savePartnerModal').modal('show');
        };

        /**
         * Load a form in order delete item
         * @param id : Integer
         * @public in $scope
         * **/
        $scope.delete = function (id) {
            $scope.partner = Partner.get({id: id});
            $('#deletePartnerConfirmation').modal('show');
        };

        /**
         * Confirm delete and refresh $scope
         * @param id : Integer
         * @public in $scope
         * **/
        $scope.confirmDelete = function (id) {
            Partner.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deletePartnerConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        /**
         * Clear $scope
         * @public in $scope
         * **/
        $scope.clear = function () {
            $scope.partner = {name: null, location: null, locationComplete:null,  description: null, website: null, email: null, logo: null, telephone: null, id: null};
        };
    });
