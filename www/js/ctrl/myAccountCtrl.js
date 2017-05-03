angular.module('moduleControlles')
.controller("myAccountCtrl", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,$ionicTabsDelegate,$operandServ,$ionicSideMenuDelegate,DatabaseService,$rootScope,AppModules,$dataServ) {
    
    $scope.note = [];
    $scope.listNote =[];
    $scope.note.numberNotiTime =0;
    $scope.note.numberAllTime = 0;
    $scope.note.numberSuccessTime = 0;

    $scope.note.numberNotiPlace =0;
    $scope.note.numberAllPlace = 0;
    $scope.note.numberSuccessPlace = 0;

    $scope.note.number =0;
    $scope.note.viewDate = {icon:"ion-android-arrow-dropup-circle",status:false};
    $scope.note.viewPlace = {icon:"ion-android-arrow-dropup-circle",status:false};

    var currentDate = new Date();


    $dataServ.getData(callbackDataNote);
    function callbackDataNote(data){
        $scope.listNote =[];   
        $scope.listNote = JSON.parse(JSON.stringify(data));
        showDisPlay();
    }
   
    

 

    

    $operandServ.setOperand("ion-android-menu","",true);
    $scope.$on("back", function(data){
            $ionicSideMenuDelegate.toggleLeft();
    });
    
    showDisPlay =function(){


         for(var i =0;i<$scope.listNote.length;i++){
            if($scope.listNote[i].hasOwnProperty('userInfo')){
                AppModules.authenInfo = $scope.listNote[i];
               $scope.listNote.splice(i,1);
               break;
            }
        }
        console.log(AppModules.authenInfo);
        var checkExist = false;
        for(var i =0;i<$scope.listNote.length;i++){
            if($scope.listNote[i].hasOwnProperty('setting')){
                checkExist = true;
                AppModules.setting = {setting:$scope.listNote[i].setting};
                $scope.listNote.splice(i,1);
                break;
            }
        }
          for(var i =0;i<$scope.listNote.length;i++){
            if($scope.listNote[i].hasOwnProperty('listWord')){
                AppModules.dictionary = $scope.listNote[i];
                $scope.listNote.splice(i,1);
                break;
            }
        }
        $scope.note.number  = 0

        for(var i =0;i<$scope.listNote.length;i++){
                if($scope.listNote[i].hasOwnProperty('noteList')&&$scope.listNote[i].noteList.statusDelete!=true){
                    $scope.note.number++
                    if($scope.listNote[i].noteList.content.analysis.status==true){
                    console.log($scope.listNote[i].noteList);
                for(var j=0;j<$scope.listNote[i].noteList.resultsTimeAndPlace.length;j++){
                    for(var k=0;k<$scope.listNote[i].noteList.resultsTimeAndPlace[j].output.length;k++){
                        $scope.listNote[i].noteList.resultsTimeAndPlace[j].output[k] = moment($scope.listNote[i].noteList.resultsTimeAndPlace[j].output[k]);
                        console.log($scope.listNote[i].noteList.resultsTimeAndPlace[j]);
                        if($scope.listNote[i].noteList.resultsTimeAndPlace[j].openDate.statusDelete==false){
                            console.log($scope.listNote[i].noteList.resultsTimeAndPlace[j].notiTime[k]);
                            if($scope.listNote[i].noteList.resultsTimeAndPlace[j].notiTime[k]==false){
                                $scope.note.numberNotiTime = $scope.note.numberNotiTime+1;
                            }else{
                                $scope.note.numberSuccessTime = $scope.note.numberSuccessTime+1;
                            }
                            $scope.note.numberAllTime = $scope.note.numberAllTime+1;
                        }
                    }
                   if($scope.listNote[i].noteList.resultsTimeAndPlace[j].hasOwnProperty('place')){ 
                        for(var k=0;k<$scope.listNote[i].noteList.resultsTimeAndPlace[j].place.length;k++){
                            if($scope.listNote[i].noteList.resultsTimeAndPlace[j].openPlace[k].statusDelete==false){
                                console.log($scope.listNote[i].noteList.resultsTimeAndPlace[j].place[k].statusNoti);
                                if($scope.listNote[i].noteList.resultsTimeAndPlace[j].notiPlace[k]==false){
                                    $scope.note.numberNotiPlace  =$scope.note.numberNotiPlace+1;
                                }else{
                                    $scope.note.numberSuccessPlace = $scope.note.numberSuccessPlace+1;
                                }
                                $scope.note.numberAllPlace = $scope.note.numberAllPlace+1;
                                    
                            }

                        }
                   }
             

                }
            }
        }
        
    }
        console.log(AppModules.authenInfo);
        if(AppModules.authenInfo!=null){
            $scope.note.authenInfo = AppModules.authenInfo.userInfo.authen.email;
            $scope.note.password = AppModules.authenInfo.userInfo.authen.password;
        }else{
            $scope.note.authenInfo = "ไม่ระบุ";
            $scope.note.password = "ไม่ระบุ";
        }
    
    }




    $scope.viewStatusNoteDate = function(){
        if($scope.note.viewDate.status==false){
            $scope.note.viewDate.icon =  "ion-android-arrow-dropdown-circle";
            $scope.note.viewDate.status = true;
        }else{
            $scope.note.viewDate.icon =  "ion-android-arrow-dropup-circle";
            $scope.note.viewDate.status = false;
        }
        
    }
    $scope.viewStatusNotePlace = function(){
        if($scope.note.viewPlace.status==false){
            $scope.note.viewPlace.icon =  "ion-android-arrow-dropdown-circle";
            $scope.note.viewPlace.status = true;
        }else{
            $scope.note.viewPlace.icon =  "ion-android-arrow-dropup-circle";
            $scope.note.viewPlace.status = false;
        }

    }




});