(function ()
{
    'use strict';

    angular
        .module('app.core')
        .factory('mySettings', mySettings);

    /** @ngInject */
   function mySettings($q) {

	 var getSettings = function() {
	   		return $q( function (resolve, reject) {
				firebase.database().ref('/settings/').once('value').then(function(snapshot) {
					var response = {
						exchRate: snapshot.val().exchRate, 
						localCurrency: snapshot.val().localCurrency
					};
					console.log( 'inside: ' + response.exchRate);
					resolve( response )  
				});
	   		});
	 };

     var exports = {
       getSettings: getSettings
     };

     return exports;

   }

      

}());