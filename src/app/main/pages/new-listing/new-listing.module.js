(function ()
{
    'use strict';

    angular
        .module('app.pages.listing', [])
        .config(config);



    /** @ngInject */
    function config($stateProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.pages_listing', {
                url      : '/pages/listing',
                views    : {
                    'main@'                        : {
                        templateUrl: 'app/core/layouts/horizontal-navigation.html',
                        controller : 'MainController as vm'
                    },
                    'content@app.pages_listing': {
                     templateUrl: 'app/main/pages/new-listing/new-listing.html',
                        controller : 'ListingController  as vm'
                    },
                    'toolbar@app.pages_listing'   : {
                        templateUrl: 'app/toolbar/layouts/horizontal-navigation/toolbar.html',
                        controller : 'ToolbarController as vm'
                    },                    
                },                
                resolve  : {
                    Listing: function (msApi)
                    {
                        //return msApi.resolve('listing.page1@get');
                        return true;

                    }
                },
                bodyClass: 'listing'
            });


        // API
        // msApiProvider.register('timeline.page1', ['app/data/timeline/page-1.json']);

        // Navigation
        // msNavigationServiceProvider.saveItem('pages.listing', {
        //     title : 'New listing',
        //     icon  : 'icon-view-stream',
        //     weight: 8
        // });

        // msNavigationServiceProvider.saveItem('pages.listing.default', {
        //     title: 'Default',
        //     state: 'app.pages_listing'
        // });

    }

})();