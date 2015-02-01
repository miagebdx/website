'use strict';



angular.module('miagebdxApp')
    .controller('ArticleController', function ($scope, Article, People, Hashtag, Principal) {


        $scope.articles = [];
        $scope.animation = "bouncy-scale-in";
        $scope.peoples = People.query();
        $scope.hashtags = Hashtag.query();
        $scope.filteredItems = [];


        $scope.addFilter= function(item,entity){
            var f = $scope.filteredItems;
            if(entity=="people"){
                if (f.indexOf(item)>-1){
                    f.splice(item)
                }else{
                    f.push(item);

                }
            }

            if(entity=="hashtag"){
                if (f.indexOf(item)>-1){
                    f.splice(item)
                }else{
                    f.push(item);

                }

            }

            console.log(f);

            $scope.filteredItems = f;

        };


        $scope.loadAll = function() {
            Article.query(function(result) {
                $scope.articles = result;
            });
        };
        $scope.loadAll();

        $scope.isInRole = Principal.isInRole;

        $scope.create = function () {
            Article.save($scope.article,
                function () {
                    $scope.loadAll();
                    $('#saveArticleModal').modal('hide');
                    $scope.clear();
                });
        };

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

        $scope.clear = function () {
            $scope.article = {title: null, body: null, date: null, pinned: null, id: null};
        };
    });
