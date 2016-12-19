(function ()
{
    'use strict';

    var myApp = angular.module('app.pages.auth.register-v2');

    myApp.controller('TermsDialogController', TermsDialogController);

    /** @ngInject */
    function TermsDialogController($mdDialog)
    {
        var vm = this;

        vm.closeDialog = closeDialog;

        /**
         * Close Dialog
         */
        function closeDialog()
        {
                    console.log("inside close");

            $mdDialog.hide();
        }

    }
})();