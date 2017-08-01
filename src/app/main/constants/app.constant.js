(function () {
    'use strict';

    var appConstant = {
        'WIDTH': (40 + 16) / 2,
        'HEIGHT': (40 + 12)/2
    };

    angular
        .module('app.core')
        .constant('GLOBAL', appConstant);
})();