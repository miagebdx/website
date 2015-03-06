'use strict';

/**
 * Created by Jermorin @jer_morin
 * Hashtag controller
 * @ng-controller
 * @param $scope : To access in scope
 * @param (Service) Animations : Anim ng-repeat
 * @param (Service) Article : Access to Resource Article
 * @param (Service) Hashtag : Access to Resource Hashtag
 * @param (Service) Principal : Context security
 * @param $timeout
 * */
angular.module('miagebdxApp')
    .controller('HashtagController', function (Animations,
                                               $scope,
                                               Hashtag,
                                               Article,
                                               Principal) {

        /* Init empty var */
        $scope.hashtags = [];
        $scope.articles = [];

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
            Article.query( function( result ){ $scope.articles = result; } );
            Hashtag.query( function( result ){ $scope.hashtags = result; } );
        };

        /**
         * Load a form in order create item
         * @param id : integer
         * @required (service) Gmaps
         * @public in $scope
         * **/
        $scope.loadAll();

        $scope.create = function () {
            Hashtag.save($scope.hashtag,
                function () {
                    $scope.loadAll();
                    $('#saveHashtagModal').modal('hide');
                    $scope.clear();
                });
        };

        /**
         * Load a form in order update item
         * @param id : Integer
         * @public in $scope
         * **/
        $scope.update = function (id) {
            $scope.hashtag = Hashtag.get({id: id});
            $('#saveHashtagModal').modal('show');
        };

        /**
         * Load a form in order delete item
         * @param id : Integer
         * @public in $scope
         * **/
        $scope.delete = function (id) {
            $scope.hashtag = Hashtag.get({id: id});
            $('#deleteHashtagConfirmation').modal('show');
        };

        /**
         * Confirm delete and refresh $scope
         * @param id : Integer
         * @public in $scope
         * **/
        $scope.confirmDelete = function (id) {
            Hashtag.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteHashtagConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        /**
         * Clear $scope
         * @public in $scope
         * **/
        $scope.clear = function () {
            $scope.hashtag = {name: null, description: null, id: null};
        };
    });
