(function ()
{
    'use strict';


    angular
        .module('app.pages.auth.login-v2', [])
        .config(config)
        .constant('firebaseUrl', "https://crcasaslogin.firebase.com/");

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {

        console.log('ingreso al modulo login-v2');
        // State
        $stateProvider.state('app.pages_auth_login-v2', {
            url      : '/pages/auth/login-v2',
            params: {
                toState: null
            },            
            views    : {
                'main@'                          : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.pages_auth_login-v2': {
                    templateUrl: 'app/main/pages/auth/login-v2/login-v2.html',
                    controller : 'LoginV2Controller as vm'
                }
            },
            bodyClass: 'login-v2'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/auth/login-v2');

        // Navigation
        // msNavigationServiceProvider.saveItem('pages.auth.login-v2', {
        //     title : 'Login v2',
        //     state : 'app.pages_auth_login-v2',
        //     weight: 2
        // });
    }

})();