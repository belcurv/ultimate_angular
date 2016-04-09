(function () {
    
    'use strict';
    
    angular
    
        .module('ngClassifieds')    // this is just a reference to our main module
                                    // that we've already created.
    
        .controller('classifiedsCtrl', function ($scope, $state, $http, $stateParams, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
        
            var vm = this;
            
            vm.categories;
            vm.classified;
            vm.classifieds;
            vm.closeSidebar     = closeSidebar;
            vm.deleteClassified = deleteClassified;
            vm.editClassified   = editClassified;
            vm.openSidebar      = openSidebar;
            vm.saveClassified   = saveClassified;
            
            // connect to our Firebase reference
            vm.classifieds = classifiedsFactory.ref;
            
            // wait until classifieds loads before populating filters list
            vm.classifieds.$loaded().then(function (classifieds) {
                vm.categories = getCategories(classifieds);
            });

            $scope.$on('newClassified', function (event, classified) {
                vm.classifieds.$add(classified);
                showToast('Classified saved!');
            });
        
            $scope.$on('editSaved', function (event, message) {
                showToast(message);
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
                // == THE OLD WAY: used prior to ui-router ==
                // vm.editing = true;
                // openSidebar();
                // vm.classified = classified;

                vm.editing = true;
                vm.classified = classified;
                $state.go('classifieds.edit', {   // We pass an object to ui-router
                    // containing the $id we want to edit.
                    // We use $id now that we're using Firebase
                    id: classified.$id
                });
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
                    // triggers on 'yes': delete the classified.
                    
                    // // old way, before Firebase. We had to find the index of
                    // // the passed classified in our array:
                    // var index = vm.classifieds.indexOf(classified);
                    // // then splice it out!
                    // vm.classifieds.splice(index, 1);
                    
                    // new way, using Firebase method $remove:
                    vm.classifieds.$remove(classified);
                    showToast('Classified deleted!');
                    
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