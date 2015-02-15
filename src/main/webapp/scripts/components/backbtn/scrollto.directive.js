angular.module('miagebdxApp').directive('scrollTo', ['ScrollTo', function(ScrollTo){
    return {
        restrict : "AC",
        compile : function(){

            return function(scope, element, attr) {
                element.bind("click", function(event){
                    ScrollTo.idOrName(attr.scrollTo, attr.offset);
                });
            };
        }
    };
}])
    .service('ScrollTo', ['$window', 'ngScrollToOptions', function($window, ngScrollToOptions) {

        this.idOrName = function (idOrName, offset, focus) {//find element with the given id or name and scroll to the first element it finds
            var document = $window.document;

            if(!idOrName) {//move to top if idOrName is not provided
                $window.scrollTo(0, 0);
            }

            if(focus === undefined) { //set default action to focus element
                focus = true;
            }

            //check if an element can be found with id attribute
            var el = document.getElementById(idOrName);
            if(!el) {//check if an element can be found with name attribute if there is no such id
                el = document.getElementsByName(idOrName);

                if(el && el.length)
                    el = el[0];
                else
                    el = null;
            }

            if(el) { //if an element is found, scroll to the element
                if (focus) {
                    el.focus();
                }

                ngScrollToOptions.handler(el, offset);
            }

            //otherwise, ignore
        }

    }])
    .provider("ngScrollToOptions", function() {
        this.options = {
            handler : function(el, offset) {
                if (offset) {
                    var top = $(el).offset().top - offset;
                    window.scrollTo(0, top);
                }
                else {
                    el.scrollIntoView();
                }
            }
        };
        this.$get = function() {
            return this.options;
        };
        this.extend = function(options) {
            this.options = angular.extend(this.options, options);
        };
    });
