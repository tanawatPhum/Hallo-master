angular.module('moduleControlles')
.controller("resetCtrl", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,$ionicTabsDelegate,DatabaseService,firebaseServ,$ionicPopup) {
    $scope.reset = [];  
    $scope.reset =function(){
        firebaseServ.resetPassword($scope.reset.email,callbackReset)
    }
    function callbackReset(){
          $ionicPopup.confirm({
                    title: 'แจ้งเตือน',
                    template: '<center>ส่งการเปลี่ยนรหัสไปยังอีเมล์ของคุณเรียบร้อย<center>',
                     buttons: [
                        {
                            text: '<b>ตกลง</b>',
                            type: 'button-positive',
                        }
                    ]
            });
    }

    
 

});