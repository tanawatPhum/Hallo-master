angular.module('moduleControlles')
.service('$internetServ',function($ionicLoading,$rootScope,$cordovaNetwork) {
    
    this.status = function(callback){
        var state = null;
    
        /*var isOnline = $cordovaNetwork.isOnline();
        var isOffline = $cordovaNetwork.isOffline();
        if(isOnline==true){
            state ="online";
        }else{
            state ="offline"
        }*/
      state ="online";
        callback(state);
        
    }
});