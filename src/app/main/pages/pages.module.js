(function ()
{
    'use strict';

    angular
        .module('app.pages', [
          //   'app.pages.auth.login',
            'app.pages.auth.login-v2',
         //    'app.pages.auth.register',
            'app.pages.auth.register-v2',
            'app.pages.auth.forgot-password',
            'app.pages.auth.reset-password',
            'app.pages.auth.register-steps',
            'app.pages.listing',
            'app.pages.landing-page',
        //     'app.pages.auth.lock',
             'app.pages.coming-soon',
            'app.pages.error-404',
            'app.pages.error-500',
        //     'app.pages.invoice',
             'app.pages.maintenance',
            'app.pages.profile',
             'app.pages.search',
        //     'app.pages.timeline',
               'app.pages.account',
               'ngMask',
               'ngJcrop'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider, ngJcropConfigProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('seller', {
            title : 'SELL',
            group : true,
            weight: 1
        });

        // ng-crop
        // [optional] To change the jcrop configuration
        // All jcrop settings are in: http://deepliquid.com/content/Jcrop_Manual.html#Setting_Options
        ngJcropConfigProvider.setJcropConfig({
            bgColor: 'white',
            bgOpacity: .4,
            aspectRatio: 16 / 9
        });        

    }
})();