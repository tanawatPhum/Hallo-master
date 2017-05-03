angular.module('moduleControlles')
.service('$authenServ',function($ionicLoading,firebaseServ,$rootScope,$ionicPlatform) {
    this.getAuthen = function(email,password,hostEmail,hostPassword,callbackAuthen){
        firebaseServ.signIn(email,password).then(function(data){
                $ionicPlatform.ready(function() {
                
                DatabaseService.initDB();
            /* DatabaseService.deleteAllNote().then(function(){
                    })*/
                    DatabaseService.getAllNote().then(function(data){
                        $rootScope.$watchCollection( 
                                function () {
                                    return data;
                                },
                                function ( newValue, oldValue ) {
                                    if(newValue.length>0){
                                    checkAuthen(newValue);
                                    console.log(newValue);
                                    }  
                                },true
                        );
                    })
                    
                    function checkAuthen(data){
                        var checkAuthen = false;
                        var indexUserInfo = null;
                        for(var i=0;i<data.length;i++){
                            if(data[i].hasOwnProperty('userInfo')){
                                checkAuthen==false;
                            }
                        }
                    }
                    if(checkAuthen==false){
                        DatabaseService.addNote({
                            userInfo:{
                                autenNone:{username:"hallo",password:1234},
                                autenRegis:{username:$scope.login.email,password:$scope.login.password}
                            }
                        })
                    }else{
                        if(indexUserInfo!=null){
                            data[indexUserInfo].userInfo = {
                                autenNone:{username:"hallo",password:1234},
                                autenRegis:{username:$scope.login.email,password:$scope.login.password}
                            }
                            DatabaseService.updateNote(data);

                        }
                    }

                })
                callbackAuthen()
        }).catch(function(e){
            console.log(e);
        })
    }




})