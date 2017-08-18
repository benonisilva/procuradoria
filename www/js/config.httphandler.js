/**
 * @author benoims
 * created on 28/02
 */
(function () {
  'use strict';

  angular.module('starter.services')
    .factory('HttpInterceptor', HttpInterceptor);

  /** @ngInject */
  function HttpInterceptor($rootScope, $q, $timeout) {
    //console.log("HttpInterceptor");
    return {
      'request': function (config) {
      	
      	//console.log("HttpInterceptor.request");
      	return config || $q.when(config); 
      },
      'requestError': function (rejection) {
            /*...*/
            if (rejection.status===-1) {
                alert("Servidor fora do ar");
            }
            return $q.reject(rejection);
      },
      'response': function (response) {       

            // done loading
            //console.log("HttpInterceptor.response");
            return response || $q.when(response);
        },
        'responseError': function (rejection) {
            /*...*/

            if(rejection.status===404 || rejection.status===403){
              alert("Faça login novamente.");
            }
            return $q.reject(rejection);
        }
    }
  }

})();
