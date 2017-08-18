
(function() {
    'use strict';
    angular.module('starter.controllers')

.controller('ListaProcessosCtrl', function($scope, 
  $ionicModal, $q ,$ionicLoading,ProcessoService,title,$ionicActionSheet,$state,processos) {
    // Create the login modal that we will use later
  var titleView = title;
  $scope.title = titleView;

  // $scope.$on( "$ionicView.beforeEnter", function( scopes, states ) {
  //     if( states.fromCache ) {
  //           console.log("$ionicView.beforeEnter")
  //     }
  // });
  
  $ionicModal.fromTemplateUrl('templates/consulta-avancada.html', {
    scope: null
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.$watch('processos', function() {
    
  });

  $scope.showAction = function(id) {

    // Show the action sheet
    $ionicActionSheet.show({

      // The various non-destructive button choices
      buttons: [
        { text: '<i class="icon ion-document-text balanced"></i> Historico' },
        { text: '<i class="icon ion-chatboxes balanced"></i> Enviar Mensagem' },
      ],


      // The text of the cancel button
      cancelText: 'Fechar',

      // Called when the sheet is cancelled, either from triggering the
      // cancel button, or tapping the backdrop, or using escape on the keyboard
      cancel: function() {
      },

      // Called when one of the non-destructive buttons is clicked, with
      // the index of the button that was clicked. Return
      // "true" to tell the action sheet to close. Return false to not close.
      buttonClicked: function(index) {
        if(index === 0){ // Manual Button
          $state.go("app.historico",{id:id})
        }
        else if(index === 1){
            $state.go("app.mensagem",{id:id})
        }
        return true;
      },

      // Called when the destructive button is clicked. Return true to close the
      // action sheet. False to keep it open
      destructiveButtonClicked: function() {
        return true;
      }
    });

  };

  init();

  $scope.consultaAvancada = function() {
    console.log("consultaAvancada")
    $scope.modal.show();
  };

  function _initProcessos (data) {
      
      return data;

  };

  function init() {
    
    var pesquisa = title === "Todos os Processos" ? "*" : null;
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    return $q.all([
      processos,

    ]).then(function (data){
      console.log(data);
      $scope.processos = data[0];
      $ionicLoading.hide();
      return $scope;
    
    });
    
    
  };

});

})();
