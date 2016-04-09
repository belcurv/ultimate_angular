(function () {
    
    'use strict';
    
    angular
    
        .module("ngClassifieds")
    
        .directive("classifiedCard", function () {

            var classifiedCardController = ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
                
                var vm = this;
                
                vm.editClassified = editClassified;
                vm.deleteClassified = deleteClassified;
                
                function editClassified(classified) {
                    vm.editing = true;
                    vm.classified = classified;
                    $state.go('classifieds.edit', {
                        id: classified.$id
                    });
                }
        
                function deleteClassified(event, classified) {
                    var confirm = $mdDialog.confirm()
                        .title('Are you sure you want to delete ' + classified.title + '?')
                        .ok('Damn right!')
                        .cancel('Fuck no!')
                        .targetEvent(event);

                    $mdDialog.show(confirm).then(function () {
                        vm.classifieds.$remove(classified);
                        showToast('Classified deleted!');

                    }, function () {
                        // fires on 'cancel'
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
            }];
        
            return {
                templateUrl: "js/components/classifieds/card/classified-card.tpl.html",
                scope: {
                    classifieds: "=classifieds"
                },
                controller: classifiedCardController,
                controllerAs: 'vm'
            };
        });
        
})();