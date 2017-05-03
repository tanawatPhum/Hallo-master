angular.module('moduleControlles')
.service('$dataServ',function($ionicLoading,DatabaseService,$rootScope,$timeout,$ionicPlatform) {
        this.getData = function(callback){
        $ionicPlatform.ready(function() {
                DatabaseService.initDB(); 
                console.log("++++++++++++++getAll++++++++++");
                DatabaseService.getAllNote().then(function(data){
                        
                
                        $timeout(function(){
                                console.log(data);
                                callback(data);
                       },500)
                })
        })
        }




})