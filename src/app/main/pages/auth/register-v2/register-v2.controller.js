(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.register-v2')
        .controller('RegisterV2Controller', RegisterV2Controller);

    /** @ngInject */
    function RegisterV2Controller($mdDialog, $document, $scope, $firebaseAuth)
    {

    var vm = this; 
    var auth = $firebaseAuth();       

    vm.register = register;
    vm.showTerms = showTerms;

    vm.alreadyUsed = false;


    function register(email, password) {

      auth.$createUserWithEmailAndPassword(email, password)
        .then(function() {
          $location.path('/waitlist');
        })
        .catch(function(error) {
          vm.error = error;

              switch(error.code) {                
                  case "auth/network-request-failed":
                      vm.alreadyUsed = true;
                      break;
                  default:
                      vm.alreadyUsed = true;                  
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