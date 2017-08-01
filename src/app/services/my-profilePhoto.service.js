(function ()
{
    'use strict';

    angular
        .module('app.core')
        .factory('profilePhotoService', profilePhotoService);


    /** @ngInject */
   function profilePhotoService(authService, firebaseDataService) {


      var photoRef = getPhotoReference();


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

      return service;

      


    ////////////

    function getCurrentUser() {
      return currentUser;
    }

    function customPhotoExists() {

      if (authService.isLoggedIn()) 
      return currentPhotoURL;

    }

   }



}());