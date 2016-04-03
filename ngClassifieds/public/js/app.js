/*
 * app.js
 *
 * Our front-end Angular app
*/

angular
    
    .module('ngClassifieds', ['ngMaterial', 'ui.router'])
    
    .config(function ($mdThemingProvider, $stateProvider) {
    
        $mdThemingProvider.theme('default')
            .primaryPalette('amber')
            .accentPalette('brown');
    
        $stateProvider
            .state('classifieds', {
                url: '/classifieds',
                templateUrl: 'js/components/classifieds/classifieds.tpl.html',
                controller : 'classifiedsCtrl as vm'
            })
        
            .state('classifieds.new', {
                url: '/new',
                templateUrl: 'js/components/classifieds/new/classifieds.new.tpl.html',
                controller : 'newClassifiedsCtrl as vm'
            })
    
            .state('classifieds.edit', {
                url: '/edit/:id',
                templateUrl: 'js/components/classifieds/edit/classifieds.edit.tpl.html',
                controller : 'editClassifiedsCtrl as vm',
                params: {
                    classified: null     // initialize this paramter as null
                }
            });
    
    });