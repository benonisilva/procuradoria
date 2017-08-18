(function() {
    'use strict';
    angular.module('starter.controllers').controller('ConfiguracaoCtrl', Config);

    function Config ($scope,configService) {

        $scope.mudar = function (servidor){
            configService.setUrl(servidor);
        }
    }

})();