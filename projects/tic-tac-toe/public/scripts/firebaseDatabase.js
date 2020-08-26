var dict ={};
var users_data = firebase.database().ref().child('/users/');
 users_data.on('value', function(snap) {
firebase.database().ref('/users/' ).once('value').then(function(snapshot) {
  var list = document.getElementById('usersOnline');
$("#usersOnline").empty();
snap.forEach(function (snapshott) {
           var obj = snapshott.val();                        
            var user_id_dict=obj.user_id;
            dict[user_id_dict]=obj.user_name;                                                                       
           var entry = document.createElement('li');        
if(obj.statu == "online" )
var html = '<li class="collection-item" ><div>' + obj.user_name + '<a href="#!"  id="invitebtn"   class="secondary-content invitebtnclass"  onclick="runMyFunction(\'' + obj.user_id + '\')"><i class="material-icons"><span id = "inviteSpan" class="invitec">Invite</span><span class="pc" ></span></i></a></div> </li>';
else if(obj.statu == "away")
var html = '<li class="collection-item" ><div>' + obj.user_name + '<a  class="secondary-content"  ><i class="grey-text text-darken-2">Away</i></a></div> </li>'    ;   
else if(obj.statu == "play")
var html = '<li class="collection-item" ><div>' + obj.user_name + '<a  class="secondary-content"  ><i class="red-text text-darken-2">Play</i></a></div> </li>'     ;  
entry.innerHTML=html;     
    if(userId!=obj.user_id)
           list.appendChild(entry);


       }); 
       if($("#usersOnline").children().length==0){
         document.getElementById("no_plyers").innerHTML="No players";
       }
       else{
        document.getElementById("no_plyers").innerHTML="";

       }

  



});
});


var messages_data = firebase.database().ref().child('/messages/');
messages_data.on('value', function(snap) {

firebase.database().ref('/reciver/' ).once('value').then(function(snapshot) {
 
console.log('message : work');

snap.forEach(function (snapshott) {
           var obj = snapshott.val();
           var reciver_user = obj.reciver;
           var sender_user = obj.sender;
           
           console.log('message : ',reciver_user);
           //var userId = firebase.auth().currentUser.uid;//get user id
           var userName = dict[sender_user];
         if(reciver_user==userId)
         {
         
          document.getElementById("playerName").innerHTML=userName;
         // const inviteForm = document.getElementById("modal-invite");
         $(document).ready(function(){
    $('#modal-invite').modal();
    //(\'' + obj.user_id + '\')
    $("#agree").attr("onclick", 'fun(\''+reciver_user+'\',\''+sender_user+'\' )');
    $("#disagree").attr("onclick", 'disagree_fun(\''+reciver_user+'\',\''+sender_user+'\' )');
    $('#modal-invite').modal({ dismissible: false});
    $('#modal-invite').modal('open'); 
    
 });
         }


        
          
        
          


       }); 

  
 




  



 

});
});


