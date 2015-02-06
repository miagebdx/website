'use strict';

angular.module('miagebdxApp')
    .controller('HashtagController', function (Animations,
                                               $scope,
                                               Hashtag,
                                               Article,
                                               Principal) {
        $scope.hashtags = [];
        $scope.articles = [];


        $scope.loadAll = function() {
            $scope.isInRole = Principal.isInRole;
            $scope.animation = Animations.getAnimation();
            Article.query(function(result){$scope.articles = result;});
            Hashtag.query(function(result){$scope.hashtags = result;});
        };

        $scope.loadAll();

        $scope.create = function () {
            Hashtag.save($scope.hashtag,
                function () {
                    $scope.loadAll();
                    $('#saveHashtagModal').modal('hide');
                    $scope.clear();
                });
        };

        $scope.update = function (id) {
            $scope.hashtag = Hashtag.get({id: id});
            $('#saveHashtagModal').modal('show');
        };

        $scope.delete = function (id) {
            $scope.hashtag = Hashtag.get({id: id});
            $('#deleteHashtagConfirmation').modal('show');
        };

        $scope.confirmDelete = function (id) {
            Hashtag.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteHashtagConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.clear = function () {
            $scope.hashtag = {name: null, description: null, id: null};
        };
    });
