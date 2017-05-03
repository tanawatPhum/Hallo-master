// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','moduleControlles','ion-datetime-picker','firebase','ngCordova','angular-bind-html-compile'])

.run(function($ionicPlatform,$rootScope,$loadingServ,$ionicHistory,$ionicLoading) {
 $rootScope.$on('loading:show', function () {
    $ionicLoading.show({
        template:'<ion-spinner icon="bubbles" class="spinner-calm"></ion-spinner>',
        duration: 400
    })
});

$rootScope.$on('loading:hide', function () {
    /*$ionicLoading.hide();*/
});

$rootScope.$on('$stateChangeStart', function () {
    console.log('please wait...');
    $rootScope.$broadcast('loading:show');
});

$rootScope.$on('$stateChangeSuccess', function () {
    console.log('done');
    $rootScope.$broadcast('loading:hide');
});



  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider,$urlRouterProvider){
    $stateProvider.state('app',{
      url:'/app',
      abstract: true,
      cache: false,
      templateUrl: 'templates/templates.html',
      controller: 'templatesCtrl',  
    }) 
    .state('login',{
      url:'/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    }) 
    .state('register',{
      url:'/register',
      templateUrl: 'templates/register.html',
      controller: 'registerCtrl',
      params:{place:[]}
    }) 
    .state('app.home',{
      url:'/home',
      cache: false,
      views:{
        'content':{
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      },
      
    })
    .state('app.analysisNote',{
      url:'/analysisNote',
      cache: false,
      views:{
        'content':{
          templateUrl: 'templates/analysisNote.html',
          controller: 'analysisNoteCtrl',
    
        }
      },
      params:{place:[],index:{},status:{},noteIndex:{}}
    })
    .state('app.newNote',{
      url:'/newNote',
      cache: false,
      views:{
        'content':{
          templateUrl: 'templates/newNote.html',
          controller: 'newNoteCtrl'
        }
      },
      params:{place:[]}
      
    })
    .state('app.contentNote',{
      url:'/contentNote',
      cache: false,
      views:{
        'content':{   
          templateUrl: 'templates/contentNote.html',
          controller: 'contentNoteCtrl',
          
        }
      },
      params:{place:[],noteIndex:{}}
      
    })
    .state('app.editNote',{
      url:'/editNote',
      cache: false,
      views:{
        'content':{   
          templateUrl: 'templates/editNote.html',
          controller: 'editNoteCtrl',
          
          
        }
      },
      params:{place:[],noteIndex:{}}
      
    })
    .state('app.googleMap',{
      url:'/googleMap',
      cache: false,
      views:{
        'content':{   
          templateUrl: 'templates/googleMap.html',
          controller: 'googleMapCtrl',
        }
      },
      params:{place:[],index:{},noteIndex:{}}
      
    })
     .state('app.placeHome',{
      url:'/placeHome',
      cache: false,
      views:{
        'content':{   
          templateUrl: 'templates/placeHome.html',
          controller: 'placeHomeCtrl',
        }
      },      
    })
    .state('app.myAccount',{
      url:'/myAccount',
      cache: false,
      views:{
        'content':{   
          templateUrl: 'templates/myAccount.html',
          controller: 'myAccountCtrl',
        }
      },      
    })
    .state('app.setting',{
      url:'/setting',
      cache: false,
      views:{
        'content':{   
          templateUrl: 'templates/setting.html',
          controller: 'settingCtrl',
        }
      },      
    })
    .state('reset',{
      url:'/reset',
      cache: false,
      templateUrl: 'templates/reset.html',
      controller: 'resetCtrl',
       
    })

  
  

     
    .state('submodule',{
        url:'/submodule',
        templateUrl: 'templates/submodule.html',
        controller: 'submoduleCtrl'
    })
    .state('submodule2',{
        url:'/submodule2',
        templateUrl: 'templates/submodule2.html',
        controller: 'submoduleCtrl2'
    })
   
    
    

    $urlRouterProvider.otherwise(function($injector,$rootScope,$ionicPlatform,$dataServ,AppModules){
        var listData =[];
        var $state = $injector.get('$state');
        /*$injector.get("$dataServ").getData(checkAuten);*/
        
        ionic.Platform.ready(function(){
            $injector.get("DatabaseService").initDB();
            $injector.get("DatabaseService").getAllNote().then(function(data){
              console.log("++++++++++++++++++++init state++++++++++++++++++")
              console.log(data);
              checkAuten(data);
            })
        })
      
              /*
              listData = JSON.parse(JSON.stringify(newValue));
                $injector.get("$rootScope").$watchCollection( 
                    function () {
                        return data;
                    },
                    function ( newValue, oldValue ) {    
                        listData =[];
                        listData = JSON.parse(JSON.stringify(newValue));
                        console.log(listData);
                        checkAuten();                
                    },true
                );
            })
        })*/
        function checkAuten(data){
            var i=0;
            var authen = false;
              while(i<data.length){
                  if(data[i].hasOwnProperty('userInfo')){
                      authen = true;
                      break;
                  }else{
                      authen = false;
                  }
                  i++;
              }
              if(authen==true){
                $state.go("app.home");
              }else{
                $state.go("login");
              }

            }

        
    });
    /*$urlRouterProvider.otherwise('app/home')*/

})

/*
.directive('contenteditable', ['$sce', function($sce) {
  return {
  restrict: 'A',
  require: '?ngModel', 
  link: function(scope, element, attrs, ngModel) {
      if (!ngModel) return; 
      ngModel.$render = function() {
        element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
        read(); 
      };
      element.on('blur keyup change', function() {
        scope.$evalAsync(read);
      });
      function read() {
        var html = element.html();
    
        if ( attrs.stripBr && html == '<br>' ) {
          html = '';
        }
        ngModel.$setViewValue(html);
      }
    }
  };
}])*/
.directive('myText', ['$rootScope', function($rootScope) {
  return {
    link: function(scope, element, attrs) {
      $rootScope.$on('add', function(e, val) {
        var domElement = element[0];
        console.log(domElement.selectionStart);
        if (document.selection) {
          domElement.focus();
          var sel = document.selection.createRange();
          sel.text = val;
          domElement.focus();
        } else if (domElement.selectionStart || domElement.selectionStart === 0) {
          var startPos = domElement.selectionStart;
          var endPos = domElement.selectionEnd;
          var scrollTop = domElement.scrollTop;
          domElement.value = " "+domElement.value.substring(0, startPos) + val + domElement.value.substring(endPos, domElement.value.length);
          domElement.focus();
          domElement.selectionStart = startPos + val.length;
          domElement.selectionEnd = startPos + val.length;
          domElement.scrollTop = scrollTop;
        } else {
          domElement.value += val;
          domElement.focus();
        }

      });
    }
  }
}])