var rooms_data = firebase.database().ref().child('/rooms/');
rooms_data.on('value', function(snap) {
// get room id for the user
var roomId_F_room ;
firebase.database().ref('users/'+userId).on('value', function(snapshot) {
var obj = snapshot.val();
if(obj!=null)
roomId_F_room = obj.room_id;
     });




     
   
 /////////////////////-------------------

 //'/'+roomId_F_room+'/'
 //.once('value').then(function(snapshot) {
// all the work is here ...
    firebase.database().ref('rooms/'+roomId_F_room ).on('value',function(snapshot) {
//snapshot.forEach(function (snapshott) { 
 // block_id = snapshot.val().block;
 
           var obj = snapshot.val();    
          if(obj!=null && userId== roomId_F_room && obj.refesh=="false"){
            firebase.database().ref('users/'+userId ).update({statu : "play"});
             firebase.database().ref('rooms/'+ roomId_F_room ).update({refesh:"true"});location.reload();
            console.log("location : ", "we in");
         //   location.reload();
           // $(".tic-tac-toe").load(" .tic-tac-toe");
            }
          
          
           $('.player-1').attr("disabled",false);  
           $('.player-2').attr("disabled",false);   
           if(obj!=null){
           block_id=obj.block;        
           var xPlayer = obj.x_player;                                                       
           var oPlayer = obj.o_player;
           }
$("#"+block_id).attr('checked',true);
console.log("block_id : ", block_id);
           
           if(userId==xPlayer || userId==oPlayer){$('#leavegame2').show();$('#AI_player').hide();$('#leavegame2').attr('onclick','pleft_fun(\''+oPlayer+'\',\''+xPlayer+'\')');
          }
           
           
           if(userId==xPlayer){$("#player_turn").html("You are Player X");}
           if(userId==oPlayer){$("#player_turn").html("You are Player O");}
         if(userId==xPlayer || userId==oPlayer)
         {
         // var userId = firebase.auth().currentUser.uid;//get user id
 
console.log("fun -> sender_user : ", xPlayer)
console.log("fun -> reciver_user : ", oPlayer)
  $('#usersOnline').hide();
  //$('ul.child_list', this).show();
  $("#choose_player").html("Turn now for => Player X");
if(userId==oPlayer){
  $('input[type="radio"]').attr("disabled",true);
}   
         }  
             var hasClassP1;  var hasClassP2;
      if($('#'+block_id).hasClass("player-1"))///////////////////////
      {hasClassP1=true;
        hasClassP2=false;
      }
      if($('#'+block_id).hasClass("player-2"))///////////////////////
      {hasClassP1=false;
        hasClassP2=true;
      }

      
  console.log("userId==room_sender ", userId==xPlayer);
  console.log("$(this).hasClass(player 1) ", hasClassP1);
  console.log("$(this).hasClass(player 2) ",hasClassP2);
      console.log("room_sender 2 :", xPlayer)
      console.log("userId ", userId)        
      if(hasClassP1 && userId==xPlayer ){        
        $('input[type="radio"]').attr("disabled",true);
        console.log("checked_x : ", "YES  ");
        $("#choose_player").html("Turn now for => Player O");
      }
      if(hasClassP1 && userId==oPlayer){
        console.log("r reciver in if statment? : ", "Yes we in");
        $("#choose_player").html("Turn now for => Player O");
        $('input[type="radio"]').attr("disabled",false);
      }
      
      
      if(hasClassP2 && userId==oPlayer){
        $('input[type="radio"]').attr("disabled",true);
        console.log("checked_O : ", "YES");
        $("#choose_player").html("Turn now for => Player X");
      }
      if(hasClassP2 && userId==xPlayer ){
        $('input[type="radio"]').attr("disabled",false);
       
        $("#choose_player").html("Turn now for => Player X");
      }
      
      console.log("r we in checked fun : ", "YES  ");
   //    });
});

//===------------




 
});


var refuses_data = firebase.database().ref().child('/refuses/');
refuses_data.on('value', function(snap) {
  //var userId = firebase.auth().currentUser.uid;//get user id
firebase.database().ref('/refuses/'+userId ).once('value').then(function(snapshot) {
  

  snap.forEach(function (snapshott) {
           var obj = snapshott.val();
          
         if(obj.rejected==userId)
         {
          $(document).ready(function(){
    $('#modal-refuse').modal();
    console.log("modal-refuse : ", "we in man")
    $('#modal-refuse').modal('open'); 
   // $('#pb').css("display", "none");
   
  //$('.invitec').html("invite");
  $('.invitec').css("color","#26a69a");
 });
        
         }




         
       }); 

 
 firebase.database().ref('refuses/'+ userId ).remove();
 firebase.database().ref('messages/'+userId  ).remove();
  
});
});



var leaves_data = firebase.database().ref().child('/leaves/');
 leaves_data.on('value', function(snap) {
firebase.database().ref('/leaves/'+userId ).once('value').then(function(snapshot) {
  snap.forEach(function (snapshott) {
            var obj = snapshott.val();
         if(obj.left==userId)
          {
          $(document).ready(function(){
    $('#modal-pleft').modal();
    $('#modal-pleft').modal({ dismissible: false});
    $('#modal-pleft').modal('open'); 
 });       
         }         
       }); 

 
 firebase.database().ref('leaves/'+ userId ).remove();
 
  
});
});

