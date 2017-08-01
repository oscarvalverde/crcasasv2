(function ()
{
    'use strict';

    angular
        .module('app.pages.listing')
        .controller('ListingController', ListingController);

    /** @ngInject */
    function ListingController($q, msApi, Listing)
    {
        var vm = this;

        // Data
        vm.listing = Listing.data;
        vm.listingOptions = {
            scrollEl: '#content'
        };
        vm.currentPage = 1;
        vm.totalPages = 3;
        vm.pauseScroll = false;

        // Methods
        vm.loadNextPage = loadNextPage;

        //////////

        /**
         * Load next page
         * @returns promise
         */
        function loadNextPage()
        {
            // Create a new deferred object
            var deferred = $q.defer();

            // Increase the current page number
            vm.currentPage = vm.currentPage + 1;

            // Check if we still have pages that we can load
            if ( vm.currentPage > vm.totalPages )
            {
                // Reject the promise
                deferred.reject('No more pages');
            }
            else
            {
                // Emulate the api call and load new listing items in
                var pageName = 'listing.page' + vm.currentPage + '@get';

                msApi.request(pageName, {},

                    // SUCCESS
                    function (response)
                    {
                        for ( var i = 0; i < response.data.length; i++ )
                        {
                            vm.listing.push(response.data[i]);
                        }

                        // Resolve the promise
                        deferred.resolve(response);
                    },

                    // ERROR
                    function (response)
                    {
                        // Reject the promise
                        deferred.reject(response);
                    }
                );
            }

            return deferred.promise;
        }
    }
})();
