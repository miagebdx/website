angular.module('miagebdxApp')
    .directive('cnil', function() {
        return {
            restrict: 'AE',
            controller: function($scope){
                $scope.hide = false;
                $scope.close = function(){
                    $scope.hide = true;

                }
            },
            templateUrl: 'scripts/components/cnil/cnil.html'
        };
    });
