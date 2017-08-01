(function ()
{
    'use strict';

    angular
        .module('app.core')
        .factory('authService', authService);


    /** @ngInject */
   function authService($firebaseAuth, firebaseDataService, $rootScope) {
    console.log("authService init...");
    var firebaseAuthObject = $firebaseAuth();
    var currentUID;
    var currentUser;
    var currentPhotoURL;

    $rootScope.displayName = '';
    $rootScope.photoURL = '/assets/angular-material-assets/img/icons/ic_person_24px.svg';
    $rootScope.isLoggedIn = false;

    var service = {
      firebaseAuthObject: firebaseAuthObject,
      register: register,
      login: login,
      logout: logout,
      isLoggedIn: isLoggedIn,
      sendWelcomeEmail: sendWelcomeEmail,
      currentPhotoURL: currentPhotoURL,
      getCurrentUser: getCurrentUser,
      getPhotoURL: getPhotoURL
    };

    firebaseAuthObject.$onAuthStateChanged(function(firebaseUser) {
          // We ignore token refresh events.
 
          if (firebaseUser && currentUID === firebaseUser.uid) {
            $rootScope.isLoggedIn = true;
            return;
          }
          if (firebaseUser) {
            currentUID = firebaseUser.uid;
            currentUser = firebaseUser;
            currentPhotoURL = firebaseUser.photoURL;
            console.log("firebaseUser assignments...");
            console.log(firebaseUser);
            $rootScope.displayName = firebaseUser.displayName;
            $rootScope.photoURL = firebaseUser.photoURL;
            $rootScope.isLoggedIn = true;

          } else {
            // Set currentUID to null.
            console.log("set currentUID to null...");

            currentUID = null;
            currentPhotoURL = '/assets/angular-material-assets/img/icons/ic_person_24px.svg';           
            // Display the splash page where you can sign-in.
            $rootScope.displayName = '';
            $rootScope.photoURL = '/assets/angular-material-assets/img/icons/ic_person_24px.svg';
            $rootScope.isLoggedIn = false;


          }  

    }); 

    return service;

      


    ////////////

    function getCurrentUser() {
      return currentUser;
    }

    function getPhotoURL() {
      return currentPhotoURL;
    }

    function register(user) {
      return firebaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password);
    }

    function login(user) {
      return firebaseAuthObject.$signInWithEmailAndPassword(user.email, user.password);
    }

    function logout() {
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



}());