(function () {

    'use strict';

    angular
        .module('ngClassifieds')
        .controller('newClassifiedsCtrl', function ($mdSidenav, $timeout, $mdDialog, classifiedsFactory) {
        
        var vm = this;
        
        $timeout(function () {
            $mdSidenav('left').open();
        });
        
    })

})();