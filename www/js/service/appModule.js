angular.module('moduleControlles')
.run(function(AppModules) {
        console.info('AppModules ready !!');
}).value("AppModules", {
        place:null,
        inputFindTime:[],
        inputFindPlace:[],
        note:null,
        path:null,
        oldPath:null,
        listNote:[],
        title : "",
        notiPlace:[],
        caretPosition:null,
        authenInfo:null,
        listNote:[],
        statusAuthen:false,
        statusEditNote:0,
        lastSequence:0,
        setting:{},
        tempNote:[],
        tempOriginal:[],
        position:{},
        dictionary:{},
        firstTime:false,
        indexDelete:0,
        itemDelete:null,
        noteIndex:null,
        checkTrack:false,
        count:0

        
}).service('AppModuleService', function($http, $rootScope, AppModules, AVALabel, $ionicPopup, $ionicLoading,
        IonicClosePopupService, CartModules, UtilsModules) {
        return {
        
        }
})