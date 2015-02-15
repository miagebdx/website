angular.module('miagebdxApp')
    .directive('cnil', function($cookieStore) {
        return {
            restrict: 'AE',
            templateUrl: 'scripts/components/cnil/cnil.html',
            controller: function($scope){
                var cnil = $cookieStore.get('cnil');
                if(cnil!=='hidden') {
                    $scope.hide = true;
                }
                $scope.closeCnil = function(){
                    $scope.hide = false;
                    $cookieStore.put('cnil','hidden');
                }
            }

        };
    });
