(function ()
{
    'use strict';

    angular
        .module('app.core')
        .directive('imageCenter', imageCenterDirective);


 
    /** @ngInject */
   function imageCenterDirective(myLib) {
	    return {	    	
	        link: function(scope, element, attrs) { 
	            var maxWidth =   attrs.maxwidth;
	            var maxHeight =   attrs.maxheight;
	            var elem =   element;

	            element.bind("load" , function(e){ 
	            	var newDimensions = myLib.getResizeDimensionsFromImage(this, maxWidth, maxHeight );
	            	elem.attr('width', Math.floor(newDimensions.width));
	            	elem.attr('height', Math.floor(newDimensions.height));
	            	console.log('width' + newDimensions.width);
	            	console.log('height' + newDimensions.height);


	            });
	        }       
	    }

   }


}());