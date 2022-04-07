/*----- constants -----*/
const COLORS = {
'0': 'white',
'1': 'yellow',
'-1': 'black',
};


/*----- app's state (variables) -----*/
let board;  // 2D Array where the nested arrays rep the columns
let turn;  // 1 or -1; 0 for nobody home in that cell
let winner; // 4 in row


/*----- cached element references -----*/
const markerEls = [...document.querySelectorAll('#markers > div')];

/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click', handleDrop);




/*----- functions -----*/

init();

// initialize state, then call render()
function init() {
  board = [
    [0, 0, 0, 0, 0, 0],  // column 0
    [0, 0, 0, 0, 0, 0],  // column 1
    [0, 0, 0, 0, 0, 0],  // column 2
    [0, 0, 0, 0, 0, 0],  // column 3
    [0, 0, 0, 0, 0, 0],  // column 4
    [0, 0, 0, 0, 0, 0],  // column 5
    [0, 0, 0, 0, 0, 0],  // column 6
  ];
  turn = 1;
  winner = null;
  render();

}

function render() {
  // Iterate over the column arrays
  board.forEach(function(colArr, colIdx) {
    colArr.forEach(function(cellVal, rowIdx) {
      const cellEl = document.getElementById(`c${colIdx}r${rowIdx}`);
      cellEl.style.backgroundColor = COLORS[cellVal];
    });
  });
  renderMarkers();
}

// hide/show the markers (hide if no 0's exist in that column)
function renderMarkers() {
  markerEls.forEach(function(markerEl, colIdx) {
    markerEl.style.visibility = board[colIdx].includes(0) ? 'visible' : 'hidden';
  });
}

// Update all impacted state, then call render
function handleDrop(evt) {
  const colIdx = markerEls.indexOf(evt.target);
  if (colIdx === -1) return;
  const colArr = board[colIdx];
  const rowIdx = colArr.indexOf(0);
  colArr[rowIdx] = turn;
  render();
  checkWin();
  turn *= -1;
  
}
function checkWin() {
  console.log(turn)
  for(let i=0; i < board.length -4; i++){
    for(let j=0; j < board[i].length -4; j++){
      if(board[i] [j] === turn && board[i][j+1] === turn && board[i][j+2] && board[i][j+3]){
        winner = true
      } else if(board[i][j] === turn && board[i+1][j] === turn && board[i+2][j] === turn && board[i+3][j]){
        winner = true
      }else if(board[i][j] === turn && board[i+1][j+1] === turn && board[i+2][j+2] === turn && board[i+3][j+3]){
        winner = true
      }else if(board[i][j] === turn && board[i+1][j-1] === turn && board[i+2][j-2] === turn && board[i+3][j-3]){
        winner = true

      }
    }
  }
};
