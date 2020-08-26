// add admin cloud function
const adminForm = document.querySelector('.admin-actions');






//listen for auth status changes
// auth.onAuthStateChanged(user => {
//   if (user) {
//     user.getIdTokenResult().then(idTokenResult => {
//       user.admin = idTokenResult.claims.admin;
//       setupUI(user);
//     });
//     db.collection('guides').onSnapshot(snapshot => {
//       setupGuides(snapshot.docs);
//     }, err => console.log(err.message));
//   } else {
//     setupUI();
//    // setupGuides([]);
//   }
// });


var user,userId=0;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  //  User is signed in.
  setupUI(user);
    console.log("User is signed in.", "YES");
    $('#choose_player').show();
    $('#choose_player').html('Choose player : ')
    $("#player_turn").show();
    $("#player_turn").html("")
     userId = firebase.auth().currentUser.uid;//get user id     
     user = firebase.auth().currentUser;
     var roomID2,rt;
     var leave_btn2 = firebase.database().ref('users/'+userId);
     leave_btn2.on('value', function(snapshot) {
        roomID2 = snapshot.val();
     rt=roomID2.room_id;

     




     });
     
     if(rt==0 && !document.hidden)
     firebase.database().ref('users/'+userId ).update({statu : "online"}); 
     else if(rt==0 && document.hidden)
     firebase.database().ref('users/'+userId ).update({statu : "away"}); 
     else 
     firebase.database().ref('users/'+userId ).update({statu : "play"}); 

    
  } else {
   // No user is signed in.
   setupUI();
   console.log("No user is signed in.", "NO");
   userId=0;
   $('#usersOnline').hide();
   $('#choose_player').hide();
   $("#player_turn").hide();
  //var item = document.getElementById(user.uid);
  //item.parentNode.removeChild(item);    
  }
  });
  











// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  const name = signupForm['signup-name'].value;

  // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(email, password).then(() => {
    //add online user to database
     user = firebase.auth().currentUser;
      user.updateProfile({displayName:name});
     userId = firebase.auth().currentUser.uid;//get user id
          firebase.database().ref('users/'+ userId ).set(
            {user_email : email,
              user_name : name,
            user_id : userId,
            room_id : 0,
            statu : "online"         
          }
            );
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    signupForm.querySelector('.error').innerHTML = '';
    $('#usersOnline').show();
  }).catch(err => {
    signupForm.querySelector('.error').innerHTML = err.message;
  });
 

  


//  location.reload();








});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
 // var userId = firebase.auth().currentUser.uid;//get user id
  let userRef = firebase.database().ref('users/' + userId);

  var leave_btn = firebase.database().ref('users/'+userId);
  leave_btn.on('value', function(snapshot) {
    console.log("remove 3");
  firebase.database().ref('rooms/'  ).remove(snapshot.room_id);
  });
  userRef.remove();
  auth.signOut(); 
  $('#usersOnline').hide();
  //location.reload();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;
  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
userId = firebase.auth().currentUser.uid;//get user id
user = firebase.auth().currentUser;
var userName= user.displayName;
      firebase.database().ref('users/'+ userId ).set(
        {user_email : email,
          user_name : userName,
        user_id : userId,
        room_id : 0,
        statu : "online" 

      }
        );     
        console.log("user.displayName : ", user.displayName);         
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';
    $('#usersOnline').show();
  }).catch(err => {
    loginForm.querySelector('.error').innerHTML = err.message;
  });
 
//location.reload();
});



 // make auth and firestore references
 const auth = firebase.auth();
 const db = firebase.firestore();
 const functions = firebase.functions();
 
 // update firestore settings
 db.settings({ timestampsInSnapshots: true });
//////////////////////////////////////////////////////////////////////
 
