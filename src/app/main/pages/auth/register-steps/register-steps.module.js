(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.register-steps', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.pages_auth_register-steps', {
            url      : '/pages/auth/register-steps',
            views    : {
                'main@'                          : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.pages_auth_register-steps': {
                    templateUrl: 'app/main/pages/auth/register-steps/register-steps.html',
                    controller : 'RegisterStepsController as vm'
                }
            },
            bodyClass: 'register-steps'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/auth/register-steps');

        // Navigation
        // msNavigationServiceProvider.saveItem('pages.auth.register-steps', {
        //     title : 'Register Steps',
        //     state : 'app.pages_auth_register-steps',
        //     weight: 3
        // });
    }

})();