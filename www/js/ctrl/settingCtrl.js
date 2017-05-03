angular.module('moduleControlles')
.controller("settingCtrl", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,$ionicTabsDelegate,AppModules,$loadingServ,$operandServ,$ionicSideMenuDelegate,$ionicSlideBoxDelegate,DatabaseService,$rootScope,$ionicPopup,firebaseServ,$dataServ,$timeout,$internetServ) {
    $scope.note = [];
    $scope.note.time ={}
    $ionicPlatform.ready(function() {
        DatabaseService.initDB();
    })
    $scope.statusDefaultSetting = false;
    var indexSetting = null;
    $operandServ.setOperand("ion-android-menu","เรียบร้อย",true);
    
    $scope.note.viewToday = {icon:"ion-android-arrow-dropup-circle",status:false};
    $scope.note.viewSome = {icon:"ion-android-arrow-dropup-circle",status:false};
    $scope.note.viewTimeNoti = {icon:"ion-android-arrow-dropup-circle",status:false};

    $scope.note.analysis = {color:"color-darkblue",status:true,icon:"ion-eye"};
    $scope.$on("back", function(data){
            $ionicSideMenuDelegate.toggleLeft();
    });
    $dataServ.getData(callbackSetting)

    function callbackSetting(data){
        $scope.listNote = JSON.parse(JSON.stringify(data));
        showDisPlay();
    }
    showDisPlay = function(){
         for(var i =0;i<$scope.listNote.length;i++){
             console.log($scope.listNote[i]);
            if($scope.listNote[i].hasOwnProperty('setting')){
               $scope.statusDefaultSetting = true;
               indexSetting = i;
               
            }
            else if($scope.listNote[i].hasOwnProperty('userInfo')){
                AppModules.authenInfo = $scope.listNote[i];
            }

         }
        if($scope.statusDefaultSetting==false){
            console.log("<--------------regis Setting-------------->")
            $scope.morningTime = moment({ y  :0, M  :0, d :0, h :6, m :0, s :0, ms :0});
            $scope.noonTime = moment({ y  :0, M  :0, d :0, h :12, m :0, s :0, ms :0});
            $scope.eveningTime = moment({ y  :0, M  :0, d :0, h :18, m :0, s :0, ms :0});
            $scope.nightTime = moment({ y  :0, M  :0, d :0, h :24, m :0, s :0, ms :0});

            $scope.someTime = moment({ y  :0, M  :0, d :0, h :7, m :0, s :0, ms :0});

            $scope.notiTime =  moment({ y  :0, M  :0, d :0, h :0, m :0, s :0, ms :0});
  

            $scope.morningTimeString = $scope.morningTime.format("HH:mm");
            $scope.noonTimeString = $scope.noonTime.format("HH:mm");
            $scope.eveningTimeString = $scope.eveningTime.format("HH:mm");
            $scope.nightTimeString = $scope.nightTime.format("HH:mm");
            $scope.someTimeString = $scope.someTime.format("HH:mm");
            $scope.notiTimeString = $scope.notiTime.format("HH:mm");
            
            $scope.note.time.morning = $scope.morningTime._d;
            $scope.note.time.noon = $scope.noonTime._d;
            $scope.note.time.evening = $scope.eveningTime._d;
            $scope.note.time.night = $scope.nightTime._d;
            $scope.note.time.some = $scope.someTime._d;
            $scope.note.time.noti = $scope.notiTime._d;

            $scope.note.analysis = {color:"color-darkblue",status:true,icon:"ion-eye",text:"เปิด ระบบวิเคราห์สำหรับทุกการสร้างบันทึกใหม่"};
            $scope.note.saveToCloud = {status:false,text:"ไม่ระบุ"};
        }else{
            console.log("<--------------exist Setting-------------->")
            if(indexSetting!=null){
                $scope.morningTime = moment($scope.listNote[indexSetting].setting.time.morning);
                $scope.noonTime = moment($scope.listNote[indexSetting].setting.time.afternoon);
                $scope.eveningTime = moment($scope.listNote[indexSetting].setting.time.evening);
                $scope.nightTime = moment($scope.listNote[indexSetting].setting.time.night);
                $scope.someTime = moment($scope.listNote[indexSetting].setting.time.other);
                $scope.notiTime = moment($scope.listNote[indexSetting].setting.time.noti);

                $scope.morningTimeString = $scope.morningTime.format("HH:mm");
                $scope.noonTimeString = $scope.noonTime.format("HH:mm");
                $scope.eveningTimeString = $scope.eveningTime.format("HH:mm");
                $scope.nightTimeString = $scope.nightTime.format("HH:mm");
                $scope.someTimeString = $scope.someTime.format("HH:mm");
                $scope.notiTimeString = $scope.notiTime.format("HH:mm");

                $scope.note.time.morning = $scope.morningTime._d;
                $scope.note.time.noon = $scope.noonTime._d;
                $scope.note.time.evening = $scope.eveningTime._d;
                $scope.note.time.night = $scope.nightTime._d;
                $scope.note.time.some = $scope.someTime._d;
                $scope.note.time.noti = $scope.notiTime._d;

                $scope.note.analysis = {
                    color:$scope.listNote[indexSetting].setting.system.analysis.color,
                    status:$scope.listNote[indexSetting].setting.system.analysis.status,
                    icon:$scope.listNote[indexSetting].setting.system.analysis.icon,
                    text:$scope.listNote[indexSetting].setting.system.analysis.text
                };
                $scope.note.saveToCloud = {status:false,text:$scope.listNote[indexSetting].setting.cloud.text};
            }
        }
    }
    $scope.saveToCloud =function(){
        $internetServ.status(callbackStatusInternetForCloud);
    }
    function callbackStatusInternetForCloud(status){
         if(status=="online"){
                firebaseServ.syncFirebase($scope.listNote,AppModules.authenInfo.userInfo.authen.email,AppModules.authenInfo.userInfo.authen.password,callbackCloud);
            }else{
                $ionicPopup.confirm({
                    title: 'คำเตือน',
                    template: 'ไม่ได้สามารถสำรองข้อมูลได้',
                    buttons: [
                        {
                            text: '<b>ตกลง</b>',
                            type: 'button-positive',
                        }
                    ]
                })
            }
    }
    function callbackCloud(){
        $scope.note.saveToCloud.status = true;
        $scope.note.saveToCloud.text = "ล่าสุด "+moment().locale('th').format('Do MMMM YYYY, HH:mm:ss');
          $timeout(function () {
                $scope.$apply();
            }, 10);
    }
     
    $scope.delAll =function(){
         confirmPopup = $ionicPopup.confirm({
            title: 'คำเตือน',
            template: '<center>ระบบจะทำการลบข้อมูลทั้งหมด<br><br>คุณแน่ใจที่จะดำเนินการ?</center>'
        });
        confirmPopup.then(function(res) {
            if(res) {
                DatabaseService.deleteAllNote().then(function(){        
                    $state.go("login"); 
                });
            } else {
                console.log('Deletion canceled !');
            }
        });
      
    }

    $scope.openAnalysis = function(){
        if($scope.note.analysis.status == true){
            $scope.note.analysis.status = false;
            $scope.note.analysis.color =  "color-grey";
            $scope.note.analysis.icon = "ion-eye-disabled";
            $scope.note.analysis.text = "ปิด ระบบวิเคราห์สำหรับทุกการสร้างบันทึกใหม่";
        }else{
            $scope.note.analysis.status = true;
            $scope.note.analysis.color =  "color-darkblue";
            $scope.note.analysis.icon = "ion-eye";
            $scope.note.analysis.text = "เปิด ระบบวิเคราห์สำหรับทุกการสร้างบันทึกใหม่";

        }

    }
    $scope.setDirectiveFn = function(data,type){
        console.log(type);
        console.log(data);
        if(type=="morning"){
            $scope.morningTime.set({'hour':data.getHours(),'minute':data.getMinutes(),'second':0});
            $scope.morningTimeString = $scope.morningTime.format("HH:mm");
        }
        else if(type=="noon"){
            $scope.noonTime.set({'hour':data.getHours(),'minute':data.getMinutes(),'second':0});
            $scope.noonTimeString = $scope.noonTime.format("HH:mm");
        }
        else if(type=="evening"){
            $scope.eveningTime.set({'hour':data.getHours(),'minute':data.getMinutes(),'second':0});
            $scope.eveningTimeString = $scope.eveningTime.format("HH:mm");
        }
        else if(type=="night"){
            $scope.nightTime.set({'hour':data.getHours(),'minute':data.getMinutes(),'second':0});
            $scope.nightTimeString = $scope.nightTime.format("HH:mm");
        }
        else if(type=="some"){
            $scope.someTime.set({'hour':data.getHours(),'minute':data.getMinutes(),'second':0});
            $scope.someTimeString = $scope.someTime.format("HH:mm");
        }
        else if(type=="noti"){
            $scope.notiTime.set({'hour':data.getHours(),'minute':data.getMinutes(),'second':0});
            $scope.notiTimeString = $scope.notiTime.format("HH:mm");
        }
        

    }
     $scope.$on("forward", function(data){
         AppModules.statusEditNote = 0;
        if($scope.statusDefaultSetting==false){
           
                DatabaseService.addNote({
                    setting:{
                        time:{
                            morning:$scope.morningTime.format(),
                            afternoon:$scope.noonTime.format(),
                            evening:$scope.eveningTime.format(),
                            night:$scope.nightTime.format(),
                            other:$scope.someTime.format(),
                            noti:$scope.notiTime.format()
                        },
                        system:{
                            analysis:{
                                color:$scope.note.analysis.color,
                                status:$scope.note.analysis.status,
                                icon:$scope.note.analysis.icon,
                                text:$scope.note.analysis.text
                            }
                        },
                        cloud:{
                            status:false,
                            text:$scope.note.saveToCloud.text
                        }
                    }
                }).then(function(){

                    saveToFirebase();

                })
          
        }else{
          $scope.listNote[indexSetting].setting ={
                        time:{
                            morning:$scope.morningTime.format(),
                            afternoon:$scope.noonTime.format(),
                            evening:$scope.eveningTime.format(),
                            night:$scope.nightTime.format(),
                            other:$scope.someTime.format(),
                            noti:$scope.notiTime.format()
                        },
                        system:{
                            analysis:{
                                color:$scope.note.analysis.color,
                                status:$scope.note.analysis.status,
                                icon:$scope.note.analysis.icon,
                                text:$scope.note.analysis.text
                            }
                        },
                        cloud:{
                            status:false,
                            text:$scope.note.saveToCloud.text
                        }
                    }
            
            console.log($scope.listNote[indexSetting]);
            
             $ionicPlatform.ready(function() {
                DatabaseService.updateNote($scope.listNote[indexSetting]).then(function(){
                    $internetServ.status(callbackStatusInternet);
                });

             })
             
        }
        function callbackStatusInternet(status){
            if(status=="online"){
                saveToFirebase();
            }else{
                $ionicPopup.confirm({
                    title: 'สถานะ',
                    template: 'เรียบร้อย',
                    buttons: [
                        {
                            text: '<b>ตกลง</b>',
                            type: 'button-positive',
                        }
                    ]
                })
            }
        }
       function saveToFirebase(){
            firebaseServ.syncFirebase($scope.listNote,AppModules.authenInfo.userInfo.authen.email,AppModules.authenInfo.userInfo.authen.password,callbackSyn);
            $ionicPopup.confirm({
                    title: 'สถานะ',
                    template: '<center>เรียบร้อย</center>',
                    buttons: [
                        {
                            text: '<b>ตกลง</b>',
                            type: 'button-positive',
                        }
                    ]
            });
       }
       function callbackSyn(){}

     })
       $scope.viewStatusNoteToday = function(){
           console.log("tes");
        if($scope.note.viewToday.status==false){
            $scope.note.viewToday.icon =  "ion-android-arrow-dropdown-circle";
            $scope.note.viewToday.status = true;
        }else{
            $scope.note.viewToday.icon =  "ion-android-arrow-dropup-circle";
            $scope.note.viewToday.status = false;
        }
        
    }
    $scope.viewStatusNoteSome =function(){
        if($scope.note.viewSome.status==false){
            $scope.note.viewSome.icon =  "ion-android-arrow-dropdown-circle";
            $scope.note.viewSome.status = true;
        }else{
            $scope.note.viewSome.icon =  "ion-android-arrow-dropup-circle";
            $scope.note.viewSome.status = false;
        }
    }
    $scope.viewStatusNoteTimeNoti = function(){
        if($scope.note.viewTimeNoti.status==false){
            $scope.note.viewTimeNoti.icon =  "ion-android-arrow-dropdown-circle";
            $scope.note.viewTimeNoti.status = true;
        }else{
            $scope.note.viewTimeNoti.icon =  "ion-android-arrow-dropup-circle";
            $scope.note.viewTimeNoti.status = false;
        }

    }
    

});