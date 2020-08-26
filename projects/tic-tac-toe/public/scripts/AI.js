var origBoard; //an array that keeps track of what's in each square: X, O or nothing
var humanPlayer ;
var aiPlayer ;
const winCombos = [  //array thats gonna show winning combinations
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]; 
origBoard = Array.from(Array(9).keys());//make the array every number from 0-9

  // calling function to start the game
  var  block_idG;
var makeAiPlay=false;
 $(function(){ 
    $('input[type="radio"]').click(function(){
     
  
      if ($(this).is(':checked'))
      {
        var  block_id;
       
       block_id = $(this).attr('id') ;
       block_idG=block_id;
        var x = block_id[7],z = block_id[9], pos,  a = block_id[5],player;
        console.log("x : ", x);
        console.log("z : ", z);
         pos = getID(x,z);
        
         if(a%2==0)
player='O';
else if (a%2!=0)
player='X';
       turn(pos,player);
          if(makeAiPlay)
          startGame();
  }
    });
  });
  

//defining the function to start the game (it will also run when clicking on the "Replay" button)

function startGame() { 
    var block_id='block0-1-1';
    
  //  $("#"+block_id).attr('checked',true);
    var BS = bestSpot();
    console.log("startGame -> BS : ", BS)
    
    var x,z;
    if(BS == 8){
    x='3';z='3';}
    else if(BS == 7){
    x='3';z='2';}
    else if(BS == 6){
        x='3';z='1';}
        else if(BS == 5){
            x='2';z='3';}
            else if(BS == 4){
                x='2';z='2';}
                else if(BS == 3){
                    x='2';z='1';}
                    else if(BS == 2){
                        x='1';z='3';}
                        else if(BS == 1){
                            x='1';z='2';}
                            else if(BS == 0){
                                x='1';z='1';}

                                if(block_idG==null)
                                block_idG=block_id;
 var i = block_idG[5]++;
 ++i;
 console.log("startGame -> block_idG[5] : ", block_idG[5])
 console.log("startGame -> i : ", i)
 
 block_idG = 'block'+i.toString()+'-'+x+'-'+z;
 console.log("startGame -> block_idG : ", block_idG)
 
   
    
     
     
                                
    $("#"+block_idG).attr('checked',true);


     x = block_idG[7];z = block_idG[9];var  pos,  a = block_idG[5],player;
    console.log("x : ", x);
    console.log("z : ", z);
     pos = getID(x,z);
    
     if(a%2==0)
player='O';
else if (a%2!=0)
player='X';
   turn(pos,player);


 
} 




function getID(x, z){

if(x==1 && z==1)
return 0;
else if(x==1 && z==2)
return 1;
else if(x==1 && z==3)
return 2;
else if(x==2 && z==1)
return 3;
else if(x==2 && z==2)
return 4;
else if(x==2 && z==3)
return 5;
else if(x==3 && z==1)
return 6;
else if(x==3 && z==2)
return 7;
else if(x==3 && z==3)
return 8;



}
//defining turn function
function turn(squareId, player) {

  origBoard[squareId] = player;////////////////////////////////////needed_____________
  console.log("turn ->  origBoard[squareId] : ",  origBoard[squareId])
  
  
} 


// defining checkWin function
function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => 
  (e === player) ? a.concat(i) : a, []); //finding every index that the player has played
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) { //checking if the game has been won by looping through every winCombos
    if (win.every(elem => plays.indexOf(elem) > -1)) { //has the player played in every spot that counts as a win for that win
      gameWon = {index: index, player: player};  //which win combo the player won at & which player had won
      break;
    } 
} 
return gameWon;
} 







//defining emptySuares function
function emptySquares() {
    return origBoard.filter(s => typeof s === 'number'); //filter every element in the origBoard to see if the type of element equals number. If yes, we are gonna return it (all the squares that are numbers are empty, the squares with X and O are not empty)
}


//defining bestSpot function
function bestSpot() {////////////////////////////////////needed_____________
    return minimax(origBoard, aiPlayer).index; //will always play in the first empty squre
}





//defining minimax function
function minimax(newBoard, player) {
    var availSpots = emptySquares(newBoard); //defining the indexes of the available spots in the board

    if(checkWin(newBoard, player)) { //checking who wins
        return {score: -10}; //if O wins we return -10
    } else if (checkWin(newBoard, aiPlayer)) {
        return {score: 10} // if X wins we return 10
    } else if (availSpots.length === 0) {
        return {score: 0} //tie, we return 0
    }
    var moves = []; //collect the scores from each of the empty spots to evaluate them later
    for (var i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]]; //setting the index number of the empty spot, that was store as a number in the origBoard, to the index property of the move object
        newBoard[availSpots[i]] = player; //setting empty spot on a newBoard to the current player

        if (player === aiPlayer) { //calling the minimax function with the other player in the newly changed newBoard
            var result = minimax(newBoard, humanPlayer);
            move.score = result.score; //store the object result from the minimax function call, that includes a score property, to the score property of the move object
        } else {
            var result = minimax(newBoard, aiPlayer);
            move.score = result.score; //if the minimax function does not find a terminal state, it goes level by level (deeper into the game). this recursion happens until it reached out the terminal state and returns a score one level up
        }

        newBoard[availSpots[i]] = move.index; // minimax resets newBoard to what it was before
        
        moves.push(move);//pushes the move object to the moves array
        }

        var bestMove; //minimax algorithm evaluates the best move in the moves array
        if(player === aiPlayer) {  //choosing the highest score when AI is playing and the lowest score when the human is playing            
            var bestScore = -10000; //if the player is AI player, it sets variable bestScore to a very low number
            for (var i = 0; i < moves.length; i++) { //looping through the moves array
                if (moves[i].score > bestScore) { //if a move has a higher score than the bestScore, the algorithm stores that move
                    bestScore = moves[i].score;
                    bestMove = i; //if there are moves with similar scores, only the first will be stored
                }
            }
        } else { // when human Player
            var bestScore = 10000;
            for(var i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) { //minimax looks for a move with the lowest score to store
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
      //  console.log("minimax -> moves[bestMove] : ", moves[bestMove]);
        return moves[bestMove]; //returning object stored in bestMove
    }