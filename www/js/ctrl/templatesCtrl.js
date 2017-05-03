angular.module('moduleControlles')
.controller("templatesCtrl", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,$ionicTabsDelegate,$ionicHistory,AppModules,$operandServ,$rootScope,$cordovaLocalNotification,$ionicSideMenuDelegate,DatabaseService,$timeout) {
    
    
    



document.addEventListener('deviceready', onDeviceReady, false)


 function onDeviceReady () {
     cordova.plugins.backgroundMode.setDefaults({silent: true});
    cordova.plugins.backgroundMode.enable();
    cordova.plugins.backgroundMode.on('activate', function() {
            cordova.plugins.backgroundMode.disableWebViewOptimizations();
            window.plugins.OnDestroyPlugin.setEventListener (function(){
                cordova.plugins.notification.local.cancel(10000, function() {
             
                });
         
            })
                    /*this.setGeolocation();*/
    });
 }
    
    console.log(AppModules.path);

    $rootScope.toggledrag = false;
   
    $scope.goToForward = function(){
        $scope.$broadcast('forward',{});    
    }
    $scope.goToBack = function(){
        $scope.$broadcast('back',{});
    }
    $scope.goTOLogout = function(){
        console.log(AppModules.authenInfo);
/*
        DatabaseService.initDB();
        DatabaseService.deleteNote(AppModules.authenInfo,callbackDelete)*/
        $state.go("login"); 
    }
    function callbackDelete(data){
        console.log(data);
        $state.go("login");
    }
    $rootScope.$watchCollection( 
        function () {
            return $operandServ.getOperand();
        },
        function ( newValue, oldValue ) { 
            $scope.operationWord = newValue.word;
            $scope.operationIcon = newValue.icon;
            $scope.header = newValue.header;
        
         
            console.log(newValue);
        },true
    );
    $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };


/*
  $rootScope.$watchCollection( 
        function () {
            return AppModules.notiPlace;
        },
        function ( newValue, oldValue ) {
            
            AppModules.notiPlace = newValue; 
            if(AppModules.notiPlace.length>0){
                $scope.startNotiPlace();
            }      
            console.log(newValue); 
        },true
  )*/

  $scope.syn = function(){
      alert("test");
  }
  $scope.goTODateHome =function(){
    $state.go("app.home");
  }
  $scope.goTOPlaceHome =function(){
      console.log("test");
    $state.go("app.placeHome");
  }
    $scope.goTOMyAccount =function(){
    $state.go("app.myAccount");
  }
  $scope.goTOSetting = function(){
      $state.go("app.setting");
  }

  /*
  $scope.stopNotiPlace = function(){
    document.addEventListener('deviceready', onDeviceReady, false);
    function onDeviceReady () {
        backgroundGeolocation.stop();

    }

  }*/
    


               /*
            for(var i = 0 ;i<AppModules.notiPlace;i++){
                var diffDistance =  distance(location.latitude,location.longitude,AppModules.notiPlace[i].lat,AppModules.notiPlace[i].lng,'K')*1000;
                if(diffDistance<500){
                    ionic.Platform.ready(function(){
                        $cordovaLocalNotification.schedule([{
                                id: 1,
                                title: 'noti',
                                text: 'Give a real message',
                        }]).then(function (result) {
                            console.log('Every Minute Notification Set');
                        });
                    })
                }
            }*/




})

   