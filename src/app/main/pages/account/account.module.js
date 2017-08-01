(function ()
{
    'use strict';

    angular
        .module('app.pages.account', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, 
                     msApiProvider, msNavigationServiceProvider)
    {



        // State
        $stateProvider.state('app.pages_account', {
            url      : '/pages/account',
            views    : {

               
                'content@app': {
                    templateUrl: 'app/main/pages/account/account.html',
                    controller : 'AccountController as vm'
                }
            },
            resolve  : {
                User: function (msApi)
                {
                    return msApi.resolve('account.user@get');
                }                                                                          
            },

            bodyClass: 'account'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/account');

        // Navigation
        msNavigationServiceProvider.saveItem('seller.account', {
            title : 'Perfil',
            icon  : 'icon-account-circle',
            state : 'app.pages_account',
            weight: 1
        });


        // Api
        msApiProvider.register('account.user', ['app/data/listing/user.json']);


    }

})();