angular.module('moduleControlles')
.controller("newNoteCtrl", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,$ionicTabsDelegate,$timeServ,$googleServ,AppModules,$loadingServ,$operandServ,$timeout,$rootScope,$ionicPopup,DatabaseService,$internetServ) {
    console.log("welcome to newNoteCtrl");
      $ionicPlatform.ready(function() {
        DatabaseService.initDB();
    })
    $scope.note  = [];
    $scope.note  = AppModules.tempNote;
    /*$scope.note.content = "วันนี้ ตอนเช้า ไป ม.เกษตรศรีราชา";*/
    /*$scope.note.content ="เลย์ ห่อใหญ่ นมกล่องใหญ่ กาแฟ 1 กล่อง วันศุกร์ 9 โมง เทสโก้ โลตัส สาขาแหลมฉบัง";*/
    /*$scope.note.content  = "วันอังคาร ที่ 3.35 ไป"*/
    /*$scope.note.content = "วันจันทร์ ไปกินข้าวตอน 10.45 11 โมง โรบินสัน วันอาทิตย์ 8 โมง เรียนสัมนา มหาลัยเกษตร ศรีราชา ไปเที่ยวทะเลพัทยา,ไหว้พระ พุทธมน 18.00";*/
  
    $scope.note.analysis = {color:AppModules.setting.setting.system.analysis.color,status:AppModules.setting.setting.system.analysis.status,icon:AppModules.setting.setting.system.analysis.icon};
    
      console.log(AppModules.setting);
    AppModules.path = "app.newNote";
    AppModules.oldPath = "app.newNote";
    $scope.listPlace = [];
    console.log($stateParams.place);
    if($stateParams.place.length!=0){
        var placeString = $stateParams.place[0].name;
        placeString = placeString.replace(" ","");
        $stateParams.place[0].name = placeString;
        $scope.note = AppModules.note;
        if(AppModules.place!=undefined){
            $scope.listPlace = AppModules.place;
            console.log($scope.listPlace);
        }
         $timeout(function(){
            $scope.setSelectionRange(document.getElementById("myTextArea"), AppModules.caretPosition, AppModules.caretPosition); 
         },300)
        
        $timeout(function(){
            $rootScope.$broadcast('add',$stateParams.place[0].name);
        }, 500);

        
        /*$scope.note.content =  $scope.note.content.toString() + " "+$stateParams.place[0].name+" ";*/
        $scope.listPlace.push($stateParams.place[0]);
        AppModules.place = $scope.listPlace;
        console.log(AppModules.place);

    }else{
        AppModules.caretPosition = 0;
    }
    $scope.editText = function(){
        console.log($scope.note.title);
    }


 


    $scope.$on("forward", function(data){
        if(document.getElementById("myTextArea").value!=""){
            if($scope.note.title==undefined){
                $scope.note.title = "โน๊ตของฉัน";
            }
            AppModules.note=[];
            AppModules.inputFindTime = [];
            AppModules.inputFindPlace = [];
            AppModules.tempNote = [];
            AppModules.title = null;
            AppModules.tempOriginal =[];


            $scope.note.placeFromGmapNewNote = $scope.listPlace;
            $scope.note.contentOriginal = document.getElementById("myTextArea").value;
            $scope.note.content = document.getElementById("myTextArea").value;
            
            AppModules.note = $scope.note;
            AppModules.tempNote = AppModules.note;

            if($scope.note.analysis.status==true){
                $state.go("app.analysisNote");
            }else{
                $timeServ.setDaysetting(AppModules.setting.setting.time);
                $scope.inputFindTime = $timeServ.splitWordWithPlusSign($scope.note.contentOriginal);
                if(AppModules.listNote.length>0){
                    console.log(AppModules.lastSequence+1);
                    $scope.results = {statusDelete:false,sequence:(AppModules.lastSequence+1),content:{analysis:AppModules.note.analysis,content:AppModules.note.content,contentOriginal:AppModules.note.contentOriginal,title:AppModules.note.title,placeFromGmapNewNote:$scope.note.placeFromGmapNewNote},resultsTimeAndPlace:$scope.inputFindTime};
                }else{
                    $scope.results = {statusDelete:false,sequence:0,content:{analysis:AppModules.note.analysis,content:AppModules.note.content,contentOriginal:AppModules.note.contentOriginal,title:AppModules.note.title,placeFromGmapNewNote:$scope.note.placeFromGmapNewNote},resultsTimeAndPlace:$scope.inputFindTime};
                }
                 console.log($scope.results);
                
                DatabaseService.addNote({noteList:$scope.results}).then(function(){
                 $state.go("app.home");

                });
            }
            AppModules.place = [];
        }else{
                $ionicPopup.confirm({
                    title: 'คำเตือน',
                    template: '<center>ไม่มีเนื้อหาของโน๊ต<center>',
                     buttons: [
                        {
                            text: '<b>ตกลง</b>',
                            type: 'button-positive',
                        }
                    ]
                });

       
        }
    });
    $scope.goToMap=function(){
        $internetServ.status(callbackStatusInternet);
    }
     function callbackStatusInternet(status){
         if(status=="online"){
                AppModules.note = $scope.note;
                AppModules.note.content = document.getElementById("myTextArea").value;
                $state.go("app.googleMap");
            }else{
                 $ionicPopup.confirm({
                    title: 'คำเตือน',
                    template: '<center>ไม่สามารถเปิดแผนที่ได้<center>',
                     buttons: [
                        {
                            text: '<b>ตกลง</b>',
                            type: 'button-positive',
                        }
                    ]
                });
            }
        
    } 
    $scope.$on("back", function(data){
        $state.go("app.home"); 
    });
    $scope.openAnalysis = function(){
        if($scope.note.analysis.status == true){
            $scope.note.analysis.status = false;
            $scope.note.analysis.color =  "color-grey";
            $scope.note.analysis.icon = "ion-eye-disabled";
        }else{
            $scope.note.analysis.status = true;
            $scope.note.analysis.color =  "color-darkblue";
            $scope.note.analysis.icon = "ion-eye";

        }

    }
    $timeout(function(){ $operandServ.setOperand("ion-chevron-left","บันทึก",true); }, 100); 
    
    /*$scope.note.content = "test";*/
    /*focus('focusMe')*/


   


    $scope.getCursorPos = function($event) {
        var myEl = $event.target;
        $scope.doGetCaretPosition(myEl); 
    };
        
    $scope.doGetCaretPosition = function(oField) {

    // Initialize
    var iCaretPos = 0;

    // IE Support
    if (document.selection) {

    // Set focus on the element
    oField.focus ();

    // To get cursor position, get empty selection range
    var oSel = document.selection.createRange ();

    // Move selection start to 0 position
    oSel.moveStart ('character', -oField.value.length);

    // The caret position is selection length
    iCaretPos = oSel.text.length;
    }

    // Firefox support
    else if (oField.selectionStart || oField.selectionStart == '0')
        iCaretPos = oField.selectionStart;

        // Return results
        AppModules.caretPosition = iCaretPos;
    };


   
    $scope.setSelectionRange = function(input, selectionStart, selectionEnd) {
        if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
        }
        else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
        }
    };



  
  
 

})

/*
.directive('focusOn', function() {
   return function(scope, elem, attr) {
      scope.$on('focusOn', function(e, name) {
        if(name === attr.focusOn) {
          elem[0].focus();
        }
      });
   };
})

.factory('focus', function ($rootScope, $timeout) {
  return function(name) {
    $timeout(function (){
      $rootScope.$broadcast('focusOn', name);
    });
  }
});*/