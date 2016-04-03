(function () {

    'use strict';

    angular
        .module('ngClassifieds')
        .controller('newClassifiedsCtrl', function ($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {
        
            var vm = this;
            vm.closeSidebar = closeSidebar;
            vm.saveClassified = saveClassified;

            $timeout(function () {
                $mdSidenav('left').open();
            });

            $scope.$watch('vm.sidenavOpen', function (sidenav) {
                if (sidenav === false) {
                    $mdSidenav('left')
                        .close()
                        .then(function () {
                            $state.go('classifieds');
                        });
                }
            });

            function closeSidebar() {
                vm.sidenavOpen = false;
            }
        
            function saveClassified(classified) {
                if (classified) {
                    classified.contact = {         // fake logged-in user info
                        name: "Phoney McRingring",
                        phone: "555-555-5555",
                        email: "phoney@ringring.com"
                    };
                    
                    $scope.$emit('newClassified', classified);
                    vm.sidenavOpen = false;
                }
            }
        
        });

})();