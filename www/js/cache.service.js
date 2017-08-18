(function() {
    'use strict';

 angular.module('starter').service('cacheService', function($cacheFactory){
    console.log('cacheService');
    
    var cache = $cacheFactory('dataCache');
    this.getSetor = function (setorId){
        return cache.get(setorId);
    }

    this.setSetor = function (key,data) {
        cache.put(key,data);
        return;
    }
 });

})();
