(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick panel
            'app.quick-panel',
            // Apps
            // 'app.dashboards',
            // 'app.calendar',
            // 'app.e-commerce',
            // 'app.mail',
            // 'app.chat',
            // 'app.file-manager',
            // 'app.scrumboard',
            // 'app.gantt-chart',
            'app.search-v2',
            'app.contacts',
            'app.listing',
            // 'app.notes',

            // 'app.gallery',

            // Pages
            'app.pages',

            // User Interface
            // 'app.ui',

            // Components
            // 'app.components',

            'ngDragDrop',

            "firebase",


            'ngPassword',

            'angular-google-gapi',

            'imageCropper',

            '720kb.socialshare'

        ]);
})();
