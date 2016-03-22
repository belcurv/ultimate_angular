(function () {
    
    'use strict';
    
    angular
    
        .module('ngClassifieds')    // this is just a reference to our main module
                                    // that we've already created.
    
        .controller('classifiedsCtrl', function ($scope, $http, classifiedsFactory, $mdSidenav) {
        
            classifiedsFactory.getClassifieds()
                .then(function (classifieds) {
                    $scope.classifieds = classifieds.data;
            });
        
            $scope.openSidebar = function () {
                $mdSidenav('left').open();
            };
        
            $scope.closeSidebar = function () {
                $mdSidenav('left').close();
            };
            
        });
    
})();