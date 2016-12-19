(function ()
{
    'use strict';

    angular
        .module('app.ui.forms', ['angularFileUpload'])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider)
    {


        $stateProvider.state('app.ui_forms', {
            url      : '/ui/forms',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/ui/forms/forms.html',
                    controller : 'FormsController as vm'
                }
            },
            bodyClass: 'forms',

            resolve: {
                Contacts: function (msApi)
                {
                    return msApi.resolve('contacts.contacts@get');
                },
                User: function (msApi)
                {
                    return msApi.resolve('contacts.user@get');
                }
            }

        });

        // Api
         msApiProvider.register('contacts.contacts', ['app/data/contacts/contacts.json']);
         msApiProvider.register('contacts.user', ['app/data/contacts/user.json']);


    }

})();