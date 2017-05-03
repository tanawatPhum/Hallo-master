angular.module('moduleControlles')
.service('$loadingServ',function($ionicLoading) {
    this.openLoading = function(){
        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles" class="spinner-calm"></ion-spinner>',
            duration: 400
            }).then(function(){
            console.log("The loading indicator is now displayed");
        });
    }
    this.openLongLoading = function(){
        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles" class="spinner-calm"></ion-spinner>',
            duration: 2000
            }).then(function(){
            console.log("The loading indicator is now displayed");
        });
    }
    this.closeLoading = function(){
        $ionicLoading.hide().then(function(){
            console.log("The loading indicator is now hidden");
        });

    }
});