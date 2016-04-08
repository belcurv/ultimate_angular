(function () {

    'use strict';

    angular
        .module('ngClassifieds')
        .controller('editClassifiedsCtrl', function ($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {
        
            var vm = this;
        
            // get a reference to our firebase
            vm.classifieds = classifiedsFactory.ref;
        
            vm.closeSidebar = closeSidebar;
            vm.saveEdit = saveEdit;
        
            // use $getRecord Firebase method to retrieve the database record by id
            vm.classified = vm.classifieds.$getRecord($state.params.id);

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
        
            function saveEdit() {
                // save the record
                vm.classifieds.$save(vm.classified).then(function () {
                    $scope.$emit('editSaved', 'Edit saved!');
                    vm.sidenavOpen = false;
                });
            }
        
        });

})();