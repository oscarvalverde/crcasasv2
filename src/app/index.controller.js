(function ()
{
    'use strict';


    angular
        .module('fuse')
        .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController($rootScope, Auth, fuseTheming)
    {

        var vm = this;

        // Data
        vm.themes = fuseTheming.themes;

        //////////

    $rootScope.auth = Auth;

    // any time auth state changes, add the user data to scope
    $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
      $rootScope.firebaseUser = firebaseUser;
      console.log($rootScope.firebaseUser);
      console.log($rootScope.firebaseUser.photoURL);

    });        


    }



})();