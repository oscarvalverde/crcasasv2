(function ()
{
    'use strict';

    angular
        .module('app.pages.profile')
        .controller('PhotosVideosController', PhotosVideosController);

    // separation of concerns  
    // the controller’s responsibility should be to communicate between services and the view; 
    // i.e. its main concern should be view-model logic    
    // Keep STATE and LOGIC inside services and make extremely thin controllers

    /** @ngInject */
    function PhotosVideosController($scope, $window, myLib, $mdDialog, $document, imageService, GLOBAL, firebaseDataService)
    {

        // voy a basar la lógica en:
        // http://jsfiddle.net/w1Lh4w2t/

        //console.log(authService.isLoggedIn());


        console.log(firebaseDataService.users);

        var vm = this;

        vm.fileUpload = fileUpload;
        vm.editImage = editImage;
        vm.editIsDone = editIsDone;
        vm.undoEdit = undoEdit;

        vm.previousImage;        

        vm.cardModel = {
          title      : 'My Card',
          description: 'My card description',
          image: {
            src: '/assets/images/avatars/profile.jpg',
            alt: 'imagen'
          },
          controlButtonStyle: {
             'right': '0px',
             'top': '0px'          
          },
          getImageDimension: function (width, height) {
              $scope.$apply(function () {
                 vm.cardModel.controlButtonStyle.right = width / 2 - GLOBAL.WIDTH + 'px';
                 vm.cardModel.controlButtonStyle.top = height / 2  - GLOBAL.HEIGHT + 'px';
               });               
          },
          showTabDialog: function(ev) {
              $mdDialog.show({
                locals:{dataToPass: $scope.parentScopeData},                
                controller: mdDialogCtrl,
                templateUrl: 'app/templates/tab-dialog/template-1.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
              })
                  .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                  }, function() {
                    $scope.status = 'You cancelled the dialog.';
                  });
          }         
      }


      var mdDialogCtrl = function ($scope, dataToPass) { 
          $scope.mdDialogData = dataToPass;

          $scope.closeDialog = closeDialog;

          /**
           * Close the dialog
           */
          function closeDialog()
          {
              $mdDialog.cancel();
          }          

      }


     $scope.parentScopeData = {
      title: "este es el titulo",
      model: vm.cardModel
     } 

        $scope.sizeStyle =  {
          width: '300px',
          height: '200px'
        };


        vm.ngFlow = {
            // ng-flow will be injected into here through its directive
            flow: {}
        };

        var maxWidth =  300;
        var maxHeight = 200;

       // Desde un boton se puede llamar a esta función para activar el input type file que está escondido
       function fileUpload(selector) {
         angular.element(document.querySelector(selector)).click();
       };


        // Cuanto el usuario selecciona el archivo, llama a readFile
        $('#upload').on('change', function () { readFile(this, 'upload'); });

       $scope.userImageIsReady = false;
       $scope.userImageIsLoading = false;
       $scope.userImageIsBeenEdited = false;

       $scope.landscape = false;

       $scope.imageSrc = "/assets/images/avatars/profile.jpg";

       $scope.myImage = '/assets/images/avatars/profile.jpg';

        vm.imageUrl = null;
        vm.showControls = false;
        vm.fit = false;


    

        vm.myButtonLabels = {
          rotateLeft: '  (rotate izq)  ',
          rotateRight: ' (rotate der) ',
          zoomIn: ' (zoomIn) ',
          zoomOut: ' (zoomOut) ',
          fit: ' (fit) ',
          crop: ' [crop] '
        };

       function isLoading(status) {
            $scope.$apply(function(){
                $scope.userImageIsLoading = status;
            });
       }

       function isReady(status) {
          $scope.userImageIsReady = status;
       }       

       function undoEdit() {
          $scope.imageSrc = vm.previousImage;
       }       


       function editImage() {
              // $scope.userImageIsBeenEdited = true;
              // $scope.userImageIsLoading = false; 
              // $scope.obj.src = $scope.imageSrc;

              vm.previousImage = $scope.imageSrc;
              showCropDialog($scope.imageSrc);      
       }

       function editIsDone() {
              $scope.userImageIsBeenEdited = false;                  
       }       

       var brightness = 0;
       var correction = 0;
       var _caman = null;

       function readFile(input, selector) {
            if (input.files && input.files[0]) {

                //console.log('File size: '+ bytesToSize(input.files[0].size));
                //console.log('File bytes: '+ input.files[0].size);

                var fileSize = input.files[0].size;
                var reader = new FileReader();

                reader.onloadstart = function (e) {
                        isLoading(true);
                        isReady(false);
                        $scope.$apply(function(){
                              vm.imageUrl = null;
                       });                         
                }                
                reader.onloadend = function (e) {
                        isLoading(false);
                } 
                reader.onload = function (e) {
                    console.log('fileSize:' + fileSize);
                    var initialUrl = e.target.result;

                    myLib.getResizeDimensions(initialUrl, maxWidth, maxHeight).then( function(response) {
                        $scope.sizeStyle.width = response.width ;
                        $scope.sizeStyle.height = response.height ; 
 
                        if (fileSize > 10000000) {

                            myLib.loadImage(initialUrl).then( function(image) {
                                  imageService.resizeStep(image, 800, 800)
                                      .then(function (resizedImage) {
                                            $scope.imageSrc = resizedImage.src;
                                            isReady(true); 
                                      })
                            });                          

                        } else {
                            $scope.imageSrc = initialUrl;
                            isReady(true); 
                        }


                      }); 
            
                }
                
                reader.readAsDataURL(input.files[0]);
            }
            else {
                alert("Sorry - you're browser doesn't support the FileReader API");
            }
       }




       vm.rotateCaman = function () {
           console.log(_caman);
          //_caman.rotate(-90);
          //_caman.render();
       }


      vm.updateResultImage = function(base64) {
        $scope.imageSrc = base64;
      };

        // https://www.html5rocks.com/en/tutorials/canvas/imagefilters/


    
        /**
         * Show image crop dialog
         * @param image
         */

        function showCropDialog(imageUrl)
        {
            $mdDialog.show({
                controller         : 'CropDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/pages/profile/tabs/photos-videos/dialogs/crop/crop-dialog.html',
                parent             : angular.element($document.body),
                clickOutsideToClose: true,
                locals             : {
                                        imageUrl : imageUrl
                                      }
            }).then(function (response) {
                   $scope.imageSrc = response;   
            });
        }

        return vm;

    }

})();
