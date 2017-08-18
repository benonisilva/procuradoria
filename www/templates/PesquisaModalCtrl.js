
(function() {
    'use strict';
   angular.module('starter.controllers')
   .controller('PesquisaModalCtrl', 
       function($scope, $q,ProcessoService,$ionicLoading,$state) {
       console.log("PesquisaModalCtrl");
       var vm = this; 
       vm.requerente="";

       vm.closePesquisa = function() {
        console.log("closePesquisa")
        $scope.modal.hide();
       };


       vm.limpar = function () {
          delete  vm.assunto;
          delete  vm.setor;
          delete vm.orgao;
          vm.requerente = "";
       }
       
       vm.consulta = function (assunto,orgao,setor,requerente) {
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
         });
         $scope.modal.hide();
         $ionicLoading.hide();
         $state.go('app.pesquisa',
         {
            assuntoId: assunto ? assunto.AssuntoId : null,
            orgaoId: orgao ?  orgao.OrgaoId : null,
            setorId: setor ?  setor.SetorId : null,
            requerente : requerente
         });
        }

       function _init () {
           return data;
       }
    
        $q.all([
            ProcessoService.getSetores(_init),
            ProcessoService.getOrgaos(_init),
            ProcessoService.getAssuntos(_init)
        ]).then(function (data){
            console.log(data);
            vm.setores = data[0];
            vm.orgaos = data[1];
            vm.assuntos = data[2];
         return vm;
        
        });

    });
})();

