(function ()
{
    'use strict';

    angular
        .module('app.core')
        .directive('msImage', msImageDirective)
        .directive('msImageUpload', msImageUploadDirective);

    /** @ngInject */
    function msImageDirective()
    {
        return {
            restrict: 'E',
            scope   : {},
            templateUrl: 'app/directives/ms-image/templates/template-1/template-1.html',
            link: function (scope, element, attrs) {
              // welcomeCtrl.sayHowdy();
              console.log('i am here inside link');
            },              
            controller : function ($scope)
            {
                $scope.imageReady = false;
                $scope.imageLoading = false;
                $scope.imageEditing = false;
                $scope.blankImageUrl = "/assets/images/avatars/profile.jpg";
            }
        };
    }

    /** @ngInject */
    function msImageUploadDirective()
    {
        return {
            require: "msImage",
            link: function (scope, element, attrs, msImageCtrl) {
              // welcomeCtrl.sayHowdy();
              console.log('i am here inside upload');
            }            

        };
    }

})();