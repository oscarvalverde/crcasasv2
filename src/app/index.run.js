(function ()
{
    'use strict';

    // estoy usando esta libreria para acceder el endpoint 
    // https://github.com/maximepvrt/angular-google-gapi

    angular
        .module('fuse')
        .run(runBlock)
        .run(runGapiBlock)
        .run(runProtect);
    /** @ngInject */
    function runBlock($rootScope, $timeout, $state)
    {

         console.log('runblock...');
        // Activate loading indicator
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function ()
        {
            $rootScope.loadingProgress = true;
        });


        $rootScope.init = function() {
          alert('hola...');
        }


        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function ()
        {
            $timeout(function ()
            {
                $rootScope.loadingProgress = false;
            });
        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // Cleanup
        $rootScope.$on('$destroy', function ()
        {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        });
    }

    /** @ngInject */
    function runProtect($rootScope, $state) {

      console.log('runprotect...');
      $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
         // We can catch the error thrown when the $requireSignIn promise is rejected
         // and redirect the user back to the home page

         if (error === "AUTH_REQUIRED") { 
           $state.go("app.pages_auth_login-v2",{toState: toState.name});
         }
      });
    };

    /** @ngInject */
    function runGapiBlock(GApi, GAuth, $window) {
        // var BASE = 'https://crcasaslogin.appspot.com/_ah/api';

        // GApi.load('people', 'v1', BASE).then(function(resp) {
        //     console.log('api: ' + resp.api + ', version: ' + resp.version + ' loaded');

        // }, function(resp) {
        //     console.log('an error occured during loading api: ' + resp.api + ', resp.version: ' + version);
        // });
    };    

})();