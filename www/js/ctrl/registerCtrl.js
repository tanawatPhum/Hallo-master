angular.module('moduleControlles')
.controller("registerCtrl", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,$ionicTabsDelegate,DatabaseService,$rootScope,firebaseServ,AppModules,$ionicPopup,$internetServ,$loadingServ,$dataServ) {
    $scope.regis = [];
    $scope.signUp = function(){
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
                    if(email=="hallo"&&password==1234){
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
        if(data.length>0){
            for(var i=0;i<data.length;i++){
                DatabaseService.deleteNote(data[i]);
                if(i==data.length-1){
                    goToRegis();
                }
            }
        }else{
            goToRegis();
        }
        
    }
    function goToRegis(){
               firebaseServ.signUp($scope.regis.email,$scope.regis.password).then(function(){
                AppModules.authenInfo= {userInfo:{authen:{email:$scope.regis.email,password:$scope.regis.password}}};
                    firebaseServ.signIn($scope.regis.email,$scope.regis.password).then(function(data){
                        DatabaseService.addNote({userInfo:AppModules.authenInfo.userInfo}).then(function(){
                            DatabaseService.addNote({listWord:{}}).then(function(){
                            $ionicPopup.confirm({
                                title: 'แจ้งเตือน',
                                template: '<center>ลงทะเบียนสำเร็จ<center>',
                                buttons: [
                                    {
                                        text: '<b>ตกลง</b>',
                                        type: 'button-positive',
                                    }
                                ]
                            });
                            $state.go("app.home");
                            })
                        })
                    }).catch(function(e){
                        $ionicPopup.confirm({
                            title: 'คำเตือน',
                            template: '<center>ไม่สามารถลงทะเบียนได้<center>',
                            buttons: [
                                {
                                    text: '<b>ตกลง</b>',
                                    type: 'button-positive',
                                }
                            ]
                        });
                    }) 
                    
                
            
        }).catch(function(data){
            $loadingServ.closeLoading();
                $ionicPopup.confirm({
                    title: 'คำเตือน',
                    template: '<center>ไม่สามารถลงทะเบียนได้<center>',
                    buttons: [
                        {
                            text: '<b>ตกลง</b>',
                            type: 'button-positive',
                        }
                    ]
            });
        });
    }



    
 

});