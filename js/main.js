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
const h2El = document.getElementById('winner');



/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click', handleDrop);
document.getElementById('resetBtn').addEventListener('click',init);




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
  h2El.innerHTML = '';
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
function renderWinner() {
  h2El.innerHTML = `Winner ${winner === 1 ? 'yellow' : 'black'  }` 
  

}

// Update all impacted state, then call render
function handleDrop(evt) {
  if (winner) {
    return;

  }
  const colIdx = markerEls.indexOf(evt.target);
  if (colIdx === -1) return;
  const colArr = board[colIdx];
  const rowIdx = colArr.indexOf(0);
  colArr[rowIdx] = turn;
  render();
  winner = getWinner(colIdx, rowIdx);
  if (winner) {
    renderWinner();
  }
  turn *= -1;
  
}

function checkHorzWin(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
  let count = 1; 
  //count up
  let idx = rowIdx + 1; // initialize to one above 
  while (idx < board[idx].length && board[colIdx][idx] === player) {
    count++;
    idx++;
  }
  idx = rowIdx - 1; // initialize to one above 
  while (idx >= 0 && board[colIdx][idx] === player) {
    count++;
    idx--;
  }
  return count === 4 ? winner = player : null; 
}


function checkVertWin(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
  let count = 1; 
  //count right
  let idx = colIdx + 1; // initialize to one above 
  while (idx < board.length && board[idx][rowIdx] === player) {
    count++;
    idx++;
  }
  idx = colIdx - 1; // initialize to one above 
  while (idx >= 0 && board[idx][rowIdx] === player) {
    count++;
    idx--;
  }
  return count >= 4 ? winner = player : null;
}


function getWinner(colIdx, rowIdx) {
  return checkVertWin(colIdx, rowIdx)
    || checkHorzWin(colIdx, rowIdx)
    || checkForwardSlash(colIdx, rowIdx)

}
function checkForwardSlash(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
  let count = 1; 
  //count right
  let idx1 = colIdx - 1;// initialize to one above 
  let idx2 = rowIdx + 1;
  while (idx1 >= 0  && idx2 < board[0].length && board[idx1][idx2] === player) {
    count++;
    idx1--;
    idx2++;
  }
  idx1 = colIdx + 1; // initialize to one above 
  idx2 = rowIdx - 1
  while (idx1 < board.length && idx2 >= 0 && board[idx1][idx2] === player) {
    count++;
    idx1++;
    idx2--;
  }
  return count === 4 ? winner = player : null;
}

