
(function() {
   'use strict';
   angular.module('starter.controllers')

   .controller('InicioCtrl', function($scope,$ionicModal,
    $ionicLoading,ProcessoService) {
        console.log("InicioCtrl");
        init();
        $scope.isLogin = false;
        function init () {
            console.log('init');
            $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
            });

            ProcessoService.isLogin().then(function (data){
                $ionicLoading.hide();
                if(data){
                    $scope.isLogin = data;
                    console.log('success');
                }
            }, function (error){
                $scope.isLogin = false;
                $ionicLoading.hide();
            });
        }
        
        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };


        // Perform the login action when the user submits the login form
        $scope.doLogin = function(loginData) {
            console.log('Doing login',loginData);
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
            ProcessoService.login(loginData.username,loginData.password).then(function (data){
                console.log(data)
                $ionicLoading.hide();
                if(data){
                    $scope.isLogin = data;
                    $scope.modal.hide();
                    FCMPlugin.subscribeToTopic(loginData.username);
                }else{
                    alert("Login Invalido");
                }
                
            });
            $scope.modal.hide();

        };
        
    });
})();

