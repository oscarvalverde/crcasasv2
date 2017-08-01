(function ()
{
    'use strict';

    angular
        .module('app.listing', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {

        $stateProvider.state('app.listing', {
            url    : '/listing',
            views  : {
                'content@app': {
                    templateUrl: 'app/main/apps/listing/listing.html',
                    controller : 'ListingController as vm'
                }
            },
            resolve: {
                Listing: function (msApi)
                {
                    return msApi.resolve('listing.listing@get');
                },
                User: function (msApi)
                {
                    return msApi.resolve('listing.user@get');
                }
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/listing');

        // Api
        msApiProvider.register('listing.listing', ['app/data/listing/listing.json']);
        msApiProvider.register('listing.user', ['app/data/listing/user.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('seller.listing', {
            title : 'Listing',
            icon  : 'icon-store',
            state : 'app.listing',
            weight: 3
        });

    }

})();