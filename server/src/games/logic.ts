export const boardsize = 10; // total x and y size of board

export function createEmptyBoard() {
  // creates an empty board. are arrays in arrays. each cell has
  // an object containing booleans of occupied and explored states
  var board = [];
  for (var i = 0; i < boardsize; i++) {
    board.push([]);
    for (var j = 0; j < boardsize; j++) {
      board[i].push({
        occupied: false,
        discovered: false
      });
    }
  }
  return board;
}

export const sheepShapes = {
  // the shapes the different sheeps can have/
  // takes the sheep origin (0,0) and determines the cells
  // depending on the added values (ex origin 1,2 + 0,1 = cell 1,3)
  blackSheep: [[0, 0]],
  "2Sheep": [[0, 0], [0, 1]],
  "3Sheep": [[0, 0], [0, 1], [0, 2]],
  zSheep: [[0, 0], [0, 1], [1, 1], [1, 2]],
  lSheep: [[0, 0], [0, 1], [1, 1]],
  bigZsheep: [[0, 0], [1, 0], [1, 1], [1, 2], [2, 2]],
  fatSheep: [[0, 0], [0, 1], [1, 0], [1, 1]]
};

export const possibleLocList = [
  [[3, 7], [6, 3], [4, 3], [3, 2], [4, 3], [5, 2], [0, 6]],
  [[0, 5], [2, 5], [4, 4], [3, 5], [5, 1], [6, 0], [1, 6]],
  [[7, 4], [5, 2], [4, 0], [3, 5], [1, 6], [0, 5], [6, 6]],
  [[6, 7], [2, 3], [0, 0], [3, 4], [5, 4], [6, 1], [1, 4]],
  [[6, 0], [1, 3], [2, 5], [4, 0], [6, 3], [2, 5], [0, 0]]
];

export function createRandomBoard() {
  let board = createEmptyBoard();
  var randLocList =
    possibleLocList[Math.floor(Math.random() * possibleLocList.length)];
  randLocList.forEach(function(location) {
    console.log(location);
    for (var shape in sheepShapes) {
      //console.log(shape);
      placeSheep(board, sheepShapes[shape], location);
    }
  });
  console.log(board);
  return board;
}

export function placeSheep(board, sheepshape, startcell) {
  // places the sheep on the board.
  // takes sheepshape (sheepShape['fatSheep']) and starting cell ([0,0])
  // as arguments
  sheepshape.forEach(function(cell) {
    board[startcell[0] + cell[0]][startcell[1] + cell[1]].occupied = true;
  });
  return board;
}

createRandomBoard();

export function shotHits(board, shotOnCell) {
  // set the cell.discovered on which the shot was fired to True,
  // returns true if the cell was occupied else returns false
  // takes the playing board and targeted cell as arguments
  const cell = board[shotOnCell[0]][shotOnCell[1]];
  cell.discovered = true;
  if (cell.occupied === true) {
    console.log("shot hit!");
    return true;
  } else {
    console.log("shot misses!");

    cell.discovered = true;
    return board;
  }
}

var board1 = createEmptyBoard();

//placeSheep(board1, sheepShapes["fatSheep"], [0, 0]);
//shotHits(board1, [0, 5]);

//console.log(board1);
