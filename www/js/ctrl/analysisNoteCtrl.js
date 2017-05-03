angular.module('moduleControlles')
.controller("analysisNoteCtrl", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,$ionicTabsDelegate,$timeServ,AppModules,$googleServ,$ionicHistory,$loadingServ,$operandServ,$injector,$timeout,$rootScope,DatabaseService,$cordovaLocalNotification,$notificationServ,firebaseServ,$dataServ,$internetServ,$dicServ,$cordovaGeolocation) {
    console.log("welcome to analysisNoteCtrl")
    /*$loadingServ.openLoading();*/
    $scope.$on('$ionicView.enter', function() {
        $injector.get('$loadingServ').openLongLoading();
    })
    czx
    $ionicPlatform.ready(function() {
        DatabaseService.initDB();
    })
    $operandServ.setOperand("ion-chevron-left","เรียบร้อย",true);
    $scope.oldPath = AppModules.oldPath;
    AppModules.path = "app.analysisNote";
    $scope.note = [];
    $scope.inputFindPlace = [];
    $scope.tempResultPlace = [];    
   
   $scope.note.contentOriginal =  AppModules.note.contentOriginal;
    $scope.note.content =  AppModules.note.contentOriginal;

   $scope.note.analysis = AppModules.note.analysis;
    $scope.note.title = AppModules.note.title;

    if(AppModules.note.hasOwnProperty('placeFromGmapNewNote')){
        $scope.note.place = AppModules.note.placeFromGmapNewNote;
    }else{
        $scope.note.place = [];
    }


      /* $scope.note.contentOriginal="วันที่ 25 เมษายน 2560 มีการวางแผนฆ่าฟัน เหล่าหนุ่มสาวอายุราว 21-22 ปี เป็นจำนวน 69 คนโดยเฉลี่ยที่ใต้ตึก 17 มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา อำเภอศรีราชา จังหวัดชลบุรี เวลาเช้า 8.30 น. จนถึงเย็นค่ำๆ 19.30 น."
    $scope.note.content ="วันที่ 25 เมษายน 2560 มีการวางแผนฆ่าฟัน เหล่าหนุ่มสาวอายุราว 21-22 ปี เป็นจำนวน 69 คนโดยเฉลี่ยที่ใต้ตึก 17 มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา อำเภอศรีราชา จังหวัดชลบุรี เวลาเช้า 8.30 น. จนถึงเย็นค่ำๆ 19.30 น."
   
$scope.note.contentOriginal = "วันที่ 25 เมษายน 2560  เวลาเช้า 8.30 น. จนถึงเย็นค่ำๆ 19.30 น. ไปโร"
$scope.note.content = "วันที่ 25 เมษายน 2560  เวลาเช้า 8.30 น. จนถึงเย็นค่ำๆ 19.30 น. ไปโร"*/
/*$scope.note.contentOriginal= "วันที่ 25 เมษายน 2560  เวลาเช้า 8.30 น. จนถึงเย็นค่ำๆ 19.30 น. ไปตลาดนัดรถไฟ"
$scope.note.content = "วันที่ 25 เมษายน 2560  เวลาเช้า 8.30 น. จนถึงเย็นค่ำๆ 19.30 น. ไปตลาดนัดรถไฟ"*/
    
    $scope.note.analysis = {color:"color-darkblue",status:true,icon:"ion-eye",text:"เปิด ระบบวิเคราห์สำหรับทุกการสร้างบันทึกใหม่"};
     $scope.note.title = "โน๊ตของฉัน";
     $scope.note.place = [];

    $scope.note.openDateTime = true;
    $scope.results = null;
    console.log(AppModules.note);
    console.log($scope.note);
    
    var pattern;
    var temp=null;
    var longestWord={lengthWord:0,offset:null,sequence:""};
    var input=null;
    var output=[];
    var loop=0;
    var eachNote =0;
    var eachContent = 0;
    var sequenceNote = "";
    var tempOutput = [];
    var posOptions = {timeout: 10000, enableHighAccuracy: false};

    var pyrmont = {lat: 13.168561, lng: 100.927903};

    /*$cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        pyrmont = {lat: position.coords.latitude, lng: position.coords.longitude};
        process();
    }, function(err) {
        process();
    });*/
    process();
    var eachPlaceInday = 0;
    
    
   

function process(){
    /*$timeout(function(){ setMap(loop); }, 2000);  */
    if(AppModules.note.hasOwnProperty('openDateTime')){
        $scope.note.openDateTime = AppModules.note.openDateTime;
    }
    if($stateParams.place.length!=0){
        $scope.note.connected = AppModules.note.connected;
        $scope.note.openPlace = AppModules.note.openPlace;
        $scope.note.openDateTime = AppModules.note.openDateTime;
        var placeString = $stateParams.place[0].name;
        placeString = placeString.replace(" ","");
        $stateParams.place[0].name = placeString;
        showMap("");
        AppModules.place.currentPlace[$stateParams.index].results = $stateParams.place[0];
        $scope.inputFindPlace.currentPlace[$stateParams.index].results = AppModules.place.currentPlace[$stateParams.index].results;
        console.log($scope.inputFindPlace.currentPlace[$stateParams.index].results);
        $scope.inputFindTime = AppModules.inputFindTime;;

    }else{
        if($stateParams.status!="back"&&$stateParams.status!="not change"){
            AppModules.place = null;
             console.log(AppModules.setting.setting.time);
            $timeServ.setDaysetting(AppModules.setting.setting.time);
            $scope.inputFindTime = $timeServ.splitWordWithPlusSign($scope.note.contentOriginal);
             console.log($scope.inputFindTime);



            if($scope.note.place.length!=0){
                for(var i = 0 ;i<$scope.inputFindTime.length;i++){ 
                    for(var j =0;j<$scope.note.place.length;j++){
                        pattern = new RegExp($scope.note.place[j].name);   
                        if(pattern.test($scope.inputFindTime[i].input.toString())){
                            output.push({results:$scope.note.place[j],keyWord:$scope.note.place[j].name,sequenceDate:i});
                            /*$scope.inputFindTime[i].input = $scope.inputFindTime[i].input.replace($scope.note.place[j].name,"");*/
                        
                        }
                    }
                }
            }

            if($scope.oldPath=="app.editNote"){
                console.log("++++++++++++++++++++++++edit+++++++++++++++++++++++++++");
                console.log($stateParams.noteIndex);
                for(var i = 0;i<AppModules.listNote[$stateParams.noteIndex].noteList.resultsTimeAndPlace.length;i++){ 
                    if(AppModules.listNote[$stateParams.noteIndex].noteList.resultsTimeAndPlace[i].hasOwnProperty('place')){
                        if(AppModules.listNote[$stateParams.noteIndex].noteList.resultsTimeAndPlace[i].place.length>0){
                        for(var j=0;j<AppModules.listNote[$stateParams.noteIndex].noteList.resultsTimeAndPlace[i].place.length;j++){        
                                pattern = new RegExp(AppModules.listNote[$stateParams.noteIndex].noteList.resultsTimeAndPlace[i].place[j].keyWord);
                                if(pattern.test($scope.note.contentOriginal)){
                                    console.log("+++++++++++placeIsExist++++++++")
                                    output.push({results:AppModules.listNote[$stateParams.noteIndex].noteList.resultsTimeAndPlace[i].place[j].results,keyWord:AppModules.listNote[$stateParams.noteIndex].noteList.resultsTimeAndPlace[i].place[j].keyWord,sequenceDate:AppModules.listNote[$stateParams.noteIndex].noteList.resultsTimeAndPlace[i].place[j].sequenceDate});
                                }
                            }
                        }
                    }
                }        
            }
                tempOutput = output;
                output = [];
                console.log(tempOutput);
                $internetServ.status(callbackStatusInternet);
    
        var eachTimeInDate = 0;
        console.log($scope.inputFindTime.length);
        if($scope.inputFindTime.length>0){
            for(var i =0;i<$scope.inputFindTime.length;i++){
                if($scope.inputFindTime[i].output.length>0){
                    $scope.note.openDateTime = true;
                    eachTimeInDate = 0;
                    $scope.inputFindTime[i].formatTime = [];
                    $scope.inputFindTime[i].sequeceTime = [];
                    $scope.inputFindTime[i].formatDate = $scope.inputFindTime[i].output[0].locale('th').format("LLLL");
                    $scope.note.showTimeofDay = [];
                    for(var j =0;j<$scope.inputFindTime[i].output.length;j++){
                        eachTimeInDate  = eachTimeInDate + 0.1;
                        $scope.inputFindTime[i].sequeceTime.push(eachTimeInDate);
                        $scope.inputFindTime[i].formatTime.push($scope.inputFindTime[i].output[j].format("HH:mm"));
                        $scope.note.showTimeofDay.push(true);
                
                    }
                }
            }
        }else{  
             $scope.note.openDateTime = false;
        }

            console.log( $scope.note.openDateTime);
        }else{
            $scope.inputFindTime = AppModules.inputFindTime;
            $scope.inputFindPlace =AppModules.inputFindPlace;
            $scope.note.connected = AppModules.note.connected;
            
        }
    }
    console.log($scope.note.content);
   
    function callbackStatusInternet(status){
         if(status=="online"){
              var map = new google.maps.Map(document.getElementById('map'), {
                    disableDefaultUI: true,
                    center: pyrmont,
                    zoom: 15
                });       
                $scope.note.connected = true;
                setMap(loop);
                console.log("connected");
            }else{
                $scope.note.connected = false;
                getPlaceInDic();
            }
        
    }   
    function getPlaceInDic(){
        input = $scope.inputFindTime[loop];
        $dicServ.searchData(input.input,callbackResultDic)
    }
    function callbackResultDic(data){
        console.log(data);
        for(var i=0;i<data.length;i++){
            eachPlaceInday = eachPlaceInday+0.01;
            var result = {sequencePlace:eachPlaceInday,results:data[i].detail,keyWord:data[i].keyWord,sequenceDate:loop};
            output.push(result);     
        }
    
        if(loop==$scope.inputFindTime.length-1){
            showMap(output);
        }else{
            loop++;
            eachPlaceInday = 0;
            getPlaceInDic();
        }
    }
    
    function setMap(loop){
        input = $scope.inputFindTime[loop];
        console.log("++++++++++++++++input+++++++++++++++++++++++");
        console.log(input);
   
        if(input.resultdate.length!=0){
            pattern = "<day>";
            $scope.note.content = input.input.replace(input.resultdate[0],pattern);
        }
        if(input.resultTime.length!=0){
            for(var i =0;i<input.resultTime.length;i++){
                pattern = "<time>";
                $scope.note.content=$scope.note.content.replace(input.resultTime[i],pattern); 
                console.log($scope.note.content);    
            }
            
        }
        /*[0-9][0-9]\\.|[0-9]\\.*/
        pattern = /กับ|และ|ก็|แล้ว|ไป|,|ตอน|ที่|ปี|ที่|เที่ยว|ใน|บน|ไผ|\n/g;
        $scope.note.content=$scope.note.content.replace(pattern,"<conjunction>");

        pattern = new RegExp("([0-9]|[0-9][0-9])(\\.|[)])|-",'g')
        $scope.note.content=$scope.note.content.replace(pattern,"<section>");

        pattern = /ต่างจังหวัด|บ้านเกิด/g;
        $scope.note.content=$scope.note.content.replace(pattern,"จังหวัดกรุงเทพมหานคร");
        console.log($scope.note.content)

        var arrayPattern =["รร.","รพ.","ธ.","บ.","ม.","วค.","ปณ.","สน."]
        for(var i=0;i<arrayPattern.length;i++){
            if(arrayPattern[i]=="รพ."){
                $scope.note.content=$scope.note.content.replace("รพ.","โรงพยาบาล");
            }else if(arrayPattern[i]=="รร."){
                $scope.note.content=$scope.note.content.replace("ปณ.","โรงเรียน");
            }
            else if(arrayPattern[i]=="ธ."){
                $scope.note.content=$scope.note.content.replace("ธ.","ธนาคาร");
            }
             else if(arrayPattern[i]=="บ."){
                $scope.note.content=$scope.note.content.replace("บ.","บริษัท");
            }
            else if(arrayPattern[i]=="ม."){
                $scope.note.content=$scope.note.content.replace("ม.","มหาวิทยาลัย");
                console.log($scope.note.content);
            }
            else if(arrayPattern[i]=="วค."){
                $scope.note.content=$scope.note.content.replace("วค.","วิทยาลัยครู");
            }
            else if(arrayPattern[i]=="ปณ."){
                $scope.note.content=$scope.note.content.replace("ปณ.","ไปรษณีย์");
            }
            else if(arrayPattern[i]=="สน."){
                $scope.note.content=$scope.note.content.replace("สน.","สถานีตำรวจ");
            }
            
        }
         var arrayPattern =[" ร้าน"," สาขา"," วิทยาเขต"," อำเภอ"," ตำบล"," จังหวัด","เขต"]
        for(var i=0;i<arrayPattern.length;i++){
            var patternSpace = / |  |   /; 
            if(arrayPattern[i]==" ร้าน"){
                $scope.note.content=$scope.note.content.replace(" ร้าน","ร้าน");
            }
            else if(arrayPattern[i]==" วิทยาเขต"){
                $scope.note.content=$scope.note.content.replace(" วิทยาเขต","วิทยาเขต");
            }
            else if(arrayPattern[i]==" สาขา"){
                $scope.note.content=$scope.note.content.replace(" สาขา","สาขา");
            }
            else if(arrayPattern[i]==" อำเภอ"){
                $scope.note.content=$scope.note.content.replace(" อำเภอ","อำเภอ");

            }
            else if(arrayPattern[i]==" ตำบล"){
                $scope.note.content=$scope.note.content.replace(" ตำบล","ตำบล");

            }
            else if(arrayPattern[i]==" จังหวัด"){
                $scope.note.content=$scope.note.content.replace(" จังหวัด","จังหวัด");

            }
             else if(arrayPattern[i]==" เขต"){
                $scope.note.content=$scope.note.content.replace(" เขต","เขต");

            }


        }
        
     

        pattern = /<day>|<time>|<conjunction>|<section>| |   /;
        subAllStringNote = $scope.note.content;
        $scope.note.content = $scope.note.content.split(pattern);
        temp = [];
        for(var i =0;i<$scope.note.content.length;i++){
            if($scope.note.content[i]!=""&&$scope.note.content[i]!=" "&&$scope.note.content[i]!="  "
            
            &&!$scope.note.content[i].match(/(25[0-9][0-9])/)&&!$scope.note.content[i].match(/^([0-9][0-9])$/)
            &&!$scope.note.content[i].match(/^([0-9][0-9]-[0-9][0-9])$/)
            ){
                temp.push($scope.note.content[i]);
            }
        }
       


        $scope.note.content = temp;
        temp = null;
        console.log(eachContent);
        
        /*if(tempOutput.length>0){
            for(var i=0;i<tempOutput.length;i++){
                for(var j=0;j<$scope.note.content.length;j++){
                    console.log("++++++++++++++++++++++++existPlace++++++++++++++++++++++++++")
                    pattern = new RegExp(tempOutput[i].keyWord);
                    console.log(pattern);
                    console.log($scope.note.content[j]);
                    if(pattern.test($scope.note.content[j])){
                        console.log("+++++++++++++++++matchPlace+++++++++++++++++++++++++")
                        $scope.note.content[j] = "";
                    }
                }
            }
            findPlace(eachContent);
        }else{
            findPlace(eachContent);
        }*/

        console.log($scope.note.content);
findPlace(eachContent);

    }

    function findPlace(eachContent){
        console.log("+++++++++++++++++++++++++++content+++++++++++++++++++++++++++++++");
        console.log($scope.note.content[eachContent]);
        if($scope.note.content[eachContent]!=""&&$scope.note.content[eachContent]!=" "&&$scope.note.content[eachContent]!="  "&&$scope.note.content[eachContent]!=undefined){

            var request = {
                location: pyrmont,
                radius: '1000',
                query: $scope.note.content[eachContent]
            };
            service = new google.maps.places.PlacesService(map);
            service.textSearch(request, callbackResultPlace);
        }else{
             if(eachContent<$scope.note.content.length){
                 eachContent++;
                findPlace(eachContent);
            }else{
                loop=loop+1;
                eachContent=0;
                if(loop<$scope.inputFindTime.length){
                    setMap(loop);
                }else{
                    loop = 0;
                    console.log($scope.tempResultPlace);
                    setMap2(loop);
                }
            }
        }

        
           

    }



    function callbackResultPlace(results, status) {
        console.log("++++++++++++++++++++++startCallBack++++++++++++++++++++++++++++++++");
        console.log(status);
        var originalKeyWord ="";
         if (status == google.maps.places.PlacesServiceStatus.OK) { 
             console.log($scope.inputFindTime[loop]);  
            if(results.length>1){
                for(var i =0;i<results.length;i++){
                    console.log(results[i]);
                    var placeString = results[i].name;
                    placeString = placeString.replace(" ","");
                    results[i].name = placeString;
                    temp = $googleServ.longestCommonSubstring($scope.note.content[eachContent],results[i].name);                  
                    if(temp.lengthWord>1&&temp.lengthWord>=longestWord.lengthWord&&temp.sequence!=" "&&temp.sequence!=""&&temp.sequence!=undefined){
                        longestWord = temp;
                        console.log(longestWord);
                        console.log(results[i]);
                        output.push({results:results[i],keyWord:longestWord,sequenceDate:loop});
                    }
                }
                originalKeyWord = longestWord.sequence;
            }else{
                originalKeyWord = $scope.note.content[eachContent];
                output.push({results:results[0],keyWord:originalKeyWord,sequenceDate:loop});
            }
                
               console.log(originalKeyWord);
                console.log(output);
              var dicPlace = $dicServ.getData(originalKeyWord);
             /* var dicPlace = null;*/
                if(dicPlace!=null){
                    tempOutput.push({results:dicPlace,keyWord:originalKeyWord,sequenceDate:loop})
                    output = null;
                }else{
                    if(output.length>1){
                        temp =[];
                        var resultLongestWord = {lengthWord:0,offset:null,sequence:""};
                        var resultPlace ="";
                        for(var i =0;i<output.length;i++){
                            longestWord={lengthWord:0,offset:null,sequence:""};
                            for(var j =i+1;j<output.length;j++){
                                tempLongestWord = $googleServ.longestCommonSubstring(output[i].results.name,output[j].results.name);
                                if(tempLongestWord.lengthWord >longestWord.lengthWord){
                                    longestWord = tempLongestWord;
                                    tempPlace = output[j];
                                }                 
                            } 
                        
                            if(longestWord.lengthWord!=0&&longestWord.sequence!=" "&&longestWord.sequence!="  "&&longestWord.sequence!=undefined){            
                                temp.push(longestWord);
                            }                   
                        }
                    if(temp.length>1){
                            for(var i =0;i<temp.length;i++){
                                var tempLongestWord ="";
                                var tempPlace ="";
                                longestWord={lengthWord:0,offset:null,sequence:""};
                                for(var j =i+1;j<temp.length;j++){
                                    tempLongestWord = $googleServ.longestCommonSubstring(temp[i].sequence,temp[j].sequence);
                                    if(tempLongestWord.lengthWord >longestWord.lengthWord){
                                        longestWord = tempLongestWord;
                                        tempPlace = temp[j];
                                    }
                                }
                                if(longestWord.lengthWord>resultLongestWord.lengthWord){
                                    resultLongestWord = longestWord;
                                    resultPlace = tempPlace;
                                }

                            }
                            output = {results:resultPlace.sequence,keyWord:originalKeyWord,sequenceDate:loop};
                        }else{
                            if(temp.length>0){
                                output = {results:temp[0].sequence,keyWord:originalKeyWord,sequenceDate:loop};
                            }
                        }
                        
                        
                    }else{
                        console.log(output);
                        if(output.length>0){

                            output = {results:output[0].results.name,keyWord:originalKeyWord,sequenceDate:loop};
                        }else{
                        output = null;  
                        }            
                    }     
                }                    
         }else{
             output = null;
         }
   
        return getMap(output);
         console.log("++++++++++++++++++++++endCallBack++++++++++++++++++++++++++++++++"); 
        
  
         
       
    }
    
    function getMap(place){
        console.log(place);
        eachContent++;
        temp=null;
        console.log(place);
        if(output!=null){

            $scope.tempResultPlace.push(place);
        }
    
        output =[];   
        longestWord={lengthWord:0,offset:null,sequence:""};
        if(eachContent<$scope.note.content.length){
            findPlace(eachContent);
        }else{
            loop=loop+1;
            eachContent=0;
            if(loop<$scope.inputFindTime.length){
                setMap(loop);
            }else{
                loop = 0;
                console.log($scope.tempResultPlace);
               setMap2(loop);
            }
        }
    }
    function setMap2(loop){
        /*console.log($scope.tempResultPlace);*/
        if(loop<$scope.tempResultPlace.length){
            if($scope.tempResultPlace[loop].results!=undefined&&$scope.tempResultPlace[loop].results!=""&&$scope.tempResultPlace[loop].results!=" "&&$scope.tempResultPlace[loop].results!="  "){
                eachPlaceInday = eachPlaceInday + 0.01;
                
                var request = {
                        location: pyrmont,
                        radius: '1000',
                        query: $scope.tempResultPlace[loop].results
                };
                service = new google.maps.places.PlacesService(map);
                service.textSearch(request, callbackResultPlace2);
            }else{
                  loop++;
                setMap2(loop);
            }

        }else{
            $scope.tempResultPlace = output;
            showMap($scope.tempResultPlace);
        }

    }
    
    function callbackResultPlace2(results, status) {
        console.log("zccccccccccccccccccccccccccccccc");
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            temp = $googleServ.longestCommonSubstring($scope.tempResultPlace[loop].keyWord,results[0].name);
            var placeString = results[0].name;
            placeString = placeString.replace(" ","");
            results[0].name = placeString;
            if(temp.lengthWord>1){
                var resultPlace =  {sequencePlace:eachPlaceInday,results:results[0],keyWord:$scope.tempResultPlace[loop].keyWord,sequenceDate:$scope.tempResultPlace[loop].sequenceDate};
                console.log(resultPlace);
                output.push(resultPlace);
            }
            
            

        }
        loop++;
        setMap2(loop);

    }
    function showMap(output){
        $loadingServ.closeLoading();
        console.log("++++++++++output+++++++++++++")
        for(var i=0;i<tempOutput.length;i++){
            output.push(tempOutput[i]);
        }
        for(var i=0;i<output.length;i++){
            for(var j=0;j<output.length;j++){
                console.log(output[i].results.name)
                if(output[i].results.name==output[j].results.name&&i!=j){
                    console.log("+++++++++splice+++++++++");
                    output.splice(j,1);
                }
            }
        }
        
        if(AppModules.place==null){
            $scope.inputFindPlace.originalPlace = output;
            $scope.inputFindPlace.currentPlace = output;
            AppModules.place = $scope.inputFindPlace;
            console.log(output);      
        }
        console.log(output);
       
        $scope.inputFindPlace =AppModules.place;
         if($stateParams.place.length==0){
            $timeout(function () {
                $scope.$apply(function(){
                    if(output.length==0){
                        $scope.note.openPlace = false;
                    }
                });
            }, 100);
         }
        console.log("finish");
    }
    $scope.editDate = function(index){
        var value = $scope.inputFindTime[index].output[0];
        $scope.date = new Date(value.get('year'),value.get('month'), value.get('date'), value.get('hour'), value.get('minute'), value.get('second'));
    }
    $scope.editTime=function(parentIndex,index){
        var value = $scope.inputFindTime[parentIndex].output[index];
        $scope.time= new Date(value.get('year'),value.get('month'), value.get('date'), value.get('hour'), value.get('minute'), value.get('second')); 
    }
    

    $scope.setDirectiveFn = function(data,parentIndex,index,type){
        console.log(type);
        if(type=="date"){
            for(var i =0;i<$scope.inputFindTime[index].output.length;i++){
                $scope.inputFindTime[index].output[i].set({'date': data.getDate()});
                $scope.inputFindTime[index].output[i].set({'month': data.getMonth()});
                $scope.inputFindTime[index].output[i].set({'year': data.getFullYear()});
                /*$scope.inputFindTime[index].resultdate[0] =$scope.inputFindTime[index].output[i].locale('th').format("dddd");*/
                $scope.inputFindTime[index].formatDate =$scope.inputFindTime[index].output[i].locale('th').format("LLLL");
            }
        }else if(type=="time"){
                $scope.inputFindTime[parentIndex].output[index].set({'hour':data.getHours(),'minute':data.getMinutes(),'second':data.getSeconds()});
                $scope.inputFindTime[parentIndex].formatTime[index] = $scope.inputFindTime[parentIndex].output[index].format("HH:mm");
                /*$scope.inputFindTime[parentIndex].resultTime[index] = $scope.inputFindTime[parentIndex].output[index].format("HH:mm");*/
        }
        

    }

    $scope.openDate = function(index){
        if($scope.note[index].onDate.status==true){
            $scope.note[index].onDate.status = false;
            $scope.note[index].onDate.color="color-grey";
        }else{
            $scope.note[index].onDate.status=true;
            $scope.note[index].onDate.color="color-violet";
        }
    }
    
    $scope.openTime = function(parentIndex,index){
     
     
        if($scope.note[parentIndex][index].onTime.status==true){
            $scope.note[parentIndex][index].onTime.status = false;
            $scope.note[parentIndex][index].onTime.color = "color-grey";
        }else{
            $scope.note[parentIndex][index].onTime.status = true;
            $scope.note[parentIndex][index].onTime.color = "color-orange";
        }

    }
    $scope.openPlace = function(index){
        if($scope.note[index].onPlace.status==true){
            $scope.note[index].onPlace.status = false;
            $scope.note[index].onPlace.color="color-grey";
        }else{
            $scope.note[index].onPlace.status=true;
            $scope.note[index].onPlace.color="color-green";
        }
    }

    $scope.goToDeleteTime = function(parentIndex,index){
        console.log($scope.inputFindTime[parentIndex].resultTime[index]);
        console.log($scope.inputFindTime[parentIndex].output[index]);

        for(var i=0;i<$scope.inputFindTime[parentIndex].output.length;i++){
            delete $scope.note[parentIndex][i];
        }
        
        $scope.inputFindTime[parentIndex].resultTime.splice(index,1);
        $scope.inputFindTime[parentIndex].formatTime.splice(index,1);
        $scope.inputFindTime[parentIndex].output.splice(index,1);
         for(var i=0;i<$scope.inputFindTime[parentIndex].output.length;i++){
            $scope.note[parentIndex][i] = {};
            $scope.note[parentIndex][i].onTime = {status:true,color:"color-orange"} ;
        }
        
        /*$scope.note[parentIndex] = {};
        $scope.note[parentIndex].onDate={status:true,color:"color-violet"};
        
        for(var i=0;i<$scope.inputFindTime[parentIndex].output.length;i++){
            $scope.note[parentIndex][i] = {};
            $scope.note[parentIndex][i].onTime = {status:true,color:"color-orange"};
        }*/
        console.log($scope.note[parentIndex]);
        if($scope.inputFindTime[parentIndex].output.length==0){
            $scope.note[parentIndex].onDate = false;
        }

        console.log($scope.note[parentIndex]);
        $timeout(function(){
             $scope.$apply();
        },1000) 

    }
    $scope.goToDeletePlace = function(index){
        console.log($scope.inputFindPlace.currentPlace);
        $scope.inputFindPlace.currentPlace.splice(index,1);
        if($scope.inputFindPlace.currentPlace.length==0){
            $scope.note.openPlace = false;
        }
        $timeout(function(){
             $scope.$apply();
        },10)    
   }

    $scope.goToDeletePlace = function(index){
        console.log($scope.inputFindPlace.currentPlace);
        $scope.inputFindPlace.currentPlace.splice(index,1);
        if($scope.inputFindPlace.currentPlace.length==0){
            $scope.note.openPlace = false;
        }
        $timeout(function(){
             $scope.$apply();
        },10)    
   }

    $scope.indexPlace  =null;
    $scope.goToGoogleMap = function(index){
        $scope.indexPlace = index;
        $internetServ.status(callbackStatusInternetForMap);
    }

    function callbackStatusInternetForMap(status){
        AppModules.note = $scope.note;
        AppModules.inputFindTime = $scope.inputFindTime;
        AppModules.inputFindPlace = $scope.inputFindPlace;
         console.log( $scope.indexPlace)
         if(status=="online"){
            $state.go("app.googleMap",{place:AppModules.place.currentPlace[$scope.indexPlace].results,index:$scope.indexPlace,noteIndex:$stateParams.noteIndex});
        }else{
                
        }

    }



    $scope.$on("forward", function(data){
        document.addEventListener('deviceready', function () {
            cordova.plugins.notification.local.clearAll(function() {
                console.log("done"); 
            })
        })
        AppModules.statusEditNote = 0;
        var tempContentOriginal = "";
        for(var i=0;i<$scope.inputFindTime.length;i++){
            tempContentOriginal = tempContentOriginal+ $scope.inputFindTime[i].input;
           
        }
        $scope.note.contentOriginal = tempContentOriginal;
         temp = $scope.note.contentOriginal;
        console.log($scope.note);
        if($scope.note.openDateTime==true){
            for(var i =0;i<$scope.inputFindTime.length;i++){
                $scope.inputFindTime[i].timeString = "";
                $scope.inputFindTime[i].notiTime = [];
                $scope.inputFindTime[i].openTime = [];
                $scope.inputFindTime[i].beforeTime = [];
                console.log($scope.note);
                if($scope.note[i].hasOwnProperty('onDate')){
                    console.log("have Date")
                    $scope.inputFindTime[i].openDate={status:$scope.note[i].onDate.status,color:$scope.note[i].onDate.color,statusDelete:false};
                
                    if($scope.note[i].onDate.status!=false){
                        var checkExistTime = false;               
                        for(var j=0;j<$scope.inputFindTime[i].output.length;j++){

                            if($scope.note[i][j].onTime.status!=false){
                                if(checkExistTime==false){
                                    checkExistTime = true;
                                    /*temp = temp.toString().replace($scope.inputFindTime[i].resultdate[0],'<i class="color-violet" >'+$scope.inputFindTime[i].output[0].locale('th').format("dddd")+'</i>');*/
                                    temp = temp.toString().replace($scope.inputFindTime[i].resultdate[0],'<i class="color-violet" >'+$scope.inputFindTime[i].output[0].locale('th').format("dddd")+'</i>');

                                    $scope.note.contentOriginal = $scope.note.contentOriginal.replace($scope.inputFindTime[i].resultdate[0],$scope.inputFindTime[i].output[0].locale('th').format("dddd"));
                                    $scope.inputFindTime[i].input = $scope.inputFindTime[i].input.replace($scope.inputFindTime[i].resultdate[0],$scope.inputFindTime[i].output[0].locale('th').format("dddd"));
                                    $scope.inputFindTime[i].resultdate[0] =$scope.inputFindTime[i].output[0].locale('th').format("dddd");       
                                }
                                temp = temp.replace($scope.inputFindTime[i].resultTime[j],'<i class="color-orange" >'+$scope.inputFindTime[i].output[j].format("HH:mm")+'</i>');
                                
                                
                               /* console.log($scope.inputFindTime[i].resultTime[j]);
                                console.log($scope.inputFindTime[i].output[j].format("HH:mm"));*/
                                
                                $scope.note.contentOriginal = $scope.note.contentOriginal.replace($scope.inputFindTime[i].resultTime[j],$scope.inputFindTime[i].output[j].format("HH:mm"));
                                $scope.inputFindTime[i].input = $scope.inputFindTime[i].input.replace($scope.inputFindTime[i].resultTime[j],$scope.inputFindTime[i].output[j].format("HH:mm"));
                                $scope.inputFindTime[i].resultTime[j] = $scope.inputFindTime[i].output[j].format("HH:mm");  
                                $scope.inputFindTime[i].timeString = $scope.inputFindTime[i].timeString + $scope.inputFindTime[i].resultTime[j];   
                                console.log($scope.inputFindTime[i].timeString);
                                $scope.inputFindTime[i].notiTime.push(false);
                                $scope.inputFindTime[i].beforeTime.push(AppModules.setting.setting.time.noti);
                            }else{
                                $scope.inputFindTime[i].notiTime.push(true);
                            }
                            $scope.inputFindTime[i].openTime[j]={status:$scope.note[i][j].onTime.status,color:$scope.note[i][j].onTime.color};
                            if($scope.inputFindTime[i].resultTime.length>1&&j!=$scope.inputFindTime[i].resultTime.length-1&&$scope.inputFindTime[i].timeString!=""&&$scope.note[i][j].onTime.status!=false){
                                $scope.inputFindTime[i].timeString = $scope.inputFindTime[i].timeString + ",";
                            }
                            $scope.inputFindTime[i].output[j]  = $scope.inputFindTime[i].output[j].format();
                        }
                        AppModules.note.content= temp;  
                    }
                }
                else{
                    console.log("haven't Date")
                    $scope.inputFindTime[i].openDate={status:false,color:"color-grey",statusDelete:true};
                } 
                
            }
            AppModules.inputFindTime = $scope.inputFindTime;
        }else{
            AppModules.note.content = $scope.note.contentOriginal;
        }
        if($scope.note.openPlace==true){
            if($scope.inputFindPlace.hasOwnProperty('currentPlace')){
                if($scope.inputFindPlace.currentPlace.length>0){
                    for(var i =0;i<$scope.inputFindPlace.currentPlace.length;i++){

                        console.log("++++++++++++++++++++++++setDic+++++++++++++++++++++++++++++");

                        console.log($scope.inputFindPlace.originalPlace[i].keyWord);
                        console.log($scope.inputFindPlace.originalPlace[i].results);

                     $dicServ.setData($scope.inputFindPlace.originalPlace[i].keyWord,$scope.inputFindPlace.originalPlace[i].results);
                        
                            if($scope.inputFindTime[$scope.inputFindPlace.originalPlace[i].sequenceDate].placeString==undefined){
                                $scope.inputFindTime[$scope.inputFindPlace.originalPlace[i].sequenceDate].placeString = "";
                                $scope.inputFindTime[$scope.inputFindPlace.originalPlace[i].sequenceDate].place = [];
                                $scope.inputFindTime[$scope.inputFindPlace.originalPlace[i].sequenceDate].openPlace = [];
                                $scope.inputFindTime[$scope.inputFindPlace.originalPlace[i].sequenceDate].notiPlace = [];
                            }
                            $scope.inputFindTime[$scope.inputFindPlace.originalPlace[i].sequenceDate].openPlace[$scope.inputFindTime[$scope.inputFindPlace.originalPlace[i].sequenceDate].openPlace.length]={status:$scope.note[i].onPlace.status,color:$scope.note[i].onPlace.color,statusDelete:false};
                            if($scope.note[i].onPlace.status==true){
                                console.log("++++++++++++++replaceStringPlace+++++++++++++++++++");
                                console.log($scope.inputFindPlace.originalPlace[i].keyWord);
                                console.log($scope.inputFindPlace.currentPlace[i].results.name);
                                temp = temp.toString().replace($scope.inputFindPlace.originalPlace[i].keyWord,'<i class="color-green" >'+$scope.inputFindPlace.currentPlace[i].results.name+'</i>');
                            }else{
                                temp = temp.toString().replace($scope.inputFindPlace.originalPlace[i].keyWord,$scope.inputFindPlace.currentPlace[i].results.name);
                            }
                            $scope.note.contentOriginal  = $scope.note.contentOriginal.replace($scope.inputFindPlace.originalPlace[i].keyWord,$scope.inputFindPlace.currentPlace[i].results.name);
                            $scope.inputFindTime[$scope.inputFindPlace.originalPlace[i].sequenceDate].input = $scope.inputFindTime[$scope.inputFindPlace.originalPlace[i].sequenceDate].input.replace($scope.inputFindPlace.originalPlace[i].keyWord,$scope.inputFindPlace.currentPlace[i].results.name);
                            $scope.inputFindPlace.currentPlace[i].keyWord = $scope.inputFindPlace.currentPlace[i].results.name;
                            $scope.inputFindPlace.originalPlace[i] = $scope.inputFindPlace.currentPlace[i];
                            AppModules.place.originalPlace[i] = AppModules.place.currentPlace[i];
                            $scope.inputFindTime[$scope.inputFindPlace.originalPlace[i].sequenceDate].place.push($scope.inputFindPlace.originalPlace[i]);
                            $scope.inputFindTime[$scope.inputFindPlace.originalPlace[i].sequenceDate].placeString = $scope.inputFindTime[$scope.inputFindPlace.originalPlace[i].sequenceDate].placeString + $scope.inputFindPlace.currentPlace[i].results.name;
                            $scope.inputFindTime[$scope.inputFindPlace.originalPlace[i].sequenceDate].notiPlace.push(false);
                            console.log($scope.inputFindTime[$scope.inputFindPlace.originalPlace[i].sequenceDate].placeString);
                            if($scope.inputFindPlace.currentPlace.length>1&&i!=$scope.inputFindPlace.currentPlace.length-1&&$scope.inputFindTime[$scope.inputFindPlace.originalPlace[i].sequenceDate].placeString!=""){
                                $scope.inputFindTime[$scope.inputFindPlace.originalPlace[i].sequenceDate].placeString =  $scope.inputFindTime[$scope.inputFindPlace.originalPlace[i].sequenceDate].placeString +",";  
                            }
                        
                    }
                    AppModules.note.content= temp;
                    DatabaseService.updateNote(AppModules.dictionary);
                } 
            }                                                                                                                                              
        }else{                                                                                      
        }
        AppModules.note.contentOriginal = $scope.note.contentOriginal;
        console.log($scope.inputFindTime);
        if($scope.oldPath=="app.newNote"){
            if(AppModules.listNote.length==0){
                console.log("firstTime");
                $scope.results = {statusDelete:false,sequence:0,content:{analysis:AppModules.note.analysis,content:AppModules.note.content,contentOriginal:AppModules.note.contentOriginal,title:AppModules.note.title},resultsTimeAndPlace:$scope.inputFindTime}; 
            }else{

                console.log("secondTime-->"+(AppModules.lastSequence+1));
                 $scope.results = {statusDelete:false,sequence:(AppModules.lastSequence+1),content:{analysis:AppModules.note.analysis,content:AppModules.note.content,contentOriginal:AppModules.note.contentOriginal,title:AppModules.note.title},resultsTimeAndPlace:$scope.inputFindTime};
            }
            console.log($scope.results);

            
           DatabaseService.addNote({noteList:$scope.results}).then(function(data){
                    $dataServ.getData(callbackDataNote);
                       
            });
        }else{

            $scope.results = {statusDelete:false,sequence:AppModules.listNote[AppModules.noteIndex].noteList.sequence,content:{analysis:AppModules.note.analysis,content:AppModules.note.content,contentOriginal:AppModules.note.contentOriginal,title:AppModules.note.title},resultsTimeAndPlace:$scope.inputFindTime};      
            AppModules.listNote[AppModules.noteIndex].noteList  = $scope.results;
            AppModules.note = $scope.results.content;
            $scope.editNote =  JSON.parse(JSON.stringify(AppModules.listNote[AppModules.noteIndex]));
            DatabaseService.initDB();
            DatabaseService.updateNote($scope.editNote);
            $timeout(function(){
                $state.go("app.contentNote",{noteIndex:AppModules.noteIndex});
            },500)
        }  
        console.log(AppModules.listNote);   

    });
    $scope.$on("back", function(data){
        if($scope.oldPath=="app.newNote"){
            console.log(AppModules.tempNote);
            $state.go("app.newNote");
        }else{
            AppModules.note = AppModules.tempNote;
            $state.go("app.editNote",{noteIndex:$stateParams.noteIndex});
        }
    });


    function callbackDataNote(data){
        $state.go("app.home");
        /*$notificationServ.setNotiStatus(data,callBackSetNoti);
        if($scope.note.connected == true){
            firebaseServ.syncFirebase(data,AppModules.authenInfo.userInfo.authen.email,AppModules.authenInfo.userInfo.authen.password,callbackSyn)
        } */  
    }
    function callbackSyn(res){     
        /*$state.go("app.home");*/
    }
    function callBackSetNoti(){
         $state.go("app.home");
    }
    
}


});