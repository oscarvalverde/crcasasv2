(function ()
{
    'use strict';

    angular
        .module('app.pages.profile')
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController(Timeline, About, PhotosVideos, 
                               authService, $firebaseAuth, $firebaseObject,
                               $scope, $log)
    {
        var vm = this;
        vm.activated = true;

        // Data
        vm.posts = Timeline.posts;
        vm.activities = Timeline.activities;
        vm.about = About.data;
        vm.photosVideos = PhotosVideos.data;

        vm.saveUser = saveUser;

        // vm.fileUpload = fileUpload;

        // vm.readFile = readFile;

        // Firebase

        var auth = $firebaseAuth();
        
        vm.firebaseUser = auth.$getAuth();
        // vm.firebaseUser = authService.getCurrentUser();
        //console.log(vm.firebaseUser);

        if (vm.firebaseUser) {
          console.log("Signed in as:", vm.firebaseUser.uid);
        } else {
          console.log("Signed out");
        }

        vm.url = "";

        vm.photoURL = authService.getPhotoURL();

        var ref = firebase.database().ref();
        vm.user = $firebaseObject(ref.child('users').child(vm.firebaseUser.uid));

        vm.user.$loaded()
          .then(function() {
            console.log('user loaded');
          })
          .catch(function(err) {
            console.error(err);
          });


        // Points to the root reference
        vm.storageRef = firebase.storage().ref();


        //vm.watermark = watermark;

        //firebase.database().ref('listing/'+ vm.firebaseUser.uid).set({
        //    sourceId: '80808',
        //    title: 'Lote a la venta en Purral',
        //    description : 'Lo siguiente es un ejemplo de descripcion...'
        //});


        // Methods

        //////////

        //var user = $firebaseObject(ref.child('users').child(vm.firebaseUser.uid));
        //user.$loaded().then(function () {
        //      var newUser = {
        //            phone: '2292-4227',
        //            office: '2292-4227',
        //            mobile: '8394-8608'
        //        };            
        //    if (user.phone == undefined) {
        //
        //
        //        user.$ref().set(newUser);                    
        //    }
        //    user.$ref().set(newUser);                    
    
        //});


        function saveUser(user) {

            user.$save().then(function(ref) {
              //ref.key() === user.$id; // true
            }, function(error) {
              console.log("Error:", error);
            });
        }

        vm.thisimage = null;
        // https://gist.github.com/abehaskins/7330325
        $scope.upload_image = function (image) {
            if (!image.valid) return;

            var imagesRef, safename, imageUpload;
            vm.thisimage = image.data;
            console.log(vm.thisimage);
            image.isUploading = true;
            imageUpload = {
                isUploading: true,
                data: image.data,
                thumbnail: image.thumbnail,
                name: image.filename,
                author: {
                    provider: vm.firebaseUser.providerData.providerId,
                    id: vm.firebaseUser.uid
                }
            };

            safename = imageUpload.name.replace(/\.|\#|\$|\[|\]|-|\//g, "");

            // Points to 'images'
            var imagePath = '/public/users/' + vm.firebaseUser.uid + '/images/'+ safename ;

            console.log(imagePath);

            console.log(imageUpload);

            console.log('siguiente test');

            //vm.storageRef.child(imagePath).putString(imageUpload.data, 'data_url', function (err) {
            //    if (!err) {
                    //imagesRef.child(safename).child('isUploading').remove();
             //       $scope.$apply(function () {
             //           $scope.status = 'Your image "' + image.filename + '" has been successfully uploaded!';
            //            if ($scope.uploaded_callback !== undefined) {
             //               $scope.uploaded_callback(angular.copy(imageUpload));
            //           }
             //           image.isUploading = false;
            //            image.data = undefined;
            //            image.filename = undefined;
            //        });
            //    }else{
             //       $scope.error = 'There was an error while uploading your image: ' + err;
            //    }
            //});


            vm.storageRef.child(imagePath).putString(imageUpload.data, 'data_url')
               .then(function(snapshot) {
                      console.log('Uploaded a base64 string!');
                      vm.storageRef.child(imagePath).getDownloadURL().then(function(url) {
                      console.log(url);
                      vm.url = url;
                      }).catch(function(error) {
 
                      });

                    })
               .catch(function(error) {
                     console.log(error); 
                    }) 
               

        };
    
        function watermark() {
            watermark([vm.thisimage, '/assets/images/logos/crcasas.pgn'])
              .image(watermark.image.lowerRight(0.5))
              .then(function (img) {
                document.getElementById('imagen2').appendChild(img);
              });
        }

    }

})();
