(function ()
{
    'use strict';

    angular
        .module('app.pages.account')
        .controller('AccountController', AccountController);

    /** @ngInject */
    function AccountController(User, $scope, $firebaseAuth)
    {
        var vm = this;
        vm.user = User.data;
 
        var auth = $firebaseAuth();       

          // login with Facebook
          auth.$signInWithPopup("facebook").then(function(firebaseUser) {
            console.log("Signed in as:", firebaseUser.user.email);
          }).catch(function(error) {
            console.log("Authentication failed:", error);
          });

        // Data
        vm.endTime = 1472975790000;

        // Methods



    }
})();