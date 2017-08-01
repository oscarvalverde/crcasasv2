(function ()
{
    'use strict';

    angular.module('app.pages.profile')
        .controller('CropDialogController', CropDialogController);

    /** @ngInject */
    function CropDialogController($mdDialog, $scope, imageUrl, myLib)
    {
        var vm = this;

        $scope.obj = {}

        // The url or the data64 for the image
        $scope.obj.src = imageUrl ;

        // Must be [x, y, x2, y2, w, h]
        $scope.obj.coords = [100, 100, 200, 200, 100, 100];

        // You can add a thumbnail if you want
        $scope.obj.thumbnail = false;         

        // Methods
         vm.closeDialog = closeDialog;

        //////////

        function closeDialog(image)
        {
            $mdDialog.hide(image);
        }

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.crop = function() {
           var x = $scope.obj.coords[0];
           var y = $scope.obj.coords[1];
           var width = $scope.obj.coords[2] - x;
           var height = $scope.obj.coords[3] - y;

           myLib.cropImage($scope.obj.src, x, y, width, height).then(function(cropImage) {
              closeDialog(cropImage);
           });

        };        

    }
})();
