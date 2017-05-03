angular.module('moduleControlles')
.service('firebaseServ', function (firebase,DatabaseService){


  const config = {
    apiKey: "AIzaSyCDYXgsOs-n1dUgsKJ16-E7Hcm6UbNIgkg",
    authDomain: "hallo-42e85.firebaseapp.com",
    databaseURL: "https://hallo-42e85.firebaseio.com",
    storageBucket: "hallo-42e85.appspot.com",
    messagingSenderId: "899590444510"
  };  
  
  firebase.initializeApp(config);
  this.signIn = function(email, password) {
     return firebase.auth().signInWithEmailAndPassword(email,password)     
 }

 this.signUp = function(email, password) {
   console.log(email)
   console.log(password);
   return firebase.auth().createUserWithEmailAndPassword(email,password)      
 }
 
 this.push = function() {

 }

 this.update = function() {

 }
 this.resetPassword= function(email) {
   const auth = firebase.auth()
  return  auth.sendPasswordResetEmail(email)
 }

 this.getCurrentUser = function() {
   
   var user = firebase.auth().currentUser;
  if (user) {
    return user
  } else {
    
   
  }
 }
 this.signOut = function() {
  return firebase.auth().signOut();

 }

 this.pushNote = function(obj) {   
   return firebase.database().ref('note/'+this.getCurrentUser().uid).set(obj)  
}

 this.readonce = function() {    
   return  firebase.database().ref('note/'+this.getCurrentUser().uid).once('value')  
 }

 this.prepareData = function(obj) {  
   console.log(obj);
  ans= obj.map((v)=>{
    delete v['Date']
    return v
  })   
   return firebase.database().ref('backup/'+this.getCurrentUser().uid).set(ans)
 }

 this.pullFirebase  = function(callbackPullData) {
    var uid = this.getCurrentUser().uid;
        console.log("success");
        console.log(uid);
        firebase.database().ref('backup/'+uid).once('value',function(v){
          console.log(v.val());
            callbackPullData(v.val());
        })
  
 }

 this.syncFirebase= function(notes,email,password,callback){
            console.log(email);
             console.log(password);
             console.log(notes);
            this.signIn(email, password).then((res)=>{        
           
            this.prepareData(notes).then((res)=>{
              callback(notes);
            console.log("Success")  //success
        });
   
    }).catch(function(){
        callback(notes);
    })      
   }

   this.resetPassword =function(emailAddress,callback){
      firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
        callback();
        console.log("sendSuccess");
      }, function(error) {
        // An error happened.
      });
   }
   

   this.syncLocal = function(notes){
        return this.pullFirebase();
 
}
})
