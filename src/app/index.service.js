(function ()
{
    'use strict';

    angular
        .module('app.core')
        .factory('myUtils', myUtils)
        .factory('authService', authService)
        .factory('Auth', Auth);


    /** @ngInject */
    function myUtils($window)
    {
        // Private variables

        var service = {
            deleteItem          : deleteItem,
            deleteSelectedItems : deleteSelectedItems,
            toggleSelectItem    : toggleSelectItem,
            deselectItems       : deselectItems,
            selectAllItems      : selectAllItems
        };

        return service;

        /**
         * Delete Item
         */
        function deleteItem(item, list)
        {
            list.splice(list.indexOf(item), 1);
        }

        /**
         * Delete Selected Items
         */
        function deleteSelectedItems(ev, message, list)
        {
            var confirm = $mdDialog.confirm()
                .title(message)
                .htmlContent('<b>' + list.length + ' selected</b>' + ' will be deleted.')
                .ariaLabel('delete items')
                .targetEvent(ev)
                .ok('OK')
                .cancel('CANCEL');

            $mdDialog.show(confirm).then(function ()
            {

                list.forEach(function (item)
                {
                    deleteItem(item);
                });

                vm.selectedItems = [];

            });

        }

        /**
         * Toggle selected status of the item
         *
         * @param item
         * @param event
         */
        function toggleSelectItem(item, event, list)
        {
            if ( event )
            {
                event.stopPropagation();
            }

            if ( list.indexOf(item) > -1 )
            {
                list.splice(list.indexOf(item), 1);
            }
            else
            {
                list.push(item);
            }
        }

        /**
         * Deselect items
         */
        function deselectItems(list)
        {
            list = [];
        }

        /**
         * Sselect all items
         */
        function selectAllItems(selected, filtered)
        {
            selected = filtered;
        }

    }

    /** @ngInject */
   function authService($firebaseAuth, firebaseDataService, partyService) {
    var firebaseAuthObject = $firebaseAuth();

    var service = {
      firebaseAuthObject: firebaseAuthObject,
      register: register,
      login: login,
      logout: logout,
      isLoggedIn: isLoggedIn,
      sendWelcomeEmail: sendWelcomeEmail
    };

    return service;

    ////////////

    function register(user) {
      return firebaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password);
    }

    function login(user) {
      return firebaseAuthObject.$signInWithEmailAndPassword(user.email, user.password);
    }

    function logout() {
      partyService.reset();
      firebaseAuthObject.$signOut();
    }

    function isLoggedIn() {
      return firebaseAuthObject.$getAuth();
    }

    function sendWelcomeEmail(emailAddress) {
      firebaseDataService.emails.push({
        emailAddress: emailAddress
      });
    }

   }


    /** @ngInject */
    function Auth($firebaseAuth) {
        return $firebaseAuth();
    }


}());