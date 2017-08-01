(function ()
{
    'use strict';


    angular
        .module('fuse')
        .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController($rootScope, fuseTheming, GApi)
    {

      console.log('init IndexController');
        var vm = this;

        // Data
        vm.themes = fuseTheming.themes;

        //////////

     //    $rootScope.auth = Auth;

        /**
         * The ID of the currently signed-in User. We keep track of this to detect Auth state change events that are just
         * programmatic token refresh but not a User status change.
         */
   //       var currentUID;
         
         /**

        /**
         * Triggers every time there is a change in the Firebase auth state (i.e. user signed-in or user signed out).
         */
        // any time auth state changes, add the user data to scope
      //   $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
              // We ignore token refresh events.
      //         if (firebaseUser && currentUID === firebaseUser.uid) {
      //           return;
      //         }
      //         if (firebaseUser) {
      //           currentUID = firebaseUser.uid;
       //          $rootScope.firebaseUser = firebaseUser;


      //           firebaseUser.getToken().then(function(idToken) {
                  // console.log(idToken);
                  // GApi.execute('people', 'insertPeople', {
                  //                        'token': idToken,
                  //                        'people': {'fireBaseEmail': 'ovalverde@gmail.com'}}).then(function(resp) {
                  //     console.log(resp);
                  //     console.log('people success :)');

                  // }, function() {
                  //     console.log('people error:(');
                  // });

      //           });

       //        } else {
                // Set currentUID to null.
       //          currentUID = null;
                // Display the splash page where you can sign-in.
        //       }      
        // });        


    }



})();