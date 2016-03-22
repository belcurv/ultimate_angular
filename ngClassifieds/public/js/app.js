/*
 * app.js
 *
 * Our front-end Angular app
*/

angular
    
    .module('ngClassifieds', ['ngMaterial', 'ngAnimate', 'ngAria'])
    
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('amber')
            .accentPalette('brown');
    })

    .directive('helloWorld', function () {
        return {
            template: '<h1> {{ message }} </h1>'
        }
    });