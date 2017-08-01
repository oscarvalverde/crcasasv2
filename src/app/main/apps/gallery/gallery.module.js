(function ()
{
    'use strict';

    angular
        .module('app.gallery', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {




        // State
        $stateProvider.state('app.gallery', {
            url      : '/gallery',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/apps/gallery/gallery.html',
                    controller : 'GalleryController as vm'
                }
            },
            resolve  : {
                Documents: function (msApi)
                {
                    return msApi.resolve('gallery.documents@get');
                }
            },
            bodyClass: 'gallery'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/gallery');

        // Api
        msApiProvider.register('gallery.documents', ['app/data/gallery/documents.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('seller.gallery', {
            title : 'Gallery',
            icon  : 'icon-camera',
            state : 'app.gallery',
            weight: 6
        });
    }

})();