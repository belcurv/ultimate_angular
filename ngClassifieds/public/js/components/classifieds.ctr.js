(function () {
    
    'use strict';
    
    angular
    
        .module('ngClassifieds')    // this is just a reference to our main module
                                    // that we've already created.
    
        .controller('classifiedsCtrl', function ($scope, $http, classifiedsFactory, $mdSidenav, $mdToast) {
        
            classifiedsFactory.getClassifieds()
                .then(function (classifieds) {
                    $scope.classifieds = classifieds.data;
                });
        
            var contact = {         // fake logged-in user info
                name: "Phoney McRingring",
                phone: "555-555-5555",
                email: "phoney@ringring.com"
            };
        
            $scope.openSidebar = function () {
                $mdSidenav('left').open();
            };
        
            $scope.closeSidebar = function () {
                $mdSidenav('left').close();
            };
        
            $scope.saveClassified = function (classified) {
                if (classified) {
                    classified.contact = contact;  // give passed classified our fake contact
                    $scope.classifieds.push(classified);
                    $scope.classified = {};        // clear form fields
                    $scope.closeSidebar();         // close sidebar when done
                    showToast('Classified saved');
                }
                
            };
        
            $scope.editClassified = function (classified) {
                $scope.editing = true;   // used in DOM to show/hide appropriate buttons
                $scope.openSidebar();
                $scope.classified = classified;  // form classified = classified
            };
        
            $scope.saveEdit = function () {
                $scope.editing = false;
                $scope.classified = {};
                $scope.closeSidebar();
                showToast('Edits saved');
            };
        
            function showToast(message) {
                $mdToast.show(
                    $mdToast.simple()
                        .content(message)
                        .position('top right')
                        .hideDelay(3000)
                );
            };
            
        });
    
})();