angular.module('moduleControlles')
.controller("homeCtrl", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,$ionicTabsDelegate,AppModules,$loadingServ,$operandServ,$ionicSideMenuDelegate,$ionicSlideBoxDelegate,DatabaseService,firebaseServ,$gpsServ,$cordovaLocalNotification,$rootScope,$timeout,$cordovaGeolocation,$interval,$notificationServ,$dataServ,$window,$ionicPopup,$location,$loadingServ) {
    $ionicPlatform.ready(function() {
        DatabaseService.initDB();
    })

    if(AppModules.statusEditNote==0){
           document.addEventListener('deviceready', onDeviceReady, false);
            function onDeviceReady () {
                console.log(AppModules.statusEditNote);
                    cordova.plugins.notification.local.schedule({
                            id: 10000,
                            title: "ระบบติดตาม",
                            text: "กำลังติดตามคุณอยู่",
                            icon: "res://androidlocate.png",
                            autoClear:false,
                            ongoing:true,
                            sound:null,
                            vibration: false,
                                    
                    });               
            }
    }
 

    

     



    console.log("welcome to homeCtrl");
    var currentDate = new Date();
    currentDate = new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate(),0,0,0,0).valueOf();
    $scope.activeToday = {statusString:"active",statusBool:true,sortByDate:true,sortByPlace:false,colorDate:"color-violet",colorPlace:"color-grey"};
    $scope.activeAll = {statusString:"",statusBool:false,sortByDate:true,sortByPlace:false,colorDate:"color-violet",colorPlace:"color-grey"};
    $operandServ.setOperand("ion-android-menu","ion-android-create",false);
    console.log(AppModules.listNote);

    AppModules.noteIndex = null;
   AppModules.note =null;


    $dataServ.getData(callbackDataNote);
    var momentDates = [];
    
    
     function callbackDataNote(data){
        
        $scope.tempListNote = [];
        $scope.showAllNote =[];
        $scope.showAllPlace = [];
        $scope.showTodayNote = [];
        $scope.showPlaceToday = [];
        $scope.tempListDate =[];

        $scope.listNote = [];
        $scope.notiTime = [];
        $scope.listIndexOfnotiTime = [];
        $scope.showTodayNote = [];
        $scope.listTimeTodayNote = [];

        AppModules.listNote = [];
        AppModules.notiPlace = [];
        AppModules.tempNote = [];
        momentDates = [];

        $scope.placeString = '';

        $scope.statusDelete = false;

        $scope.listNote = JSON.parse(JSON.stringify(data));
        console.log($scope.listNote);
        
        processSetDefault();
        
     }
     $scope.delete=function(){
         DatabaseService.deleteAllNote();
     }
     sortByDateAsc = function (lhs, rhs)  { return lhs > rhs ? 1 : lhs < rhs ? -1 : 0; }

    function processSetDefault(){
        
        console.log($scope.listNote);
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
                console.log("++++++listWord++++++");
                console.log(AppModules.dictionary);
                $scope.listNote.splice(i,1);
                break;
            }
        }

        
        if(checkExist==false){
            $scope.note = [];
            $scope.note.time ={}
            $scope.note.viewToday = {icon:"ion-android-arrow-dropup-circle",status:false};
            $scope.note.viewSome = {icon:"ion-android-arrow-dropup-circle",status:false};
            $scope.note.viewTimeNoti = {icon:"ion-android-arrow-dropup-circle",status:false};
            $scope.note.analysis = {color:"color-darkblue",status:true,icon:"ion-eye",text:"เปิด ระบบวิเคราห์สำหรับทุกการสร้างบันทึกใหม่"};
            $scope.note.saveToCloud = {status:false,text:"ไม่ระบุ"};
            $scope.morningTime = moment({ y  :0, M  :0, d :0, h :6, m :0, s :0, ms :0});
            $scope.noonTime = moment({ y  :0, M  :0, d :0, h :12, m :0, s :0, ms :0});
            $scope.eveningTime = moment({ y  :0, M  :0, d :0, h :18, m :0, s :0, ms :0});
            $scope.nightTime = moment({ y  :0, M  :0, d :0, h :24, m :0, s :0, ms :0});
            $scope.someTime = moment({ y  :0, M  :0, d :0, h :7, m :0, s :0, ms :0});
            $scope.notiTimes =  moment({ y  :0, M  :0, d :0, h :0, m :0, s :0, ms :0});

            $scope.morningTimeString = $scope.morningTime.format("HH:mm");
            $scope.noonTimeString = $scope.noonTime.format("HH:mm");
            $scope.eveningTimeString = $scope.eveningTime.format("HH:mm");
            $scope.nightTimeString = $scope.nightTime.format("HH:mm");
            $scope.someTimeString = $scope.someTime.format("HH:mm");
            $scope.notiTimeString = $scope.notiTimes.format("HH:mm");
            AppModules.setting = {
                    setting:{
                        time:{
                            morning:$scope.morningTime.format(),
                            afternoon:$scope.noonTime.format(),
                            evening:$scope.eveningTime.format(),
                            night:$scope.noonTime.format(),
                            other:$scope.someTime.format(),
                            noti:$scope.notiTimes.format()
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
                }

        }
        console.log(AppModules.setting);
       if(AppModules.statusEditNote==0){
            document.addEventListener('deviceready', function () {
                cordova.plugins.notification.local.cancelAll(function() {
                            console.log("done");
                }, this);
            })
            /*$notificationServ.setNotiStatus($scope.listNote,processSetNoti);*/

        }
        processSetNoti();
        
     
    }
        function processSetNoti(){
            console.log("++++++++++++++++++++processNoti++++++++++++++++++++++++++++");
                for(var i =0;i<$scope.listNote.length;i++){
                if($scope.listNote[i].hasOwnProperty('noteList')&&$scope.listNote[i].noteList.statusDelete!=true){
                    if($scope.listNote[i].noteList.sequence>AppModules.lastSequence){
                        AppModules.lastSequence = $scope.listNote[i].noteList.sequence;
                        console.log("lastSequence--->"+AppModules.lastSequence);
                    }
                    console.log("lastSequence--->"+AppModules.lastSequence);
                    for(var j=0;j<$scope.listNote[i].noteList.resultsTimeAndPlace.length;j++){
                        if($scope.listNote[i].noteList.resultsTimeAndPlace[j].output.length>0){
                            $scope.date = JSON.parse(JSON.stringify($scope.listNote[i].noteList.resultsTimeAndPlace[j].output[0]));            
                            $scope.date = moment($scope.date).set({hour:0,minute:0,second:0,millisecond:0});
                        }else{
                            $scope.date = moment().set({hour:0,minute:0,second:0,millisecond:0});
                        }
                        if($scope.listNote[i].noteList.resultsTimeAndPlace[j].output.length>0){
                        for(var k=0;k<$scope.listNote[i].noteList.resultsTimeAndPlace[j].output.length;k++){
                                console.log($scope.listNote[i].noteList.resultsTimeAndPlace[j]);
                                $scope.listNote[i].noteList.resultsTimeAndPlace[j].output[k] = moment($scope.listNote[i].noteList.resultsTimeAndPlace[j].output[k]);                   
                                
                                if($scope.listNote[i].noteList.content.analysis.status==true){
                                $scope.timeNoti = JSON.parse(JSON.stringify($scope.listNote[i].noteList.resultsTimeAndPlace[j].output[k]));
                                
                                
                                $scope.timeBeforeNoti = moment($scope.listNote[i].noteList.resultsTimeAndPlace[j].beforeTime[k]);
                                
                                $scope.timeNoti = moment($scope.timeNoti).set({second:0,millisecond:0}).subtract($scope.timeBeforeNoti.hour(),"hours");
                                $scope.timeNoti = moment($scope.timeNoti).set({second:0,millisecond:0}).subtract($scope.timeBeforeNoti.minute(),"minute");
                            /* $scope.timeNoti = moment($scope.timeNoti).set({second:0,millisecond:0});*/
                                
                                console.log($scope.currentDate);
                                console.log($scope.timeNoti);
                                console.log($scope.listNote[i].noteList.resultsTimeAndPlace[j]);
                                }
                                $scope.currentDate = moment().set({second:0,millisecond:0})
                                console.log(AppModules.statusEditNote);

                                if($scope.listNote[i].noteList.content.analysis.status==true&&$scope.timeNoti.valueOf()>=$scope.currentDate.valueOf()&&$scope.listNote[i].noteList.resultsTimeAndPlace[j].notiTime[k]==false
                                &&AppModules.statusEditNote<2&&$scope.listNote[i].noteList.resultsTimeAndPlace[j].openTime[k].status==true&&$scope.listNote[i].noteList.resultsTimeAndPlace[j].openDate.statusDelete==false){
                                    
                                    console.log("++++++++++++pass To Noti+++++++++");   
                                    $scope.listNote[i].noteList.resultsTimeAndPlace[j].notiTime[k] = true;                                       
                                    var generator = new IDGenerator();
                                    var id = parseInt($scope.listNote[i].noteList.sequence.toString()+generator.generate().toString())
                                    $scope.notiTime.push({
                                        id:id,
                                        title: $scope.listNote[i].noteList.content.title,
                                        text: $scope.listNote[i].noteList.resultsTimeAndPlace[j].formatTime[k],
                                        at: $scope.timeNoti.valueOf(),
                                        vibration: true
                                    });
                                    console.log($scope.notiTime);
                                    $scope.listIndexOfnotiTime.push(i);
                                }
                                var moDate = JSON.parse(JSON.stringify($scope.listNote[i].noteList.resultsTimeAndPlace[j].output[k]))
                                moDate = moment(moDate);
                                momentDates.push(moDate);
                        }
                        }else{
                            momentDates.push(moment());
                        }
                        if($scope.listNote[i].noteList.resultsTimeAndPlace[j].hasOwnProperty('place')){
                            for(var k=0;k<$scope.listNote[i].noteList.resultsTimeAndPlace[j].place.length;k++){
                                if($scope.date==currentDate){
                                    if(k!=$scope.listNote[i].noteList.resultsTimeAndPlace[j].place.length-1&&$scope.listNote[i].noteList.resultsTimeAndPlace[j].place.length>1&&$scope.listNote[i].noteList.resultsTimeAndPlace[j].openPlace[k].status==true){
                                        $scope.placeString = $scope.placeString+$scope.listNote[i].noteList.resultsTimeAndPlace[j].place[k].keyWord+",";
                                    }else{
                                        if($scope.listNote[i].noteList.resultsTimeAndPlace[j].openPlace[k].status==true){
                                            $scope.placeString = $scope.placeString+$scope.listNote[i].noteList.resultsTimeAndPlace[j].place[k].keyWord;
                                        }
                                    }
                                }
                                    AppModules.notiPlace.push({
                                        index:{i:i,j:j,k:k},
                                        title:$scope.listNote[i].noteList.content.title,
                                        content:$scope.listNote[i].noteList.resultsTimeAndPlace[j].place[k],
                                        date:$scope.listNote[i].noteList.resultsTimeAndPlace[j].output[0],
                                        sequence:$scope.listNote[i].noteList.sequence,               
                                        sequencePlace :$scope.listNote[i].noteList.sequence + $scope.listNote[i].noteList.resultsTimeAndPlace[j].place[k].sequencePlace,
                                        keyWord:$scope.listNote[i].noteList.resultsTimeAndPlace[j].place[k].keyWord,
                                        lat:$scope.listNote[i].noteList.resultsTimeAndPlace[j].place[k].results.geometry.location.lat,
                                        lng:$scope.listNote[i].noteList.resultsTimeAndPlace[j].place[k].results.geometry.location.lng,
                                        statusPlace:$scope.listNote[i].noteList.resultsTimeAndPlace[j].openPlace[k].statusDelete,
                                        statusNoti:$scope.listNote[i].noteList.resultsTimeAndPlace[j].notiPlace[k],
                                        openPlace:$scope.listNote[i].noteList.resultsTimeAndPlace[j].openPlace[k].status,
                                        diffCurrentDistance:null
                                    })
                            }
                        }
    
                        if($scope.date==currentDate){
                            $scope.showTodayNote.push({
                                sequence:$scope.listNote[i].noteList.sequence,
                                content:$scope.listNote[i].noteList.content,
                                resultsTimeAndPlace:$scope.listNote[i].noteList.resultsTimeAndPlace[j],
                                firstTime : $scope.listNote[i].noteList.resultsTimeAndPlace[j].output[0],
                                placeString:$scope.placeString
                            });
                        }
                        $scope.placeString='';
                        
                    }
                }
                
                    if(i==$scope.listNote.length-1){
                        AppModules.listNote = $scope.listNote;
                        console.log($scope.listNote)
                        if($scope.notiTime.length>0&&AppModules.statusEditNote==0){
                            console.log("+++++++++++++++setTimeNoti+++++++++++++");
                            $notificationServ.setNotiTime($scope.notiTime,$scope.listIndexOfnotiTime,$scope.listNote,callbackPushNoti);
                        }else{
                            processDisplay();
                        }                
                    }
                
                
            }
            
        }
        function callbackPushNoti(){
            console.log("cccccccccccccccccccctestcccccccccccccccccccccc");
            if(AppModules.statusEditNote<2){
                AppModules.statusEditNote++;
            }
            $dataServ.getData(callbackDataNote);
        }

	
    

	 

	 
	 

        function processDisplay(){
            console.log(AppModules.notiPlace);
            console.log("+++++++++++++++processDisplay+++++++++++++");
            console.log(AppModules.statusEditNote);
             console.log(AppModules.notiPlace.length);
            if(AppModules.notiPlace.length>0&&AppModules.statusEditNote==0||AppModules.statusEditNote==1){
                
console.log("+++++++++++++++setPlaceNoti+++++++++++++");
            
               $notificationServ.setNotiPlace($scope.listNote,currentDate,callbackPlace);
         
            }
            $scope.showTodayNote.sort(function(a,b){
                return a.firstTime.valueOf() - b.firstTime.valueOf();
                }
            );
            
            var tempTodayNote =null;

            var t1 = 0;

            for(var i=0;i<$scope.showTodayNote.length;i++){
                console.log($scope.showTodayNote);
                    var diffTime = new Date().valueOf() -$scope.showTodayNote[i].firstTime.valueOf();
                    diffTime = Math.abs(diffTime);
                    if(i==0){
                        t1 = {index:i,val:diffTime};
                    }else{
                        if(t1.val>=diffTime){
                            t1 = {index:i,val:diffTime};                 
                        }
                    }
            }
            if($scope.showTodayNote.length>=1&&t1!=0){
                $scope.temp1 =  $scope.showTodayNote[0];
                $scope.showTodayNote[0] =  $scope.showTodayNote[t1.index];
                $scope.showTodayNote[t1.index] = $scope.temp1;

            }
     
            momentDates.sort(sortByDateAsc);
          
            var loopAllDate =0;
            var haveDate = false;
            var i =0;
            
            while(i<momentDates.length){
                if(momentDates.length>1){                    
                    $scope.dateCurrent  = momentDates[i];
                    $scope.dateNext = momentDates[i+1];
                    if($scope.dateNext!=undefined){
                        $scope.dateCurrent = moment($scope.dateCurrent).set({hour:0,minute:0,second:0,millisecond:0}).valueOf();
                        $scope.dateNext = moment($scope.dateNext).set({hour:0,minute:0,second:0,millisecond:0}).valueOf();
                    }
                    if($scope.dateCurrent==$scope.dateNext&&$scope.dateNext!=undefined){
                        momentDates.splice(i,1);
                    }else{
                        i++;
                    }
                }else{
                    i++
                }
            }
            console.log(momentDates);
            for(var i =0;i<momentDates.length;i++){
                $scope.showAllNote[i]  = {date:momentDates[i].locale('th').format("LLLL"),listNote:[]}
                for(var j =0;j<$scope.listNote.length;j++){
                    if($scope.listNote[j].hasOwnProperty('noteList')){
                        for(var k=0;k<$scope.listNote[j].noteList.resultsTimeAndPlace.length;k++){
                            $scope.dateOutput = JSON.parse(JSON.stringify($scope.listNote[j].noteList.resultsTimeAndPlace[k].output[0]));            
                            $scope.dateOutput = moment($scope.dateOutput).set({hour:0,minute:0,second:0,millisecond:0}).valueOf();
                            $scope.dateMoment  = momentDates[i];
                            $scope.dateMoment = moment($scope.dateMoment).set({hour:0,minute:0,second:0,millisecond:0}).valueOf();
                            if($scope.dateOutput==$scope.dateMoment){
                                $scope.showAllNote[i].listNote.push($scope.listNote[j].noteList); 
                                
                            }                
                        }     
                    }
                }
            }
            console.log(AppModules.notiPlace);
            var loopShowAllPlace =0;
            for(var i =0;i<momentDates.length;i++){
                var checkDateMatch =false;
                $scope.dateMoment  = momentDates[i];
                $scope.dateMoment = $scope.dateMoment.set({hour:0,minute:0,second:0,millisecond:0});
                for(var j =0;j<AppModules.notiPlace.length;j++){
                    $scope.dateNotiPlace = JSON.parse(JSON.stringify(AppModules.notiPlace[j].date));
                    $scope.dateNotiPlace = moment($scope.dateNotiPlace);
                    $scope.dateNotiPlace  = $scope.dateNotiPlace.set({hour:0,minute:0,second:0,millisecond:0}).valueOf();
                    
                    if($scope.dateNotiPlace.valueOf()==$scope.dateMoment.valueOf()&&checkDateMatch==false){
                       $scope.showAllPlace[loopShowAllPlace] = {date:momentDates[i].locale('th').format("LLLL"),listPlace:[],listNote:[]}
                       console.log($scope.showAllPlace[loopShowAllPlace]);
                       checkDateMatch = true;
                    }
                    console.log("+++++++"+moment($scope.dateNotiPlace).locale('th').format("LLLL")+"+++++++++++");
                    if($scope.dateNotiPlace.valueOf()==$scope.dateMoment.valueOf()&&AppModules.notiPlace[j].statusPlace==false){
                        console.log(AppModules.notiPlace[j].sequence);
                        $scope.showAllPlace[loopShowAllPlace].listPlace.push({title:AppModules.notiPlace[j].title,content:AppModules.notiPlace[j].content,sequence:AppModules.notiPlace[j].sequence});
                        $scope.showAllPlace[loopShowAllPlace].listNote.push(AppModules.notiPlace[j].sequence);
                    }            
                }
                if(checkDateMatch==true){
                    loopShowAllPlace++;
                }

            }
            console.log($scope.showAllPlace);

        }
        /*
        document.addEventListener('deviceready', onDeviceReady, false);
         function onDeviceReady () {
             cordova.plugins.backgroundMode.setDefaults({silent: true});
             cordova.plugins.backgroundMode.enable();
            cordova.plugins.backgroundMode.on('activate', function() {
                     $timeout(function () {
                        $notificationServ.setNotiPlace($scope.listNote,currentDate,callbackPlace);
                    },5000);
            });
         }*/
        
              


    function callbackPlace(data,status){
       
    /*console.log(data);*/
        $scope.status = status;
        if(AppModules.statusEditNote==1||AppModules.statusEditNote==0){
            AppModules.statusEditNote++;
        }
        data.sort(function(a,b){
                return a.diffCurrentDistance.valueOf() - b.diffCurrentDistance.valueOf();
                }
        );
        if(data.length>0){
            $timeout(function () {
                $scope.$apply(function(){
                    if($scope.status=="openGps"){
                       $scope.openGps = '';
                    }else{
                         $scope.openGps = '<div class="item item-divider item-day item-alert"><i   ng-click="openDate($index)"  ng-model="note[$index].onDate" class="icon ion-android-alert item-customize-calendar" ></i><label  class="item-label-datetime color-white" >ไม่สามารถระบุตําแหน่งได้</label></div>';
                    }
                    $scope.showPlaceToday = data;
                });
            }, 100);
        }else{
             $timeout(function () {
                $scope.$apply(function(){
                    if($scope.status=="openGps"){
                        $scope.openGps = '';
                    }else{
                         $scope.openGps = '<div class="item item-divider item-day item-alert"><i   ng-click="openDate($index)"  ng-model="note[$index].onDate" class="icon ion-android-alert item-customize-calendar" ></i><label  class="item-label-datetime    color-white">ไม่สามารถระบุตําแหน่งได้</label></div>';
                    }
                    
                });
            }, 100);

        }
        $timeout(function () {
        $notificationServ.setNotiPlace($scope.listNote,currentDate,callbackPlace);
        },5000);
    }
    
    $scope.goToDelete = function(index){
        confirmPopup = $ionicPopup.confirm({
            title: 'คำเตือน',
            template: '<center>ระบบจะทำการลบข้อมูลและการแจ้งเตือนทั้งหมดที่เกียวข้อง<br><br>คุณแน่ใจที่ต้องการลบโน๊ตนี้?</center>'
        });
        confirmPopup.then(function(res) {
            if(res) {
                $loadingServ.openLoading();
                console.log($scope.listNote);
                for(var i =0;i<$scope.listNote.length;i++){
                    if($scope.listNote[i].hasOwnProperty('noteList')){
                        console.log("+++noteList+++")                       
                        if($scope.listNote[i].noteList.sequence==index){
                            var itemDelete = JSON.parse(JSON.stringify($scope.listNote[i]));
                            AppModules.statusEditNote = 0;
                            DatabaseService.deleteNote(itemDelete).then(function(){
                                $notificationServ.setNotiStatus($scope.listNote,againCallProcess)
                            })                  
    
                        } 
                    }
                }
            } else {
                console.log('Deletion canceled !');
            }
        });
    }
    function againCallProcess(){
        $dataServ.getData(callbackDataNote);
    }
   
    $scope.openToday  = function(){
        $scope.activeToday = {statusString:"active",statusBool:true,sortByDate:$scope.activeToday.sortByDate,sortByPlace:$scope.activeToday.sortByPlace,colorDate:$scope.activeToday.colorDate,colorPlace:$scope.activeToday.colorPlace};
        $scope.activeAll = {statusString:"",statusBool:false,sortByDate:$scope.activeAll.sortByDate,sortByPlace:$scope.activeToday.sortByPlace,colorDate:$scope.activeAll.colorDate,colorPlace:$scope.activeAll.colorPlace};
    };

    $scope.openAll  = function(){
        $scope.activeToday = {statusString:"",statusBool:false,sortByDate:$scope.activeToday.sortByDate,sortByPlace:$scope.activeToday.sortByPlace,colorDate:$scope.activeToday.colorDate,colorPlace:$scope.activeToday.colorPlace};
        $scope.activeAll = {statusString:"active",statusBool:true,sortByDate:$scope.activeAll.sortByDate,sortByPlace:$scope.activeToday.sortByPlace,colorDate:$scope.activeAll.colorDate,colorPlace:$scope.activeAll.colorPlace};
    };
    $scope.goToContentNote = function(parentIndex,index){
        var noteIndex = null;
        var sequence = null;
        console.log(AppModules.listNote);
        if($scope.activeToday.statusBool==true){
            for(var i=0;i<$scope.listNote.length;i++){
                if($scope.listNote[i].hasOwnProperty('noteList')){
                    if($scope.listNote[i].noteList.sequence == $scope.showTodayNote[index].sequence){
                        AppModules.note = $scope.listNote[i].noteList.content;
                        noteIndex = i;
                        sequence = $scope.listNote[i].noteList.sequence;
                    }
                }
            }
        }else if($scope.activeAll.statusBool==true){
            for(var i=0;i<$scope.listNote.length;i++){
                if($scope.listNote[i].hasOwnProperty('noteList')){
                    if($scope.listNote[i].noteList.sequence == $scope.showAllNote[parentIndex].listNote[index].sequence){
        
                            AppModules.note = $scope.listNote[i].noteList.content;
                            noteIndex = i;
                            sequence = $scope.listNote[i].noteList.sequence;
                        }
                    }
                }
            }
        console.log(noteIndex);
                
        $state.go("app.contentNote",{noteIndex});
    }
    $scope.$on("forward", function(data){

        $state.go("app.newNote");
    });
    $scope.$on("back", function(data){
        $ionicSideMenuDelegate.toggleLeft();
    });

    function callbackDataDelete(){
        $dataServ.getData(callbackDataNote);
    }
  
    $scope.sortByDate = function(){
        $scope.activeToday = {statusString:$scope.activeToday.statusString,statusBool:$scope.activeToday.statusBool,sortByDate:true,sortByPlace:false,colorDate:"color-violet",colorPlace:"color-grey"};
        $scope.activeAll = {statusString:$scope.activeAll.statusString,statusBool:$scope.activeAll.statusBool,sortByDate:true,sortByPlace:false,colorDate:"color-violet",colorPlace:"color-grey"};
    }
    $scope.sortByPlace = function(){
        $scope.activeToday = {statusString:$scope.activeToday.statusString,statusBool:$scope.activeToday.statusBool,sortByDate:false,sortByPlace:true,colorDate:"color-grey",colorPlace:"color-green"};
        $scope.activeAll = {statusString:$scope.activeAll.statusString,statusBool:$scope.activeAll.statusBool,sortByDate:false,sortByPlace:true,colorDate:"color-grey",colorPlace:"color-green"};

    }

    function IDGenerator() {
	 
		 this.length = 8;
		 this.timestamp = +new Date;
		 
		 var _getRandomInt = function( min, max ) {
			return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
		 }
		 
		 this.generate = function() {
			 var ts = this.timestamp.toString();
			 var parts = ts.split( "" ).reverse();
			 var id = "";
			 
			 for( var i = 0; i < this.length; ++i ) {
				var index = _getRandomInt( 0, parts.length - 1 );
				id += parts[index];	 
			 }
			 
			 return id;
		 }

		 
	 }

    

});