
(function() {
    'use strict';
  
  //init codePush config
  var successUpdate = function (syncStatus) {
    switch (syncStatus) {
      case SyncStatus.APPLY_SUCCESS:
        console.log("window.cordova.APPLY_SUCCESS")
        return;
      case SyncStatus.UP_TO_DATE:
        console.log("window.cordova.UP_TO_DATE")
        break;
      case SyncStatus.UPDATE_IGNORED:
        console.log("window.cordova.UPDATE_IGNORED")
        break;
      case SyncStatus.ERROR:
        console.log("window.cordova.ERROR")
        break;
    }
  };


  var onProgressUpdate = function (downloadProgress) {
    console.log("Downloading " + downloadProgress.receivedBytes + " of " + downloadProgress.totalBytes);
  }

  //end codePush config

  var onRun = function() {

      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
        FCMPlugin.onNotification(function(data){
          if(data.wasTapped){
            //Notification was received on device tray and tapped by the user.
            alert( JSON.stringify(data) );
          }else{
            //Notification was received in foreground. Maybe the user needs to be notified.
            alert( JSON.stringify(data) );
          }
        });
        codePush.sync(successUpdate, { 
          updateDialog: 
          {  
            appendReleaseDescription: true,  
            updateTitle: "Novo Update Do Aplicativo!"  
          }, 
          installMode: InstallMode.IMMEDIATE
        },onProgressUpdate);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

  };
    
  var config = function ($stateProvider, $urlRouterProvider){
   $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
    .state('inicio', {
        url: '/inicio',
        templateUrl: 'templates/inicio.html',
        controller: 'InicioCtrl'
    })
    
    .state('config', {
      url: '/config',
      templateUrl: 'templates/config.html',
      controller: 'ConfiguracaoCtrl'
    })

    .state('app.meus-processos', {
    url: '/meus-processos',
    views: {
      'menuContent': {
        templateUrl: 'templates/lista-processos.html',
        controller : 'ListaProcessosCtrl',
        resolve : {
          title : function (){
            return "Meus Processos"
          },
          processos : function (ProcessoService) {
              return ProcessoService.getProcessos("")
          }
        }
      }
    }
  })

  .state('app.processos', {
    url: '/processos',
    views: {
      'menuContent': {
        templateUrl: 'templates/lista-processos.html',
        controller : 'ListaProcessosCtrl',
        resolve : {
          title : function (){
            return "Todos os Processos"
          },
          processos : function (ProcessoService) {
              return ProcessoService.getProcessos("*")
          }
        }
      }
    }
  })

  .state('app.pesquisa', {
    url: '/pesquisa/:assuntoId/:setorId/:orgaoId/:requerente',
    views: {
      'menuContent': {
        templateUrl: 'templates/lista-processos.html',
        controller : 'ListaProcessosCtrl',
        resolve : {
          title : function (){
            return "Pesquisa"
          }, 
          processos : function (ProcessoService,$stateParams) {
            var assuntoId = $stateParams.assuntoId
            var orgaoId = $stateParams.orgaoId
            var setorId = $stateParams.setorId
            var requerente = $stateParams.requerente
            return ProcessoService.pesquisa(assuntoId,orgaoId,setorId,requerente)
          }
        }
      }
    }
  })

  
  .state('app.historico', {
    url: '/historico/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/historico.html',
        controller : 'HistoricoCtrl',
        resolve : {
          historico : function ($stateParams,ProcessoService){
            return ProcessoService.historico($stateParams.id)
          }
        }
      }
    }
  })

  .state('app.mensagem', {
    url: '/mensagem/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/mensagem.html',
        controller : 'MensagemCtrl',
        resolve : {
          historico : function ($stateParams,ProcessoService){
            return ProcessoService.historico($stateParams.id)
          }
        }
      }
    }
  })
  $urlRouterProvider.otherwise('/inicio');
  };

angular.module('starter', ['ionic', 'starter.controllers','starter.services', 'filters'])
 .run(function($ionicPlatform) {
   $ionicPlatform.ready(onRun);
 })

.config(config);
})();
