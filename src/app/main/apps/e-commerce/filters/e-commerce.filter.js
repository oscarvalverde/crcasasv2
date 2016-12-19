(function ()
{
    'use strict';

    angular
        .module('app.e-commerce')
        .filter('filterByState', filterByState);

    /** @ngInject */
    function filterByState()
    {

       return function(items, key) {

        var filtered = [];
        angular.forEach(items, function(el) {
          if ( (el.key >= key*100) && (el.key < (key+1)*100) ) {
            filtered.push(el);
          }
        });
        return filtered;
      }       

    }

})();