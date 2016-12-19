(function ()
{
    'use strict';

    angular
        .module('app.listing')
        .controller('ListDialogController', ListDialogController);

    /** @ngInject */
    function ListDialogController($mdDialog, List, Listing, User, msUtils)
    {
        var vm = this;

        // Data
        vm.title = 'Edit List';
        vm.list = angular.copy(List);
        vm.listing = Listing;
        vm.user = User;
        vm.newList = false;
        vm.allFields = false;

        if ( !vm.list )
        {
            vm.list = {
                'id'      : msUtils.guidGenerator(),
                'name'    : '',
                'lastName': '',
                'avatar'  : 'assets/images/avatars/profile.jpg',
                'nickname': '',
                'company' : '',
                'jobTitle': '',
                'email'   : '',
                'phone'   : '',
                'address' : '',
                'birthday': null,
                'notes'   : ''
            };

            vm.title = 'New List';
            vm.newList = true;
            vm.list.tags = [];
        }

        // Methods
        vm.addNewList = addNewList;
        vm.saveList = saveList;
        vm.deleteListConfirm = deleteListConfirm;
        vm.closeDialog = closeDialog;
        vm.toggleInArray = msUtils.toggleInArray;
        vm.exists = msUtils.exists;

        //////////

        /**
         * Add new list
         */
        function addNewList()
        {
            vm.listing.unshift(vm.list);

            closeDialog();
        }

        /**
         * Save list
         */
        function saveList()
        {
            // Dummy save action
            for ( var i = 0; i < vm.listing.length; i++ )
            {
                if ( vm.listing[i].id === vm.list.id )
                {
                    vm.listing[i] = angular.copy(vm.list);
                    break;
                }
            }

            closeDialog();
        }

        /**
         * Delete List Confirm Dialog
         */
        function deleteListConfirm(ev)
        {
            var confirm = $mdDialog.confirm()
                .title('Are you sure want to delete the list?')
                .htmlContent('<b>' + vm.list.name + ' ' + vm.list.lastName + '</b>' + ' will be deleted.')
                .ariaLabel('delete list')
                .targetEvent(ev)
                .ok('OK')
                .cancel('CANCEL');

            $mdDialog.show(confirm).then(function ()
            {

                vm.listing.splice(vm.listing.indexOf(List), 1);

            });
        }

        /**
         * Close dialog
         */
        function closeDialog()
        {
            $mdDialog.hide();
        }

    }
})();