(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.forgot-password')
        .controller('ForgotPasswordController', ForgotPasswordController);

    /** @ngInject */
    function ForgotPasswordController($firebaseAuth, $window, GApi)
    {

    var vm = this;
 
    var auth = $firebaseAuth();       


    vm.reset = reset;

    vm.showSuccess = false;
    vm.showFailure = false;

    function reset(email) {

        // ESTE ES EL PATH https://crcasaslogin.appspot.com/_ah/api/echo/v4/message?message=%22hola%22

        //  GApi.execute('echo', 'echo.message').then(function(resp) {
        //      //$scope.value = resp;
        //      console.log(resp);
        //  }, function() {
        //      console.log('error :(');
        //  });

      var resource = {
        message: "Appointment 4444"
      };

        $window.gapi.client.request({
          'path': 'https://crcasaslogin.appspot.com/_ah/api/echo/v4/private',
          'method': 'GET',
           'params': resource
        }).then(function(resp, rawResp) {
            console.log(resp);
            console.log(rawResp);            
        });         

// http://stackoverflow.com/questions/18260815/use-gapi-client-javascript-to-execute-my-custom-google-api
// http://stackoverflow.com/questions/19804951/google-cloud-endpoints-making-calls-with-js-client-passing-params-and-json-bo

//         $window.gapi.client.echo.echo.message().execute(
//             function(resp) {
//                 alert('que salio');
//         });


      //var request = $window.gapi.client.echo.echo.message({
      //                                  'message': mess
      //                              });

      //request.execute(function(jsonResp, rawResp) {
      //                  alert(rawResp);
      //                });


      auth.$sendPasswordResetEmail(email)
        .then(function() {
            console.log("Password reset email sent successfully!");
            vm.showSuccess = true;
            vm.showFailure = false;
        })
        .catch(function(error) {
            console.error("Error: ", error);
            vm.showSuccess = false;
            vm.showFailure = true;

        });
    }


    }
})();