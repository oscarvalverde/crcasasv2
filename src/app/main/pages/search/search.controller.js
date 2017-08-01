(function ()
{
    'use strict';

    angular
        .module('app.pages.search')
        .controller('SearchController',  SearchController);

    /** @ngInject */
    function SearchController($scope, $rootScope, mySettings)
    {
        var vm = this;
        var client = algoliasearch('ACGI9SE6NS', '9674969a6193bbde31d4fc04e157aeaf');   
        var index = client.initIndex('ads');

        vm.hits = [];
        vm.query = '';

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
              vm.hits = content.hits;               
  
            });
        };

        vm.search('casa');


    }

})();