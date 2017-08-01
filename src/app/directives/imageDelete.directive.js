(function ()
{
    'use strict';

    angular
        .module('app.core')
        .directive('imageDelete', imageDeleteDirective);


 
    /** @ngInject */
   function imageDeleteDirective() {
	    return {	    	
	        link: function(scope, element, attrs) { 

	        }       
	    }

   }


}());