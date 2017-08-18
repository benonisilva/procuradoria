(function() {
    'use strict';

  angular.module('starter.controllers')

   .controller('HistoricoCtrl', function($scope,historico) {
     console.log("HistoricoCtrl");
     $scope.historico = historico;

  });
})();
