(function() {
    'use strict';

  angular.module('starter.controllers')

   .controller('MensagemCtrl', function($scope,historico,ProcessoService,$ionicLoading) {
     console.log("MensagemCtrl");
     
     init();
     
     $scope.send = function (dest,msg) {
      $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
         }); 
      ProcessoService.sendMsg(dest,msg).then(function(data){
        $ionicLoading.hide();
        console.log(data)
      },function(err){
        console.log(err)
        $ionicLoading.hide();
      });
     }

     function init () {
       var hist = historico;
       $scope.historico = hist;
       var last =  hist.pop();
       $scope.dest = last.Responsavel;
       //console.log($scope)
       return $scope;
     }

  });
})();
