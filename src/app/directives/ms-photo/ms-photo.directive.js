(function ()
{
    'use strict';

    angular
        .module('app.core')
        .directive('msPhoto', msPhotoDirective);

    /** @ngInject */
    function msPhotoDirective()
    {
        return {
            restrict: 'E',
            scope   : {
                templatePath: '=template',
                photo        : '=ngModel',
                vm          : '=viewModel'
            },
            template: '<div class="ms-photo-content-wrapper" ng-include="templatePath" onload="photoTemplateLoaded()"></div>',
            compile : function (tElement)
            {
                // Add class
                tElement.addClass('ms-photo');

                return function postLink(scope, iElement)
                {
                    // Methods
                    scope.photoTemplateLoaded = photoTemplateLoaded;

                    //////////

                    /**
                     * Emit cardTemplateLoaded event
                     */
                    function photoTemplateLoaded()
                    {
                        scope.$emit('msPhoto::photoTemplateLoaded', iElement);
                    }
                };
            }
        };
    }
})();