angular.module('moduleControlles')
.controller("loginCtrl", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,$ionicTabsDelegate,AppModules,$loadingServ,$operandServ,$ionicSideMenuDelegate,$ionicSlideBoxDelegate,DatabaseService,firebaseServ,$rootScope,$authenServ,$timeout,$dataServ,$loadingServ,$ionicPopup,$internetServ,$cordovaNetwork) {
    $scope.login = [];
    $scope.login.email = "tanawat_phum@hotmail.com";
    $scope.login.password = "123456";
  
    $ionicPlatform.ready(function() {
        DatabaseService.initDB();
    })
    $scope.goToHomeRegis = function(){
        console.log($scope.login.email);
        console.log($scope.login.password);
        $internetServ.status(callbackStatusInternet);
        function callbackStatusInternet(status){
            if(status=="online"){
                $loadingServ.openLongLoading();
                $dataServ.getData(callbackDataNote);
                console.log("connected");
            }else{
                 $ionicPopup.confirm({
                    title: 'คำเตือน',
                    template: '<center>ไม่ได้เชื่อมต่อเครือข่าย<center>',
                     buttons: [
                        {
                            text: '<b>ตกลง</b>',
                            type: 'button-positive',
                        }
                    ]
                });
                console.log("not connected");
            }
        }
           
    }
       

    function callbackDataNote(data){
        var email=null;
        var password=null;
     
        if(data.length>0){
            for(var i =0;i<data.length;i++){
                if(data[i].hasOwnProperty('userInfo')){
                    email = data[i].userInfo.authen.email;
                    password = data[i].userInfo.authen.password;
                    console.log(email);
                    console.log(password);
                    if(email=="hallo@hotmail.com"&&password==1234){
                        console.log("authen equal guest")
                        callbackSyn(data);
                    }else{
                        firebaseServ.syncFirebase(data,email,password,callbackSyn)
                    }
                    break;
                }
            } 
        }else{
            callbackSyn([]);
        }   
    }
    function callbackSyn(data){
        console.log(data);
        AppModules.authenInfo= {userInfo:{authen:{email:$scope.login.email,password:$scope.login.password}}};
        if(data.length>0){
            for(var i=0;i<data.length;i++){
                DatabaseService.deleteNote(data[i]);
                if(i==data.length-1){
                    firebaseServ.signIn($scope.login.email,$scope.login.password).then(function(data){
                        firebaseServ.pullFirebase(callbackPullData);
                    }).catch(function(e){
                            $ionicPopup.confirm({
                                title: 'คำเตือน',
                                template: '<center>อีเมล์หรือรหัสผ่านไม่ถูกต้อง<center>',
                                buttons: [
                                    {
                                        text: '<b>ตกลง</b>',
                                        type: 'button-positive',
                                    }
                                ]
                            });
                    }) 
                    
                }
            }
        }else{
            callbackPullData(null);
        }
            
    }
       function callbackPullData(data){
       
            DatabaseService.initDB();
            var checkListWord = false;
            DatabaseService.addNote({userInfo:AppModules.authenInfo.userInfo}).then(function(){
                    if(data!=null){   
                        for(var i=0;i<data.length;i++){
                            if(data[i].hasOwnProperty('noteList')){  
                                console.log("++++++add NotList+++++");
                                DatabaseService.addNote({noteList:data[i].noteList});
                            }
                            else if(data[i].hasOwnProperty('setting')){
                                console.log("++++++add setting+++++");
                                DatabaseService.addNote({setting:data[i].setting});
                            }
                            else if(data[i].hasOwnProperty('listWord')){
                                checkListWord = true;
                                DatabaseService.addNote({listWord:data[i].setting});
                            }
                            if(i==data.length-1){
                                if(checkListWord==false){
                                    DatabaseService.addNote({listWord:{}}).then(function(){
                                        $state.go("app.home");
                               
                                    });
                                }else{
                                    $state.go("app.home");
                                }
                                
                            }
                        }
                    }else{
                         DatabaseService.addNote({listWord:{}}).then(function(){
                            $state.go("app.home");                         
                        });
                    }


                       
            })
    }
    $scope.goToHomeNonRegis = function(){
        $dataServ.getData(callbackAuthenNonRegis);
    }
    function callbackAuthenNonRegis(data){
        console.log(data);
        DatabaseService.initDB();
        if(data.length>0){
            for(var i =0;i<data.length;i++){
                if(data[i].hasOwnProperty('userInfo')){
                    console.log("+++++++++++++existAuthen++++++++++++++++") 
                }
                if(i==data.length-1&&(!data[i].hasOwnProperty('userInfo'))){
                    DatabaseService.addNote({
                        userInfo:{
                            authen:{email:"hallo@hotmail.com",password:1234}
                        }
                    })
                }
                if(i==data.length-1){
                    $state.go("app.home");
                }
            }
        }else{
            DatabaseService.addNote({
                userInfo:{
                     authen:{email:"hallo@hotmail.com",password:1234}
                }
            }).then(function(){
                 DatabaseService.addNote({listWord:{}}).then(function(){
                    $state.go("app.home");                         
                });
            })
        }
    
        
    }
    $scope.goToRegis = function(){
        console.log("register");
         $state.go("register");
    }

    $scope.goToResetPassword =function(){
        $state.go("reset")
    }


   

  
  
    
 

});