
var player=1; //1 for Yellow, 2 for Red
var grid = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];

//A function based on the slected column
function selectColumn(col) {

  if (player==1) {
    grid[5][col]=1;
    player=2;
    document.getElementById("colorTurn").innerHTML="Red Turn";
  } else {
    grid[5][col]=2;
    player=1;
    document.getElementById("colorTurn").innerHTML="Yellow Turn";
  }

  refreshGrid();
}


//A function to refresh the connectfour grid on screen
function refreshGrid() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 7; col++) {
      if (grid[row][col]==0) { 
                document.getElementById("board"+row+col).style.backgroundColor="#FFFFFF";
      } else if (grid[row][col]==1) { //1 for yellow
                document.getElementById("board"+row+col).style.backgroundColor="#FFFF00";
      } else if (grid[row][col]==2) { //1 for yellow
                document.getElementById("board"+row+col).style.backgroundColor="#FF0000";
       }
    }
  }  
}

function resetGrid() {
//Reset all values to 0 in the grid array
  
  
}