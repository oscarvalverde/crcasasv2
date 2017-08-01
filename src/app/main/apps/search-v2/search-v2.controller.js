(function ()
{
    'use strict';

    angular
        .module('app.search-v2')
        .filter('cut', CutFilter)
        .controller('SearchV2Controller',  SearchV2Controller);

    /** @ngInject */
    function SearchV2Controller($scope, $rootScope, mySettings)
    {
        var vm = this;
        var client = algoliasearch('ACGI9SE6NS', '9674969a6193bbde31d4fc04e157aeaf');   
        var index = client.initIndex('ads');

        vm.listings = [];
        vm.query = '';

        // Data
        vm.labels = [];
        vm.filters = {
            archive: false
        };
        vm.labelFilterIds = [];
        vm.listingListType = 'notes';        

        $rootScope.localCurrency = true;
        vm.exchRate = 570;
 
        mySettings.getSettings()
        .then( function (settings) {
            console.log(settings.exchRate)
        });

        vm.search = function( ) {
            // only query string
            index.search(vm.query, function searchDone(err, content) {
              if (err) {
                console.error(err);
                return;
              }
              vm.listings = content.hits; 

              console.log('hola....')              
  
            });
        };

        vm.search('casa');


    }

    /** @ngInject */

    function CutFilter() {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace !== -1) {
                  //Also remove . and , so its gives a cleaner result.
                  if (value.charAt(lastspace-1) === '.' || value.charAt(lastspace-1) === ',') {
                    lastspace = lastspace - 1;
                  }
                  value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    };



})();