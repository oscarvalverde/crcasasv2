(function ()
{
    'use strict';

    angular
        .module('app.search-v2', [])
        .config(config);
      

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, 
                    msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.search-v2', {
            url      : '/search-v2',
            views  : {
                'content@app': {
                    templateUrl: 'app/main/apps/search-v2/search-v2.html',
                    controller : 'SearchV2Controller as vm'
                }
            },                 
            bodyClass: 'search-v2'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/search-v2');

        // Navigation
        msNavigationServiceProvider.saveItem('apps.search-v2', {
            title : 'search-v2',
            icon  : 'icon-magnify',
            state : 'app.search-v2',
            weight: 7
        });
    }

})();