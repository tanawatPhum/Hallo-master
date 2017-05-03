angular.module('moduleControlles')
.service('$dicServ',function($ionicLoading,DatabaseService,$rootScope,$timeout,$ionicPlatform,AppModules) {
        this.setData = function(keyWord,place){
            console.log("++++++++++++++++++setDataDic++++++++++++++++++++++");
            var checkExistPlaceInjson = false;
            if(!(AppModules.dictionary.listWord.hasOwnProperty(keyWord))){
                AppModules.dictionary.listWord[keyWord] = [{place:place,count:1}];
                
            }else{
                for(var i=0;i<AppModules.dictionary.listWord[keyWord].length;i++){
                    if(AppModules.dictionary.listWord[keyWord][i].place.name==place.name){
                            AppModules.dictionary.listWord[keyWord][i].count++; 
                            checkExistPlaceInjson = true;
                            break;
                        }else{
                            console.log("not same");
                        }
                }
                if(checkExistPlaceInjson==false){
                        AppModules.dictionary.listWord[keyWord].push({place:place,count:1});
                }
                checkExistPlaceInjson==false;
            }
            
  
        }
        this.getData = function(keyWord){
            var mostSeach = 0;
            var result = null;
            console.log(AppModules.dictionary);
            if(AppModules.dictionary.listWord.hasOwnProperty(keyWord)){
                for(var i=0;i<AppModules.dictionary.listWord[keyWord].length;i++){
                    if(mostSeach<AppModules.dictionary.listWord[keyWord][i].count){
                        mostSeach = AppModules.dictionary.listWord[keyWord][i].count;
                        result = AppModules.dictionary.listWord[keyWord][i].place;
                    }
                }
            }
            return result;
        }
        
        this.searchData = function(input,callback){
console.log("++++++++++++++++++searchDataDic++++++++++++++++++++++");
            var result = [];
            angular.forEach(AppModules.dictionary.listWord, function(value, key) {
                var pattern =  new RegExp(key);
                var mosSearch = 0;
                var place = null;
                var matchText = null;
                for(var i=0;i<AppModules.dictionary.listWord[key].length;i++){
                    if(pattern.test(input)){
                        matchText = input.match(pattern);
                        console.log(matchText);
                        if(i==0){
                            mosSearch =AppModules.dictionary.listWord[key][i].count;
                            place = AppModules.dictionary.listWord[key][i].place;
                        }else{
                            if(mosSearch<AppModules.dictionary.listWord[key][i].count){
                                mosSearch = AppModules.dictionary.listWord[key][i].count;
                                place = AppModules.dictionary.listWord[key][i].place;
                            }
                        }

                    }
                }
                if(place!=null){
                    result.push({detail:place,keyWord:matchText[0]});
                } 
            });
      
            return callback(result);
        }




})