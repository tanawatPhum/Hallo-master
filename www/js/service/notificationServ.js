angular.module('moduleControlles')
.service('$notificationServ',function($ionicLoading,$rootScope,DatabaseService,$cordovaGeolocation,AppModules) {
       this.setNotiTime = function(dataNoti,listIndexOfnotiTime,listNote,callback){
           console.log("noti");
           console.log(dataNoti);

           document.addEventListener('deviceready', function () {           
                DatabaseService.initDB();
                cordova.plugins.notification.local.schedule(dataNoti)
                for(var i=0;i<listIndexOfnotiTime.length;i++){
                    DatabaseService.updateNote(listNote[listIndexOfnotiTime[i]]); 
                }
                
               /* callback();*/
           
           });
              callback();
       }

        this.setNotiTrack  = function(data){
           /* document.addEventListener('deviceready', onDeviceReady, false);
            function onDeviceReady () {
                cordova.plugins.notification.local.clear(1000, function() {
                    cordova.plugins.notification.local.schedule({
                        id: 1000,
                        title: "ระบบติดตาม",
                        text: "กำลังติดตามคุณอยู่",
                        every: "year",
                        icon: "res://androidlocate.png",
                        autoClear:false,
                        ongoing:true,
                        sound:null,
                        vibration: false,
                    });
                })

     
            }*/

        }
        this.setNotiPlace = function(listNote,currentDate,callback){
            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            var data = [];
            var generator;
            var id;
            $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                AppModules.position = {lat:position.coords.latitude,lng:position.coords.longitude}
         /* console.log("lat-->"+position.coords.latitude);
                    console.log("long-->"+position.coords.longitude);*/
                    var listNotiPlace =[];
                   /* AppModules.count++;
                    console.log(AppModules.count);*/
                    /*console.log(AppModules.notiPlace);*/
                for(var x = 0 ;x<AppModules.notiPlace.length;x++){
                        var dist = distance(position.coords.latitude,position.coords.longitude,AppModules.notiPlace[x].lat,AppModules.notiPlace[x].lng,'K',AppModules.notiPlace[x].name)*1000;
                        if(AppModules.notiPlace[x].openPlace!=false){
                            /*console.log(AppModules.notiPlace[i].openPlace);*/
                            AppModules.notiPlace[x].diffCurrentDistance = dist;
                        }

            
                                var statusNoti =AppModules.notiPlace[x].statusNoti;
                                var statusDelete =AppModules.notiPlace[x].statusPlace;
                                var dateNotiPlace =  JSON.parse(JSON.stringify(AppModules.notiPlace[x].date));
                                /*console.log(dateNotiPlace);*/
                                dateNotiPlace = moment(dateNotiPlace);
                                dateNotiPlace = AppModules.notiPlace[x].date.set({hour:0,minute:0,second:0,millisecond:0}).valueOf();
                                  
                               /* console.log(dist);
                                console.log(statusNoti);
                                console.log(statusDelete);
                                console.log(dateNotiPlace);
                                console.log(AppModules.notiPlace);
                                console.log(listNote);*/
                                    if(currentDate==dateNotiPlace&&AppModules.notiPlace[x].openPlace!=false){
                                       data.push(AppModules.notiPlace[x]);
                                        /*console.log(AppModules.notiPlace);*/
                                       
                                        if(dist<500&&statusNoti==false&&statusDelete==false&&AppModules.notiPlace[x].openPlace!=false){
                                           
                                            console.log("++++++++++++++++++++notiPushPlace++++++++++++++++++++");
                                            console.log("noti");
                                            AppModules.notiPlace[x].statusNoti = true;
                                            /*for(var i=0;i<listNote.length;i++){
                                                if(listNote[i].hasOwnProperty('noteList')&&listNote[i].noteList.statusDelete!=true){
                                                    if(listNote[i].noteList.sequence==AppModules.notiPlace[x].sequence){
                                                        for(var j=0;j<listNote[i].noteList.resultsTimeAndPlace.length;j++){
                                                            for(var k=0;k<listNote[i].noteList.resultsTimeAndPlace[j].notiPlace.length;k++){
                                                                listNote[i].noteList.resultsTimeAndPlace[j].notiPlace[k] = true;4
                                                            }
                                                        }*/
                                                        var i = AppModules.notiPlace[x].index.i;
                                                        var j =AppModules.notiPlace[x].index.j;
                                                        var k =AppModules.notiPlace[x].index.k;
                                                        generator = new IDGenerator();
                                                        id = parseInt(listNote[i].noteList.sequence.toString()+generator.generate().toString())
                                                        listNote[i].noteList.resultsTimeAndPlace[j].notiPlace[k] = true;
                                                        DatabaseService.updateNote(JSON.parse(JSON.stringify(listNote[i])))
                                                       console.log(id);
                                                        cordova.plugins.notification.local.schedule({
                                                                id: id,
                                                                title: AppModules.notiPlace[x].title,
                                                                text: AppModules.notiPlace[x].keyWord,
                                                                icon: "res://pin.png"
                                                        });
                                                        
                                                        /*listNotiPlace.push({
                                                                id: id,
                                                                title: AppModules.notiPlace[x].title,
                                                                text: AppModules.notiPlace[x].keyWord,
                                                                icon: "res://pin.png"
                                                        });*/
                                                   /*}*/
                                                }
                                               /* console.log(AppModules.notiPlace);
                                                console.log(listNote);*/
                                               
                                    /*}*/
                                            /*listNote[AppModules.notiPlace[x].index.i].noteList.resultsTimeAndPlace[AppModules.notiPlace[x].index.j].notiPlace[AppModules.notiPlace[x].index.k] = true;
                                            DatabaseService.updateNote(listNote[AppModules.notiPlace[x].index.i]);*/
                                        
                                            
                                            document.addEventListener('deviceready', onDeviceReady, false);
                                            function onDeviceReady () {

                                                    /*cordova.plugins.notification.local.schedule(listNotiPlace);*/
                                                

                                            }

                                          
                                                /*cordova.plugins.notification.local.schedule({
                                                            id: id,
                                                            title: AppModules.notiPlace[x].title,
                                                            text: AppModules.notiPlace[x].keyWord,
                                                });*/
                                           
                                    
                                  
                                    
                                    /*}*/
                          
                        }
                }

                callback(data,"openGps");
                
            }, function(err) {
    
                callback(data,"closeGps");

            });
           
        }
        function distance(lat1, lon1, lat2, lon2, unit,name) {
                    var radlat1 = Math.PI * lat1/180
                    var radlat2 = Math.PI * lat2/180
                    var theta = lon1-lon2
                    var radtheta = Math.PI * theta/180
                    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                    dist = Math.acos(dist)
                    dist = dist * 180/Math.PI
                    dist = dist * 60 * 1.1515
                    if (unit=="K") { dist = dist * 1.609344 }
                    if (unit=="N") { dist = dist * 0.8684 }
                    /*console.log("lat1, lon1-->"+lat1+"|"+lon1);
                    console.log("lat2, lon2-->"+lat2+"|"+lon2);
                    console.log(dist);*/
                    return dist
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
     this.setNotiStatus=function(listNote,callback){
         if(listNote.length>0){
            for(var i =0;i<listNote.length;i++){
                if(listNote[i].hasOwnProperty('noteList')){
                    console.log(listNote[i]);
                for(var j=0;j<listNote[i].noteList.resultsTimeAndPlace.length;j++){
                     if(listNote[i].noteList.content.analysis.status==true){
                        for(var k=0;k<listNote[i].noteList.resultsTimeAndPlace[j].output.length;k++){       
                                timeBeforeNoti = moment(AppModules.setting.setting.time.noti);
                                timeNoti = JSON.parse(JSON.stringify(listNote[i].noteList.resultsTimeAndPlace[j].output[k]));
                                timeNoti = moment(timeNoti).set({second:0,millisecond:0}).subtract(timeBeforeNoti.hour(),"hours");
                                timeNoti = moment(timeNoti).set({second:0,millisecond:0}).subtract(timeBeforeNoti.minute(),"minute");
                                currentDate = moment().set({second:0,millisecond:0})
                                if(timeNoti.valueOf()>currentDate){
                                    console.log(listNote[i]);
                                    listNote[i].noteList.resultsTimeAndPlace[j].notiTime[k] = false;
                                    DatabaseService.updateNote(listNote[i]);
                                }
                            }

                        }
                    }
                }
                if(i==listNote.length-1){
                    callback();
                }
            }
         }else{
             callback();
         }
       
     }


         
    
})