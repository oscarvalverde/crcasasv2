(function ()
{
    'use strict';

    angular
        .module('app.core')
        .directive('errSrc', errSrc);

    /** @ngInject */
    function errSrc()
    {
        return {

            link: function(scope, element, attrs) {
              element.bind('error', function() {
                if (attrs.src != attrs.errSrc) {
                  attrs.$set('src', attrs.errSrc);
                }
              });
            }


        };
    }
})();
