
(function() {
    'use strict';
 angular.module('starter').service('configService', function($timeout,$window){
    console.log('configService');
    
    
    this.setUrl = function (url){
        
        $timeout(function (){
            $window.localStorage['_url'] = JSON.stringify(url);
        }, 100);
        
    }

    this.getUrl = function () {
        var url = $window.localStorage['_url'] || "http://189.81.46.115:8088"
        return url;
    }
 });
})();
