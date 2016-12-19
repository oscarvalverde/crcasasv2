(function ()
{
    'use strict';

    angular
        .module('app.components.maps')
        .controller('MapsController', MapsController)       
        .controller('mapCtrl', function ($scope, $rootScope) {


            $scope.map = {
                center: {
                    latitude : 9.927128,
                    longitude: -84.082012
                },
                zoom  : 14,
                marker: {
                    id    : 0,
                    coords: {
                        latitude : 9.9271282,
                        longitude: -84.082012
                    }
                },
                control: {}                
            };

            $scope.controlText = 'Who controls you';
            $scope.danger = false;
            $scope.searching = false;

          $scope.controlClick = function () {
                $scope.searching = true;
                getLocation();
            };




        function getLocationSuccFn(position) {

         $rootScope.simpleMarkerMap.center.latitude = position.coords.latitude;
          $rootScope.simpleMarkerMap.center.longitude = position.coords.longitude;
          $rootScope.simpleMarkerMap.marker.coords.latitude = position.coords.latitude;
          $rootScope.simpleMarkerMap.marker.coords.longitude = position.coords.longitude;

         $rootScope.simpleMarkerMap.control.refresh({latitude: position.coords.latitude, longitude: position.coords.longitude});
         $scope.searching = false;
        }

        function getLocationErrFn(error) {
          console.log("fail");
          switch(error.code) {
            case error.PERMISSION_DENIED:
              console.log("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              console.log("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              console.log("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              console.log("An unknown error occurred.");
              break;
          }
        }

        function getLocation() {
          if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getLocationSuccFn, getLocationErrFn, {timeout: 10000});
          }
        }


        });

    /** @ngInject */
    function MapsController($scope, $rootScope, $state, uiGmapGoogleMapApi)
    {
        var vm = this;

        // Data
        var currentState = $state.current.name;

        switch ( currentState )
        {
            case 'app.components_maps':
                vm.selectedIndex = 0;
                break;

            case 'app.components_maps.satellite':
                vm.selectedIndex = 1;
                break;

            case 'app.components_maps.terrain':
                vm.selectedIndex = 2;
                break;

            case 'app.components_maps.simple-marker':
                vm.selectedIndex = 3;
                break;

            case 'app.components_maps.custom-marker':
                vm.selectedIndex = 4;
                break;

            case 'app.components_maps.info-window':
                vm.selectedIndex = 5;
                break;

            default:
                vm.selectedIndex = 0;
        }

        // Methods

        //////////

        uiGmapGoogleMapApi.then(function (maps)
        {
            vm.simpleMap = {
                center: {
                    latitude : 9.927128,
                    longitude: -84.082012
                },
                zoom  : 8
            };

            vm.satelliteMap = {
                center : {
                    latitude : -34.397,
                    longitude: 150.644
                },
                zoom   : 8,
                options: {
                    mapTypeId: maps.MapTypeId.SATELLITE
                }
            };

            vm.terrainMap = {
                center : {
                    latitude : -34.397,
                    longitude: 150.644
                },
                zoom   : 8,
                options: {
                    mapTypeId: maps.MapTypeId.TERRAIN
                }
            };

            $rootScope.simpleMarkerMap = {
                center: {
                    latitude : 9.927128,
                    longitude: -84.082012
                },
                zoom  : 14,
                marker: {
                    id    : 0,
                    coords: {
                        latitude : 9.9271282,
                        longitude: -84.082012
                    },
                    options: {
                        draggable: true
                    }                    
                },

                control: {}                
            };

            vm.customMarkerMap = {
                center: {
                    latitude : -25.363882,
                    longitude: 131.044922
                },
                zoom  : 8,
                marker: {
                    id     : 0,
                    coords : {
                        latitude : -25.363882,
                        longitude: 131.044922
                    },
                    options: {
                        icon: {
                            anchor: new maps.Point(36, 36),
                            origin: new maps.Point(0, 0),
                            url   : '//google-developers.appspot.com/maps/documentation/javascript/examples/full/images/beachflag.png'
                        }
                    }
                }
            };

        });




          $scope.controlText = 'I\'m a custom control';
          $scope.fueraClick = function () {
               console.log(vm.simpleMarkerMap.control);
              //$scope.control.control.refresh({latitude: 32.779680, longitude: -79.935493});
              //getLocation();
          };





    }

})();