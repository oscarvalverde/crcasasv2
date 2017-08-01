(function ()
{
    'use strict';

    angular
        .module('app.core')
        .directive('watermark', watermarkDirective);


 
    /** @ngInject */
   function watermarkDirective() {
	    return {	 
          restrict: 'A',         	
	        link: function(scope, element, attrs) { 
                  element.bind('load', function() {
                      var canvas = document.createElement('canvas');
                      canvas.width =  element[0].naturalWidth;
                      canvas.height = element[0].naturalHeight;           
                      var context = canvas.getContext("2d");

                      var image = new Image();
                      image.src = element[0].src;
                      console.log(element[0].src);                   

                       image.onload = function() {
                            console.log('llegue');                   
                            context.drawImage(image, 0, 0);
                            var response = canvas.toDataURL("image/png"); 
                            console.log(response);                   
                            element.attr('wmfile', response);
                       };                      
    
                      // var position = watermarkPosition,
                      // x = 0,
                      // y = 0;
                      // if(position.indexOf("top")!=-1)
                      //   y = 10;
                      // else
                      //   y = canvas.height-watermark.height-10;
                      
                      // if(position.indexOf("left")!=-1)
                      //   x = 10;
                      // else
                      //   x = canvas.width-watermark.width-10;


                      // context.drawImage(watermark, x, y);


                  });
                  element.bind('error', function(){
                      console.log('image could not be loaded');
                  });            

	        }       
	    }

   }


}());