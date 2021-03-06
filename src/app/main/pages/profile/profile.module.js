(function ()
{
    'use strict';

    angular
        .module('app.pages.profile', ['flow'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        $stateProvider.state('app.pages_profile', {
            url      : '/pages/profile',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/pages/profile/profile.html',
                    controller : 'ProfileController as vm'
                }
            },
            resolve  : {
                Timeline    : function (msApi)
                {
                    return msApi.resolve('profile.timeline@get');
                },
                About       : function (msApi)
                {
                    return msApi.resolve('profile.about@get');
                },
                PhotosVideos: function (msApi)
                {
                    return msApi.resolve('profile.photosVideos@get');
                },
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["authService", function(authService) {
                  // $requireSignIn returns a promise so the resolve waits for it to complete
                  // If the promise is rejected, it will throw a $stateChangeError (see above)
                  console.log("require signin");
                  //return Auth.$requireSignIn();
                  return authService.firebaseAuthObject.$requireSignIn();                  
                }]                 
            },
            bodyClass: 'profile'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/profile');

        // Api
        msApiProvider.register('profile.timeline', ['app/data/profile/timeline.json']);
        msApiProvider.register('profile.about', ['app/data/profile/about.json']);
        msApiProvider.register('profile.photosVideos', ['app/data/profile/photos-videos.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('seller.profile', {
            title : 'Profile',
            icon  : 'icon-account',
            state : 'app.pages_profile',
            weight: 2
        });
    }

})();