

angular.module('miagebdxApp')
    .directive('baseSixtyFourInput', ['$window', function ($window) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attrs, ngModel) {
                var fileObject = {};

                scope.readerOnload = function(e){
                    var base64 = _arrayBufferToBase64(e.target.result);
                    fileObject.base64 = base64;
                    scope.$apply(function(){
                        ngModel.$setViewValue(JSON.stringify(angular.copy(fileObject)));
                    });
                };

                var reader = new FileReader();
                reader.onload = scope.readerOnload;

                elem.on('change', function() {
                    var file = elem[0].files[0];
                    fileObject.filetype = file.type;
                    fileObject.filename = file.name;
                    fileObject.filesize = file.size;
                    reader.readAsArrayBuffer(file);
                });

                //http://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
                function _arrayBufferToBase64( buffer ) {
                    var binary = '';
                    var bytes = new Uint8Array( buffer );
                    var len = bytes.byteLength;
                    for (var i = 0; i < len; i++) {
                        binary += String.fromCharCode( bytes[ i ] );
                    }
                    return $window.btoa( binary );
                }
            }
        };
    }]);




