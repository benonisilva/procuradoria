
(function() {
    'use strict';
 angular.module('filters', [])
  .filter('sqltodate', function() {
   return function(input, uppercase) {
     input = input || '';
     var out = new Date(parseInt(input.substr(6)));
     return out;
  };
 })
})();
