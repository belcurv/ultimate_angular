(function () {
    
    'use strict';
    
    angular
    
        .module('ngClassifieds')    // this is just a reference to our main module
                                    // that we've already created.
    
        .controller('classifiedsCtrl', function ($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
        
            var vm = this,
                contact = {         // fake logged-in user info
                    name: "Phoney McRingring",
                    phone: "555-555-5555",
                    email: "phoney@ringring.com"
                };
            
            vm.categories;
            vm.classified;
            vm.classifieds;
            vm.closeSidebar     = closeSidebar;
            vm.deleteClassified = deleteClassified;
            vm.editing;
            vm.editClassified   = editClassified;
            vm.openSidebar      = openSidebar;
            vm.saveClassified   = saveClassified;
            vm.saveEdit         = saveEdit;
            

            classifiedsFactory.getClassifieds()
                .then(function (classifieds) {
                    // populate classifies after async completes
                    vm.classifieds = classifieds.data;
                
                    // populate categories after async completes
                    vm.categories = getCategories(vm.classifieds);
                });
        
        
            function openSidebar() {
                // $mdSidenav('left').open();    // used prior to ui-router
                $state.go('classifieds.new');    // tells ui-router to go to classifieds.new
                                                 // state when button is clicked
            }
        
            function closeSidebar() {
                $mdSidenav('left').close();
            }
        
            function saveClassified(classified) {
                if (classified) {
                    classified.contact = contact;  // give passed classified our fake contact
                    vm.classifieds.push(classified);
                    vm.classified = {};            // clear form fields
                    closeSidebar();                // close sidebar when done
                    showToast('Classified saved');
                }
            }
        
            function editClassified(classified) {
                vm.editing = true;   // used in DOM to show/hide appropriate buttons
                openSidebar();
                vm.classified = classified;  // form classified = classified
            }
        
            function saveEdit() {
                vm.editing = false;
                vm.classified = {};
                closeSidebar();
                showToast('Edits saved');
            }
        
            function deleteClassified(event, classified) {
                // first, setup the 'confirm' dialog
                var confirm = $mdDialog.confirm()
                    // Short description of what you're about to do:
                    .title('Are you sure you want to delete ' + classified.title + '?')
                    // .ok = text that appears in the OK button
                    .ok('Damn right!')
                    // .cancel method takes whatever text we want on the cancel button
                    .cancel('Fuck no!')
                    // finally, targetEvent takes event type from view's $event arg
                    .targetEvent(event);
                
                // then we actually show the dialog, which takes our confim
                // and returns a promise:
                $mdDialog.show(confirm).then(function () {
                    // trigger on 'yes': delete the classified.
                    // first, find the index of the passed classified in our array
                    var index = vm.classifieds.indexOf(classified);
                    // then splice it out!
                    vm.classifieds.splice(index, 1);
                }, function () {
                    // terigger on 'cancel'
                    
                });
            }
        
            function showToast(message) {
                $mdToast.show(
                    $mdToast.simple()
                        .content(message)
                        .position('top right')
                        .hideDelay(3000)
                );
            }
        
            function getCategories(classifieds) {
                var categories = [];
                angular.forEach(classifieds, function (item) {
                    angular.forEach(item.categories, function (category) {
                        categories.push(category);
                    });
                });
                
                return _.uniq(categories);
            }
            
        });
    
})();