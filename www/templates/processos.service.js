(function() {
    'use strict';

    angular
        .module('starter.services',[])
        .factory('ProcessoService', ProcessoService);
        ProcessoService.$injetc = ['$q','$http','$timeout','cacheService','configService','$ionicLoading'];
  function ProcessoService($q,$http,$timeout,cacheService,configService,$ionicLoading) { 
        
    var url = configService.getUrl();
      
    var service = {
        
        getProcessos : getProcessos,
        getAssuntos : getAssuntos,
        getOrgaos: getOrgaos,
        getSetores : getSetores,
        pesquisa  : pesquisa,
        historico : historico,
        getSetorById : getSetorById,
        login : login,
        isLogin : isLogin,
        sendMsg : sendMsg
    
    }

    return service;

    function getSetorById(setorId) {
        var setorNome = "";
        return setorNome;
    }

    function sendMsg (dest,msg) {
        var q = $q.defer();
        $http.get(url+"/Home/SendMensage?destinatario="+dest+"&mensagem="+msg)
        .then(function (data){
            console.log("sendMsg:sucess")
            q.resolve(data.data.success);
        }, function (error){
            console.log("sendMsg:error")
            console.log(error)
            if(error.status === 404) q.resolve(false);
            q.resolve(false);
        }).catch(function (error){
            if(err.status === 404) return null; //returning recovery
            // otherwise return a $q.reject
            return $q.resolve(false);
        });

        return q.promise;
    } 

    function isLogin () {
        var q = $q.defer();
        $http.get(url+"/Account/Logado").then(function (data){
            console.log("isLogin:sucess")
            q.resolve(data.data.success);
        }, function (error){
            console.log("isLogin:error")
            console.log(error)
            if(error.status === 404) q.resolve(false);
            q.resolve(false);
        }).catch(function (error){
            if(err.status === 404) return null; //returning recovery
            // otherwise return a $q.reject
            return $q.resolve(false);
        });

        return q.promise;
    }

    function login(user, pass){
        var q = $q.defer();
        $http.post(url+"/Account/Login",{user:user,pass:pass}).then(function(data){
            console.log(data.data.success);
            q.resolve(data.data.success);
        })
        return q.promise;  
    }

    function historico(idProcesso){
       var q = $q.defer();
       $ionicLoading.show({
         content: 'Loading',
         animation: 'fade-in',
         showBackdrop: true,
         maxWidth: 200,
         showDelay: 0
       });
        $http.get(url+"/Home/Historico?idProcesso="+idProcesso,{cache:true})
        .then(function (data){
            console.log("historico:sucess")
            var historico = [];
            data.data.historico.forEach(function(element) {
                var de = cacheService.getSetor(element.IdLocal)
                historico.push(
                    { 
                        Data:element.Data, 
                        Parecer : element.Parecer, 
                        De : de,
                        Responsavel : element.Responsavel
                    });
            }, this);
            $ionicLoading.hide();
            q.resolve(historico);
        }, function (error){
            console.log("historico:error")
            console.log(error)
            $ionicLoading.hide();
            q.resolve(error);
        });

        return q.promise;  
    }

    function pesquisa  (assuntoId,orgaoId,setorId,requerente){
        var q = $q.defer();
        var req = (requerente===undefined || requerente === null) ? "" : requerente
        var query = "assuntoId="+assuntoId;
        query =  query + "&setorId="+setorId;
        query =  query + "&orgaoId="+orgaoId;
        query =  query + "&requerente="+req;
        console.log(query);
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        $http.get(url+"/Home/PesquisaProcesso?"+query,{cache:false}).then(function (data){
            console.log("pequisa:sucess")
            q.resolve(data.data.processos);
        });
        return q.promise; 
    }  

    function getAssuntos(){
       var q = $q.defer();
        $http.get(url+"/Home/Assunto",{cache:true}).then(function (data){
            console.log("getAssuntos:sucess")
            q.resolve(data.data.assuntos);
        }, function (error){
            console.log("getAssuntos:error")
            console.log(error)
            q.resolve(error);
        });

        return q.promise;  
    }

    function getSetores(){
       var q = $q.defer();
        $http.get(url+"/Home/Setor").then(function (data){
            console.log("getSetores:sucess")
            var setores = data.data.setores;
            console.log(setores)
            setores.forEach(function(element) {
                cacheService.setSetor(element.SetorId,element.Nome)
            }, this);
            q.resolve(setores);
        }, function (error){
            console.log("getSetores:error")
            console.log(error)
            q.resolve(error);
        });

        return q.promise;  
    }

    function getOrgaos(){
       var q = $q.defer();
        $http.get(url+"/Home/Orgao",{cache:true}).then(function (data){
            console.log("getOrgaos:sucess")
            q.resolve(data.data.orgaos);
        }, function (error){
            console.log("getOrgaos:error")
            console.log(error)
            q.resolve(error);
        });

        return q.promise;  
    }


    function getProcessos(pesquisa){
        var q = $q.defer();
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        $http.get(url+"/Home/Processo?pesquisa="+pesquisa,{cache:true})
         .then(function (data){
            console.log("getProcessos:sucess")
            $ionicLoading.hide();
            q.resolve(data.data.processos);
        }, function (error){
            console.log("getProcessos:error")
            console.log(error)
            $ionicLoading.hide();
            q.resolve(error);
        });


        return q.promise;  
    }
      
  };

})();