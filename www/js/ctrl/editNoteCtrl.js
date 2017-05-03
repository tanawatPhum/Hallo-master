angular.module('moduleControlles')
.controller("editNoteCtrl", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,$ionicTabsDelegate,AppModules,$loadingServ,$operandServ,$timeout,$rootScope,$timeServ,DatabaseService,$internetServ,$ionicPopup) {
    console.log("welcome to editNoteCtrl");
    $scope.$on('$ionicView.enter', function(event, toState, toParams, fromState, fromParams) {
        AppModules.operation = "เรียบร้อย";
    });
    
    $operandServ.setOperand("ion-chevron-left","บันทึก",true);

    if(AppModules.path=="app.analysisNote"){
         $scope.note= JSON.parse(JSON.stringify(AppModules.tempNote));
    }else{
        AppModules.tempOriginal = JSON.parse(JSON.stringify(AppModules.note));
        $scope.note= JSON.parse(JSON.stringify(AppModules.note));
    }
    AppModules.path = "app.editNote";
    AppModules.oldPath  = "app.editNote";
    AppModules.place = [];
    $scope.listPlace = [];
    
    console.log(AppModules.note);


    $scope.note.analysis = AppModules.note.analysis;

    if($stateParams.place.length!=0){
        var placeString = $stateParams.place[0].name;
        placeString = placeString.replace(" ","");
        $stateParams.place[0].name = placeString;
        console.log($stateParams.place[0]);
        $scope.note.contentOriginal = AppModules.note.contentOriginal;
        if(AppModules.place.length>0){
            $scope.listPlace = AppModules.place;
        }else{
            $scope.listPlace =[];
        }
        $timeout(function(){
            $scope.setSelectionRange(document.getElementById("editTextArea"), AppModules.caretPosition, AppModules.caretPosition); 
         },300)
        
        $timeout(function(){
            $rootScope.$broadcast('add',$stateParams.place[0].name);
        }, 500);
        $scope.listPlace.push($stateParams.place[0]);
        AppModules.place = $scope.listPlace;
        console.log(AppModules.place);
    }
    $scope.goToMap=function(){
        $internetServ.status(callbackStatusInternet);
    }
    function callbackStatusInternet(status){
         if(status=="online"){
                AppModules.note = $scope.note;
                AppModules.note.contentOriginal = document.getElementById("editTextArea").value;
                $state.go("app.googleMap",{noteIndex:$stateParams.noteIndex});
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
     $scope.$on("forward", function(data){
        
        
        if($scope.note.hasOwnProperty('placeFromGmapNewNote')){
            if($scope.note.placeFromGmapNewNote.length!=0){
                for(var i=0;i<AppModules.place.length;i++){
                    console.log("+++++existPlace+++++");
                    $scope.note.placeFromGmapNewNote.push(AppModules.place[i]);
                }
            }else{
                console.log("+++++emptyPlace+++++");
                $scope.note.placeFromGmapNewNote = AppModules.place;
            }
        }else{
                console.log("+++++emptyPlace+++++");
                $scope.note.placeFromGmapNewNote = AppModules.place;
        }  
        console.log($scope.note.placeFromGmapNewNote);
        
        $scope.note.contentOriginal = document.getElementById("editTextArea").value;
        $scope.note.content = document.getElementById("editTextArea").value;

        AppModules.tempNote = JSON.parse(JSON.stringify($scope.note));
        AppModules.note = $scope.note;

       if($scope.note.analysis.status==true){
            $state.go("app.analysisNote",{noteIndex:$stateParams.noteIndex});
        }else{
            $timeServ.setDaysetting(AppModules.setting.setting.time);
            $scope.inputFindTime = $timeServ.splitWordWithPlusSign($scope.note.contentOriginal);
            $scope.results = {statusDelete:AppModules.listNote[$stateParams.noteIndex].noteList.statusDelete,sequence:AppModules.listNote[$stateParams.noteIndex].noteList.sequence,content:{analysis:AppModules.note.analysis,content:AppModules.note.content,contentOriginal:AppModules.note.contentOriginal,placeFromGmapNewNote:$scope.note.placeFromGmapNewNote,title:AppModules.note.title},resultsTimeAndPlace:$scope.inputFindTime};  
            console.log(AppModules.listNote[$stateParams.noteIndex]);
            AppModules.listNote[$stateParams.noteIndex].noteList  = $scope.results;
            AppModules.note = $scope.results.content;
            
            DatabaseService.updateNote(AppModules.listNote[$stateParams.noteIndex]).then(function(){
                 $state.go("app.contentNote",{noteIndex:$stateParams.noteIndex});
            });
        }
    });

    
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


    $scope.$on("back", function(data){
        if(AppModules.tempNote!=null){
            console.log(AppModules.tempOriginal);
            AppModules.note = AppModules.tempOriginal;
            AppModules.tempNote = null;
        }
        $state.go("app.contentNote",{noteIndex:$stateParams.noteIndex}); 
    });
  

});