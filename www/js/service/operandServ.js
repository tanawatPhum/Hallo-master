angular.module('moduleControlles')
.service('$operandServ',function($ionicLoading) {
    this.operand={};
    this.setOperand = function(operand1,operand2,operand3){
            this.operand.icon = operand1;
            this.operand.word = operand2;
            this.operand.header = operand3;
    }
    this.getOperand = function(){
        return this.operand;
    }

         
    
})