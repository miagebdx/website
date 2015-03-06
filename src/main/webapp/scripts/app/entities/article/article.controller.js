'use strict';

/**
 * Created by Jermorin @jer_morin
 * Article controller
 * @ng-controller
 * @param $scope : To access in scope
 * @param (Service) Animations : Anim ng-repeat
 * @param (Service) Article : Access to Resource Article
 * @param (Service) Hashtag : Access to Resource Hashtag
 * @param (Service) Principal : Context security
 * */


angular.module('miagebdxApp')
    .controller('ArticleController', function ($scope,
                                               Animations,
                                               Article,
                                               People,
                                               Hashtag,
                                               Principal){


        /* Init empty var */
        $scope.articles = [];
        $scope.peoples = [];
        $scope.hashtags = [];



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
            People.query( function( result ){ $scope.peoples = result; } );
            Hashtag.query( function( result ){ $scope.hashtags = result; } );
            Article.query( function( result ){ $scope.articles = result; } );
        };

        $scope.loadAll();

        /**
         * Load a form in order update item
         * @param id : Integer
         * @public in $scope
         * **/
        $scope.update = function (id) {
            $scope.article = Article.get({id: id});
            $('#saveArticleModal').modal('show');
        };

        /**
         * Load a form in order delete item
         * @param id : Integer
         * @public in $scope
         * **/
        $scope.delete = function (id) {
            $scope.article = Article.get({id: id});
            $('#deleteArticleConfirmation').modal('show');
        };

        /**
         * Confirm delete and refresh $scope
         * @param id : Integer
         * @public in $scope
         * **/
        $scope.confirmDelete = function (id) {
            Article.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteArticleConfirmation').modal('hide');
                    $scope.clear();
                });
        };


        /**
         * Load a form in order create item
         * @param id : integer
         * @public in $scope
         * **/
        $scope.create = function () {
            Article.save($scope.article,
                function () {
                    $scope.loadAll();
                    $('#saveArticleModal').modal('hide');
                    $scope.clear();
                });
        };

        /**
         * Clear $scope
         * @public in $scope
         * @return void
         * **/
        $scope.clear = function () {
            $scope.article = {title: null, body: null, date: null, pinned: null, id: null};
        };
    });
