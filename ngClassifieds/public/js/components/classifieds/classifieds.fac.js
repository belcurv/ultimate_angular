(function () {
    
    'use strict';
    
    angular.module('ngClassifieds')
        .factory('classifiedsFactory', function ($http, $firebaseArray) {
            
            var ref = new Firebase('https://jrs-ngclassifieds.firebaseio.com/');
        
            return {
                ref: $firebaseArray(ref)
            };
            
        });
    
})();