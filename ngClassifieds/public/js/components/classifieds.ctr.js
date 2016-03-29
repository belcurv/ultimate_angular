(function () {
    
    'use strict';
    
    angular
    
        .module('ngClassifieds')    // this is just a reference to our main module
                                    // that we've already created.
    
        .controller('classifiedsCtrl', function ($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
        
            classifiedsFactory.getClassifieds()
                .then(function (classifieds) {
                    // populate classifies after async completes
                    $scope.classifieds = classifieds.data;
                
                    // populate categories after async completes
                    $scope.categories = getCategories($scope.classifieds);
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
        
            $scope.deleteClassified = function (event, classified) {
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
                    var index = $scope.classifieds.indexOf(classified);
                    // then splice it out!
                    $scope.classifieds.splice(index, 1);
                }, function () {
                    // terigger on 'cancel'
                    
                });
                
            };
        
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