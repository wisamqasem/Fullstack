document.getElementById("leavegame2").addEventListener("click",()=>{
    //var userId = firebase.auth().currentUser.uid;//get user id
        var leave_btn = firebase.database().ref('users/'+userId);
  leave_btn.on('value', function(snapshot) {
    var roomRemovedId = snapshot.val();
    console.log("remove 1");
    firebase.database().ref('rooms/'+roomRemovedId.room_id  ).remove();
    firebase.database().ref('users/'+userId ).update({room_id : 0,statu : "online"});
   
  });
  location.reload();
  })
    
  
  document.addEventListener("visibilitychange", function() {
    var roomID;
    var leave_btn = firebase.database().ref('users/'+userId);
    leave_btn.on('value', function(snapshot) {
       roomID = snapshot.val();
    
    });

    if(roomID.room_id!=0 && userId!=0)
    firebase.database().ref('users/'+userId ).update({statu : "play"});
  else if(document.hidden){
  if(userId!=0)
    firebase.database().ref('users/'+userId ).update({statu : "away"});
  }
  else{
    if(userId!=0)
    firebase.database().ref('users/'+userId ).update({statu : "online"});
  }



  });
  window.addEventListener("beforeunload", function (e) {});
  
  
  document.getElementById("leavegame").addEventListener('click',()=>{
        var userId = firebase.auth().currentUser.uid;//get user id
        var leave_btn = firebase.database().ref('users/'+userId);
  leave_btn.on('value', function(snapshot) {
    var roomRemovedId = snapshot.val();
    console.log("remove 2");
    firebase.database().ref('rooms/'+roomRemovedId.room_id  ).remove();
    firebase.database().ref('users/'+userId ).update({room_id : 0,statu : "online"});
  });
      });
  
 document.addEventListener('DOMContentLoaded', function() {

        var modals = document.querySelectorAll('.modal');
        M.Modal.init(modals);
      
        var items = document.querySelectorAll('.collapsible');
        M.Collapsible.init(items);
      
      });
      document.getElementById("usersOnline").addEventListener('click', (e) => {
console.log("wer");
        if(e.target.classList.contains('invitec')){
          //$('.pc').append($('#pb').width(25).height(25).css("display", "block"));
         // e.target.append($('#pb').width(25).height(25).css("display", "block"));
          //e.target.style.visibility = 'hidden';
         // $(e.target).html($('#pb').width(25).height(25).css("display", "block"));
          
          $(e.target).css("color", "DeepPink");
         //$( e.target).append($('#pb').width(25).height(25).css("display", "block"));
         
           
     //$('#inviteSpan').html("");
        


        }
      
      });
  
      document.getElementById('AI_player').addEventListener('click',()=>{
$("#AI_div").show();
$("#AI_player").hide();




      });

      document.getElementById('AI_X').addEventListener('click',()=>{
        $('#AI_div').hide();
       
humanPlayer='X';
aiPlayer='O';
makeAiPlay=true;



      });
      document.getElementById('AI_O').addEventListener('click',()=>{
        $('#AI_div').hide();
        humanPlayer='O';
        aiPlayer='X';
        makeAiPlay=true;

        startGame();
        
              });