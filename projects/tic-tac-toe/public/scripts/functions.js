const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const adminItems = document.querySelectorAll('.admin');
function setupUI(user){
  if (user) {
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // toggle user elements
    adminItems.forEach(item => item.style.display = 'none');
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}
//this fun open new room
function fun(reciver_user,sender_user){//just for reciver
    // var userId = firebase.auth().currentUser.uid;//get user id
     firebase.database().ref('rooms/'+sender_user ).set({
       x_player : sender_user,
       o_player :   reciver_user,
       block : 1 ,
       refesh : true
     });
     firebase.database().ref('users/'+ userId+'/room_id' ).set( sender_user );
     firebase.database().ref('users/'+ sender_user+'/room_id' ).set( sender_user );
     firebase.database().ref('messages/'+sender_user  ).remove(); 
     firebase.database().ref('rooms/'+sender_user).update({refesh:"false"});
     firebase.database().ref('users/'+userId ).update({statu : "play"});
  
     location.reload();
   }
   function runMyFunction(id){ //send a message
     
   //  $('#invitebtn').append($('#pb').width(25).height(25).css("display", "block"));
   // $('#inviteSpan').html("");
    // var userId = firebase.auth().currentUser.uid;//get user id
   var my_id = id;
   console.log("my_id : ", my_id)
   firebase.database().ref('messages/'+ userId ).set({
     sender : userId,
     reciver : my_id
    
   });
   }
   function disagree_fun(reciver_user,sender_user){
   
     //var userId = firebase.auth().currentUser.uid;//get user id
     firebase.database().ref('refuses/'+sender_user ).set({rejected:sender_user });
   
   }
   function pleft_fun(reciver_user,sender_user){
     if(userId==sender_user)
   firebase.database().ref('leaves/'+userId ).set({left:reciver_user} );
   else if (userId==reciver_user)
   firebase.database().ref('leaves/'+userId ).set({left:sender_user} );
   }
   function makeRIDZ(){
     firebase.database().ref('users/'+userId ).update({room_id : 0});
     location.reload();
   }
   
   