(function ()
{
    'use strict';

    angular
        .module('app.contacts', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, 
        msApiProvider, msNavigationServiceProvider)
    {


        $stateProvider.state('app.contacts', {
            url    : '/contacts',
            views  : {
                'content@app': {
                    templateUrl: 'app/main/apps/contacts/contacts.html',
                    controller : 'ContactsController as vm'
                }
            },
            data: {
                backend: true
            },              
            resolve: {
                Contacts: function (msApi)
                {
                    return msApi.resolve('contacts.contacts@get');
                },
                User: function (msApi)
                {
                    return msApi.resolve('contacts.user@get');
                },
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function(Auth) {
                  // $requireSignIn returns a promise so the resolve waits for it to complete
                  // If the promise is rejected, it will throw a $stateChangeError (see above)
                  return Auth.$requireSignIn();
                }]                
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/apps/contacts');

        // Api
        msApiProvider.register('contacts.contacts', ['app/data/contacts/contacts.json']);
        msApiProvider.register('contacts.user', ['app/data/contacts/user.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('apps.contacts', {
            title : 'Contacts',
            icon  : 'icon-account-box',
            state : 'app.contacts',
            weight: 10
        });

    }

})();