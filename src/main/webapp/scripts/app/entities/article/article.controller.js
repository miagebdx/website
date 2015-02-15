'use strict';



angular.module('miagebdxApp')
    .controller('ArticleController', function ($scope,
                                               Animations,
                                               Article,
                                               People,
                                               Hashtag,
                                               Principal){


        $scope.articles = [];
        $scope.peoples = [];
        $scope.hashtags = [];



        $scope.loadAll = function() {
            $scope.isInRole = Principal.isInRole;

            $scope.animation = Animations.getAnimation();

            People.query(function(result){$scope.peoples = result;});
            Hashtag.query(function(result){$scope.hashtags = result;});
            Article.query(function(result){$scope.articles = result;});
        };

        $scope.loadAll();

        $scope.update = function (id) {
            $scope.article = Article.get({id: id});
            $('#saveArticleModal').modal('show');
        };

        $scope.delete = function (id) {
            $scope.article = Article.get({id: id});
            $('#deleteArticleConfirmation').modal('show');
        };

        $scope.confirmDelete = function (id) {
            Article.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteArticleConfirmation').modal('hide');
                    $scope.clear();
                });
        };


        $scope.create = function () {
            Article.save($scope.article,
                function () {
                    $scope.loadAll();
                    $('#saveArticleModal').modal('hide');
                    $scope.clear();
                });
        };


        $scope.clear = function () {
            $scope.article = {title: null, body: null, date: null, pinned: null, id: null};
        };
    });
