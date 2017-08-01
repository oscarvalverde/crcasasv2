(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.register-v2')
        .controller('RegisterV2Controller', RegisterV2Controller);

    /** @ngInject */
    function RegisterV2Controller($mdDialog, $document, $scope, $firebaseAuth, $timeout)
    {
     
     console.log('init RegisterV2Controller');
    var vm = this; 
    var auth = $firebaseAuth();       

    vm.register = register;
    vm.showTerms = showTerms;

    vm.alreadyUsed = false;
    vm.accountExists = false;

    vm.loginWithFacebook = loginWithFacebook;
    vm.loginWithGoogle = loginWithGoogle;

    function register(email, password) {

      auth.$createUserWithEmailAndPassword(email, password)
        .then(function() {
          $location.path('/waitlist');
        })
        .catch(function(error) {
            switch(error.code) {                
                case "auth/network-request-failed":
                    vm.alreadyUsed = true;
                    $timeout(function(){vm.alreadyUsed = false;}, 4000); 
                    break;
                default:
                    vm.alreadyUsed = true;   
                    $timeout(function(){vm.alreadyUsed = false;}, 4000);                                    
                    break;
            }

        });
    }

    function loginWithFacebook() {
          // login with Facebook
          auth.$signInWithPopup("facebook").then(function(firebaseUser) {
            console.log("Signed in as:", firebaseUser.user.email);
            vm.accountExists = false;
          }).catch(function(error) {
            console.log("Authentication failed:", error);
           switch(error.code) {                
                case "auth/account-exists-with-different-credential":
                    vm.accountExists = true; 
                    $timeout(function(){vm.accountExists = false;}, 4000); 
                    break;
                default:
                    vm.accountExists = true;                 
                    $timeout(function(){vm.accountExists = false;}, 4000);                 
                    break;
            }
            
          });
    }   

     function loginWithGoogle() {
          // login with Facebook
          auth.$signInWithPopup("google").then(function(firebaseUser) {
            console.log("Signed in as:", firebaseUser.user.email);
            vm.accountExists = false;
          }).catch(function(error) {
            console.log("Authentication failed:", error);
            switch(error.code) {                
                case "auth/account-exists-with-different-credential":                    
                    vm.accountExists = true; 
                    $timeout(function(){vm.accountExists = false;}, 4000); 
                    break;
                default:
                    vm.accountExists = true; 
                    $timeout(function(){vm.accountExists = false;}, 4000); 
                    break;
            }
          });
    } 


    /**
     * Show Terms & Conditions
     */
    function showTerms(ev)
    {
        $mdDialog.show({
            controller         : 'TermsDialogController',
            controllerAs       : 'vm',
            templateUrl        : 'app/main/pages/auth/register-v2/dialogs/terms-dialog.html',
            parent             : angular.element($document.body),
            targetEvent        : ev,
            clickOutsideToClose: true
        });
    }




}
})();