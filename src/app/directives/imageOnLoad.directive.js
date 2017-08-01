(function ()
{
    'use strict';

    angular
        .module('app.core')
        .directive('imageonload', imageOnLoadDirective);


 
    /** @ngInject */
   function imageOnLoadDirective() {
        return {
            restrict: 'A',
            scope: { cbfunction: '&'},            
            link: function(scope, element, attrs) {
 
                 element.bind('load', function() {
                    var width = element[0].width ;
                    var height = element[0].height ;

                    element.attr('olheight', element[0].height);
                    scope.cbfunction({width: width, height: height});                   

                });
            }
        };
   }


}());