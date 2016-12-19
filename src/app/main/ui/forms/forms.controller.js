(function ()
{


    'use strict';

    angular
        .module('app.ui.forms')
        .controller('FormsController', FormsController)
        .controller('ButtonController', ButtonController)               
        .directive('ngThumb', ['$window', ngThumbDirective]);
 

    /** @ngInject */
    function ButtonController($scope, $rootScope)
    {

       $scope.searching = false;

        $scope.buttonClick = function () {
            $scope.searching = true;
            getLocation();
        };

        function getLocationSuccFn(position) {

             $rootScope.map.center.latitude = position.coords.latitude;
             $rootScope.map.center.longitude = position.coords.longitude;
             $rootScope.map.marker.coords.latitude = position.coords.latitude;
             $rootScope.map.marker.coords.longitude = position.coords.longitude;

             $scope.searching = false;

             setTimeout(function() {
                $rootScope.map.control.refresh(position.coords);  
             }, 1000);
           

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

    }

 
    /** @ngInject */
    function FormsController($mdDialog, Contacts, User, $scope, $rootScope, FileUploader, uiGmapGoogleMapApi)
    {


        $scope.clickUpload = function(){
            angular.element('#upload').trigger('click');
        };
        
        $scope.uploader = new FileUploader();


        $scope.list1 = [];


        var vm = this;

        vm.showMap = false;

        $scope.showMapChanged = function() {
            if (vm.showMap) {
                setTimeout(function() {
                    $rootScope.map.control.refresh();  
                }, 100);
            } 
        };


        vm.contacts = Contacts.data;
        vm.user = User.data;

        // Data
        vm.stepper = {
            step1: {},
            step2: {},
            step3: {},
            step4: {},
            step5: {}
        };

        vm.basicForm = {};
        vm.formWizard = {};
        vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function (state)
        {
            return {abbrev: state};
        });

        // Methods
        vm.sendForm = sendForm;
        vm.submitStepper = submitStepper;

        //////////

        /**
         * Submit stepper form
         *
         * @param ev
         */
        function submitStepper(ev)
        {
            // You can do an API call here to send the form to your server

            // Show the sent data.. you can delete this safely.
            $mdDialog.show({
                controller         : function ($scope, $mdDialog, formWizardData)
                {
                    $scope.formWizardData = formWizardData;
                    $scope.closeDialog = function ()
                    {
                        $mdDialog.hide();
                    };
                },
                template           : '<md-dialog>' +
                '  <md-dialog-content><h1>You have sent the form with the following data</h1><div><pre>{{formWizardData | json}}</pre></div></md-dialog-content>' +
                '  <md-dialog-actions>' +
                '    <md-button ng-click="closeDialog()" class="md-primary">' +
                '      Close' +
                '    </md-button>' +
                '  </md-dialog-actions>' +
                '</md-dialog>',
                parent             : angular.element('body'),
                targetEvent        : ev,
                locals             : {
                    formWizardData: vm.stepper
                },
                clickOutsideToClose: true
            });

            // Reset the form model
            vm.stepper = {
                step1: {},
                step2: {},
                step3: {}
            };
        }

        /**
         * Send form
         */
        function sendForm(ev)
        {
            // You can do an API call here to send the form to your server

            // Show the sent data.. you can delete this safely.
            $mdDialog.show({
                controller         : function ($scope, $mdDialog, formWizardData)
                {
                    $scope.formWizardData = formWizardData;
                    $scope.closeDialog = function ()
                    {
                        $mdDialog.hide();
                    };
                },
                template           : '<md-dialog>' +
                '  <md-dialog-content><h1>You have sent the form with the following data</h1><div><pre>{{formWizardData | json}}</pre></div></md-dialog-content>' +
                '  <md-dialog-actions>' +
                '    <md-button ng-click="closeDialog()" class="md-primary">' +
                '      Close' +
                '    </md-button>' +
                '  </md-dialog-actions>' +
                '</md-dialog>',
                parent             : angular.element('body'),
                targetEvent        : ev,
                locals             : {
                    formWizardData: vm.formWizard
                },
                clickOutsideToClose: true
            });

            // Clear the form data
            vm.formWizard = {};
        }


        /**
         * Map
         */

            $rootScope.map = {
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
                        draggable: true,
                    }                    
                },

                control: {},

                options: {
                    
                },                 

                events: {
                    click: function (mapModel, eventName, originalEventArgs) {

                                      var e = originalEventArgs[0];
                                      var lat = e.latLng.lat(),
                                      lon = e.latLng.lng(); 
                                       $rootScope.map.marker.coords.latitude = lat;
                                       $rootScope.map.marker.coords.longitude = lon;

                                      console.log(lat);
                       
                                }
                }
                
                    
            };



        uiGmapGoogleMapApi.then(function (maps)
        {

            maps.visualRefresh = true;

        });


    }

    /** @ngInject */
    function ngThumbDirective($window)
    {


        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {

            restrict: 'A',
            templateUrl: 'app/main/ui/forms/my-templates/template-1/template-1.html',

            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }


        };
    };




})();