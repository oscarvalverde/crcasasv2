(function() {
  'use strict';

  // users: ui/

  angular
    .module('app.core')
    .factory('firebaseDataService', firebaseDataService);

  function firebaseDataService() {
    var root = firebase.database().ref();

    var service = {
      root: root,
      users: root.child('users'),
      listings: root.child('listings')
    };

    return service;
  }

})();