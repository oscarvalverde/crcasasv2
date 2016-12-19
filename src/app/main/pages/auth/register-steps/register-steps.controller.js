(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.register-steps')
        .controller('RegisterStepsController', RegisterStepsController);

    /** @ngInject */
    function RegisterStepsController()
    {
        // Data

        var vm = this;
        vm.currentView = 'step1';  

        // Methods

        //////////
    }
})();