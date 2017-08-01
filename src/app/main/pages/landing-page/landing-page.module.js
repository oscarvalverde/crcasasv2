(function ()
{
    'use strict';

    angular
        .module('app.pages.landing-page', [])
        .config(config);



    /** @ngInject */
    function config($stateProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.pages_landing-page', {
                url      : '/pages/landing-page',
                views    : {
                    'main@'                        : {
                        templateUrl: 'app/core/layouts/horizontal-navigation.html',
                        controller : 'MainController as vm'
                    },
                    'content@app.pages_landing-page': {
                     templateUrl: 'app/main/pages/landing-page/landing-page.html',
                        controller : 'LandingPageController  as vm'
                    },
                    'toolbar@app.pages_landing-page'   : {
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
                bodyClass: 'landing-page'
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