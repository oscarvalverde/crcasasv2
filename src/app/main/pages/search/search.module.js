(function ()
{
    'use strict';

    angular
        .module('app.pages.search', [])
        .config(config);
      

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, 
                    msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.pages_search', {
            url      : '/pages/search',
            views    : {
                'main@'                        : {
                    templateUrl: 'app/core/layouts/horizontal-navigation.html',
                    controller : 'MainController as vm'
                },                
                'content@app.pages_search': {
                    templateUrl: 'app/main/pages/search/search.html',
                    controller : 'SearchController as vm'
                },
                'toolbar@app.pages_listing'   : {
                    templateUrl: 'app/toolbar/layouts/horizontal-navigation/toolbar.html',
                    controller : 'ToolbarController as vm'
                },                  
            },
            bodyClass: 'search'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/search');

        // Navigation
        msNavigationServiceProvider.saveItem('pages.search', {
            title : 'Search',
            icon  : 'icon-magnify',
            state : 'app.pages_search',
            weight: 7
        });
    }

})();