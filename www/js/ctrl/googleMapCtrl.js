angular.module('moduleControlles')
.controller("googleMapCtrl", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,$ionicTabsDelegate,AppModules,$timeout,$cordovaGeolocation) {
    console.log("welcome to googleMapCtrl");
    console.log($stateParams.place);
    var places="";
    var markers = [];
    console.log($stateParams.place);

    $scope.drawMap = function() {
       /* var pyrmont = {lat:13.7500,lng:	100.5167}*/
        
        if($stateParams.place.length==0){
            console.log(AppModules.position.lat);
            console.log(AppModules.position.lng);
            var pyrmont={lat:AppModules.position.lat,lng:AppModules.position.lng};
        }else{
            var pyrmont = $stateParams.place.geometry.location;
        }
        var map = new google.maps.Map(document.getElementById('map'), {
            disableDefaultUI: true,
            center: pyrmont,
            zoom: 15
        });
        if($stateParams.place.length==0){
        var marker = new google.maps.Marker({
                position: pyrmont,
                map: map
            });
            
        
        }else{
            if(AppModules.path=="app.analysisNote"){
            if(places==""){
                places = $stateParams.place;
                    console.log(places.geometry.location);
                    var placeLoc = places.geometry.location;
                    marker = new google.maps.Marker({
                        draggable:true,
                        map: map,
                        position: places.geometry.location
                    });    
                }
            }
        }
        var input = document.getElementById('pac-input');
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function() {
              searchBox.setBounds(map.getBounds());
            });

          
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function() {
              if(AppModules.path=="app.analysisNote"){
                  marker.setMap(null);
              }
              places = searchBox.getPlaces();

              if (places.length == 0) {
                return;
              }

              // Clear out the old markers.
              markers.forEach(function(marker) {
                marker.setMap(null);
              });
              markers = [];

              // For each place, get the icon, name and location.
              var bounds = new google.maps.LatLngBounds();
              places.forEach(function(place) {
                if (!place.geometry) {
                  console.log("Returned place contains no geometry");
                  return;
                }
                var icon = {
                  url: place.icon,
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                  map: map,
                  title: place.name,
                  position: place.geometry.location
                }));

                if (place.geometry.viewport) {
                  // Only geocodes have viewport.
                  bounds.union(place.geometry.viewport);
                } else {
                  bounds.extend(place.geometry.location);
                }
              });
              map.fitBounds(bounds);
        });
        
    };

    $timeout(function(){ $scope.drawMap(); }, 500); 
        $scope.$on("forward", function(data){
          if(AppModules.path=="app.analysisNote"){
              console.log(places);
              if(places!=""&&$stateParams.place.name!=places.name){
                $state.go("app.analysisNote",{place:places,index:$stateParams.index,status:"success"});
              }else{
                $state.go("app.analysisNote",{status:"not change"});
              }
          }else if(AppModules.path=="app.editNote"){
              $state.go("app.editNote",{place:places,noteIndex:$stateParams.noteIndex}); 
          }else if(AppModules.path=="app.newNote"){
              $state.go("app.newNote",{place:places}); 
          }  
    });

    $scope.$on("back", function(data){
        if(AppModules.path=="app.analysisNote"){
            $state.go("app.analysisNote",{status:"back"});
        }
        else if(AppModules.path=="app.editNote"){
            $state.go("app.editNote",{noteIndex:$stateParams.noteIndex}); 
        }else if(AppModules.path=="app.newNote"){
            $state.go("app.newNote",{place:places}); 
        }  
           
    });

});