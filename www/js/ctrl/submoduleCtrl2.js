angular.module('moduleControlles')
.controller("submoduleCtrl2", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,$ionicTabsDelegate,$dicServ,DatabaseService,$dataServ,AppModules) {
        $ionicPlatform.ready(function() {
            DatabaseService.initDB();
        })
        $dataServ.getData(callbackDataNote);
        function callbackDataNote(data){
            $scope.listNote = JSON.parse(JSON.stringify(data));
            console.log($scope.listNote);
            processSetDefault();

        }
        function processSetDefault(){
            for(var i =0;i<$scope.listNote.length;i++){
                if($scope.listNote[i].hasOwnProperty('listWord')){
                    AppModules.dictionary = $scope.listNote[i];

                    
                    /*console.log($dicServ.searchData("วันนี้ไปโรบินสันและมหาลัยเกษตรศรีราชา"));*/
                    $scope.listNote.splice(i,1);
                    break;
                }
            }

        }
        

 

});