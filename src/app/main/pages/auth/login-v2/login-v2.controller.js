(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.login-v2')
        .controller('LoginV2Controller', LoginV2Controller);


    /** @ngInject */
    function LoginV2Controller(GApi, $http, $location, 
                              $scope, $firebaseAuth, $firebaseObject, 
                              $stateParams,
                              $timeout,
                              $state, firebaseUrl)
    {

 
    var vm = this;
 
    var auth = $firebaseAuth();       

    var ref = firebase.database().ref();

    //var obj = $firebaseObject(ref);

    vm.login = login;

    vm.isLoggedIn  = false;

    vm.loginWithFacebook = loginWithFacebook;
    vm.loginWithGoogle = loginWithGoogle;

    vm.anotherProvider = false;

    vm.authError = { wrongPassword: false
                   };


    //initialize and get current authenticated state:
    //init();

    function init(){
        auth.$onAuthStateChanged(authDataCallback);
        if (auth.$getAuth()){
            vm.isLoggedIn  = true;
            console.log("User is loggedIn");
        }
        
    };


    function authDataCallback(authData) {
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
            vm.isLoggedIn = true;
            var user = $firebaseObject(ref.child('users').child(authData.uid));
            user.$loaded().then(function () {
                if (user.name == undefined) {
                    var newUser = {
                        rooms: [],
                        maxRooms: 5
                    };
                    console.log(authData);
                    if (authData.google) {
                        newUser.name = authData.google.displayName;
                        console.log(newUser.name);
                    }
                    if (authData.github) {
                        newUser.name = authData.github.username;
                    }
                    if (authData.email) {
                        newUser.name = authData.displayName;

                    }
                    user.$ref().set(newUser);                    
                }

                $state.go("app.pages_profile");
            });


            console.log("going to get token...");

            firebase.auth().currentUser.getToken(true).then(function(idToken) {
              // Send token to your backend via HTTPS
              // ...
              console.log("get token success 3");

              //GApi.execute('people', 'insertPeople', {
              //                       'token': idToken,
              //                       'people': {'fireBaseEmail': 'ovalverde@gmail.com'}}).then(function(resp) {
              //    console.log(resp);
              //    console.log('people success :)');


                  // 
              //}, function() {
              //    console.log('people error:(');
              //});              

            }).catch(function(error) {
              console.log("token error :(");
              console.log(error);
            });



        } else {
            console.log("User is logged out");
            vm.isLoggedIn = false;
        }
    }


    function login(email, password) {
      auth.$signInWithEmailAndPassword(email, password)
        .then(function() {
            console.log("Sign in success!");
            vm.authError.wrongPassword = false; 

            var goTo = $stateParams.toState || "app.pages_profile";
            console.log(goTo);
            $state.go(goTo);

         })
        .catch(function(error) {
              console.error("Error: ", error.code);
              switch(error.code) {
                  case "auth/wrong-password":
                      vm.authError.wrongPassword = true;
                      break;
                  default:
                      vm.authError.wrongPassword = true;                  
                      break;
              }

        });
    }    


    function loginWithFacebook() {
          // login with Facebook
          auth.$signInWithPopup("facebook").then(function(firebaseUser) {
            console.log("Signed in as:", firebaseUser.user.email);
            var goTo = $stateParams.toState || "app.pages_profile";
            console.log(goTo);
            $state.go(goTo);


          }).catch(function(error) {
            console.log("Authentication failed:", error);
            switch(error.code) {                
                case "auth/account-exists-with-different-credential":                    
                    vm.anotherProvider = true; 
                    $timeout(function(){vm.anotherProvider = false;}, 10000); 
                    break;
                default:
                    vm.anotherProvider = true; 
                    $timeout(function(){vm.anotherProvider = false;}, 10000); 
                    break;
            }


          });
    }   

     function loginWithGoogle() {
          // login with Facebook
          auth.$signInWithPopup("google").then(function(firebaseUser) {
            console.log("Signed in as:", firebaseUser.user.email);
            var goTo = $stateParams.toState || "app.pages_profile";
            console.log(goTo);
            $state.go(goTo);

          }).catch(function(error) {
            console.log("Authentication failed:", error);
            switch(error.code) {                
                case "auth/account-exists-with-different-credential":                    
                    vm.anotherProvider = true; 
                    $timeout(function(){vm.anotherProvider = false;}, 4000); 
                    break;
                default:
                    vm.anotherProvider = true; 
                    $timeout(function(){vm.anotherProvider = false;}, 4000); 
                    break;
            }            
          });
    } 



    }
})();