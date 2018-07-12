
// TODO: 
// * make placesheep check if square is already occupied
// * make shotHits check if a shot was already fired on the square

const boardsize = 10 // total x and y size of board

function createEmptyBoard() {
    // creates an empty board. are arrays in arrays. each cell has
    // an object containing booleans of occupied and explored states
    var board = []
    for (i=0; i< boardsize; i++) {
        board.push([])
        for (j=0; j<boardsize; j++) {
            board[i].push({
                'occupied': false,
                'discovered': false
            }   )
        }
    }
    return board
}

const sheepShapes = {
    // the shapes the different sheeps can have/
    // takes the sheep origin (0,0) and determines the cells
    // depending on the added values (ex origin 1,2 + 0,1 = cell 1,3)
    'blackSheep' : [[0,0]],
    '2Sheep' : [[0,0], [0,1]],
    '3Sheep' : [[0,0], [0,1], [0,2]],
    'zSheep' : [[0,0], [0,1], [1,1], [1,2]],
    '4Sheep' : [[0,0], [0,1], [0,2], [0,3]],
    'lSheep' : [[0,0], [0,1], [1,1]],
    'bigZsheep' : [[0,0], [1,0], [1,1], [1,2], [2,2]],
    'fatSheep' : [[0,0], [0,1], [1,0], [1,1]]
}

function placeSheep(board, sheepshape, startcell) {
    // places the sheep on the board.
    // takes sheepshape (sheepShape['fatSheep']) and starting cell ([0,0])
    // as arguments
    sheepshape
        .forEach(cell => board[startcell[0] + cell[0]]
            [startcell[1] + cell[1]].occupied = true )
}

function shotHits(board, shotOnCell) {
    // set the cell.discovered on which the shot was fired to True,
    // returns true if the cell was occupied else returns false
    // takes the playing board and targeted cell as arguments
    const cell = board[shotOnCell[0]][shotOnCell[1]]
    cell.discovered = true
    if (cell.occupied === true) {
        console.log('shot hit!')
        return true
        console.log('shot hit!')
    } else {
        console.log('shot misses!')
        return false
    }
    cell.discovered = true
}



var board1 = createEmptyBoard()

placeSheep(board1, sheepShapes['fatSheep'], [0,0])
shotHits(board1, [0,5])


console.log(board1)


