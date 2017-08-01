(function ()
{
    'use strict';

    angular
        .module('app.core')
        .controller('MyThemeOptionsController', MyThemeOptionsController)
        .directive('myThemeOptions', myThemeOptions);

    /** @ngInject */
    function MyThemeOptionsController($cookies, mySettings, $rootScope)
    {
        var vm = this;

        // Data
        //vm.layoutStyle = $cookies.get('layoutStyle') || 'verticalNavigation';

        vm.currencyModel = 'colones';

        // Methods
        vm.updateCurrencyView = updateCurrencyView;

        mySettings.getSettings()
            .then( function (settings) {
                console.log('inside themes' + settings.exchRate);
            });


        /**
         * xxxx
         */
        function updateCurrencyView()
        {
            $rootScope.localCurrency = !$rootScope.localCurrency;
        }

    }

    /** @ngInject */
    function myThemeOptions()
    {
        return {
            restrict   : 'E',
            scope      : {
                panelOpen: '=?'
            },
            controller : 'MyThemeOptionsController as vm',
            templateUrl: 'app/main/directives/mytheme-options/theme-options.html',
            compile    : function (tElement)
            {
                tElement.addClass('my-theme-options');

                return function postLink(scope, iElement)
                {
                    var bodyEl = angular.element('body'),
                        backdropEl = angular.element('<div class="my-theme-options-backdrop"></div>');

                    // Panel open status
                    scope.panelOpen = scope.panelOpen || false;

                    /**
                     * Toggle options panel
                     */
                    function toggleOptionsPanel()
                    {
                        if ( scope.panelOpen )
                        {
                            closeOptionsPanel();
                        }
                        else
                        {
                            openOptionsPanel();
                        }
                    }

                    function openOptionsPanel()
                    {
                        // Set panelOpen status
                        scope.panelOpen = true;

                        // Add open class
                        iElement.addClass('open');

                        // Append the backdrop
                        bodyEl.append(backdropEl);

                        // Register the event
                        backdropEl.on('click touch', closeOptionsPanel);
                    }

                    /**
                     * Close options panel
                     */
                    function closeOptionsPanel()
                    {
                        // Set panelOpen status
                        scope.panelOpen = false;

                        // Remove open class
                        iElement.removeClass('open');

                        // De-register the event
                        backdropEl.off('click touch', closeOptionsPanel);

                        // Remove the backdrop
                        backdropEl.remove();
                    }

                    // Expose the toggle function
                    scope.toggleOptionsPanel = toggleOptionsPanel;
                };
            }
        };
    }
})();