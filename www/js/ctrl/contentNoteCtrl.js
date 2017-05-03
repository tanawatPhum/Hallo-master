angular.module('moduleControlles')
.controller("contentNoteCtrl", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,$ionicTabsDelegate,AppModules,$loadingServ,$operandServ,$ionicPopup,DatabaseService,$dataServ) {
    console.log("welcome to contentNoteCtrl"); 
 
    $operandServ.setOperand("ion-android-close","แก้ไข",true);
 
    $scope.note=AppModules.note;
    $scope.note.content = AppModules.note.content;
    $scope.note.title = AppModules.note.title;
    AppModules.path = "app.contentNote"; 
    $scope.listNote  = AppModules.listNote;
    console.log($stateParams.noteIndex);
    console.log(AppModules.note);
    $scope.$on("forward", function(data){
        AppModules.noteIndex =  $stateParams.noteIndex;
        console.log($stateParams.noteIndex);
        AppModules.note = $scope.note;
        $state.go("app.editNote",{noteIndex:$stateParams.noteIndex}); 
    });
    $scope.$on("back", function(data){
        $state.go("app.home",{noteIndex:$stateParams.noteIndex}); 
    });

    
  
    
  

   


});