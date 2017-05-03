angular.module('moduleControlles')
.controller("submoduleCtrl", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,$ionicTabsDelegate) {
    $scope.note = [];
    $scope.json ={};
    $scope.note.inputPlace = "โรบินสัน";
    $scope.note.inputNote = "โร";
    $scope.checkExistPlaceInjson = false;
    $scope.submit = function(){
        var a = $scope.note.inputNote;
        var b = $scope.note.inputPlace;
       if(!($scope.json.hasOwnProperty(a))){
           $scope.json[a] = [{place:b,count:1}];
         
       }else{
           for(var i=0;i<$scope.json[a].length;i++){
               if($scope.json[a][i].place==$scope.note.inputPlace){
                    $scope.checkExistPlaceInjson
                    $scope.json[a][i].count++; 
                    $scope.checkExistPlaceInjson = true;
                    break;
                }else{
                    console.log("not same");
                }
           }
           if($scope.checkExistPlaceInjson==false){
                $scope.json[a].push({place:b,count:1});
           }
           $scope.checkExistPlaceInjson==false;
       }
        console.log($scope.json);
       
    }

    $scope.seach = function(){
        var keyWord = $scope.note.seachPlace;
        var mostSeach = 0;
        for(var i=0;i<$scope.json[keyWord].length;i++){
            if(mostSeach<$scope.json[keyWord][i].count){
                mostSeach = $scope.json[keyWord][i].count;
                $scope.note.result = $scope.json[keyWord][i].place;
            }
        }
        console.log($scope.note.result);



    }
 

});