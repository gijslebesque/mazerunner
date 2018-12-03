
const maze = [
    [ true,  false, true,  true,  true,  false ],
    [ true,  false, true,  false, true,  false ],
    [ true,  true,  true,  false, true,  false ],
    [ false, false, false, false, true,  false ],
    [ true,  true,  true,  true,  true,  false ],
    [ true,  false, false, false, false, true  ],
    [ true,  true,  true,  false,  false, true],
    [ true,  false,  false,  false,  false,  true  ],
    [ true,  true,  true,  true,  true,  true  ]
  ];


  const map = [
    [ true,  false, true,  true,  true,  false ],
    [ true,  false, true,  false, true,  false ],
    [ true,  true,  true,  false, true,  false ],
    [ false, false, false, false, true,  false ],
    [ true,  true,  true,  true,  true,  false ],
    [ true,  false, false, false, false, true  ],
    [ true,  true,  true,  false,  false, true],
    [ true,  false,  false,  false,  false, true],
    [ true,  true,  true,  true,  true,  true  ]
  ];


const miner = {
    x:0,
    y:0
}
const end = {
    x:6,
    y:3
}


//copy maze
let wasHere = maze.map( elem =>{ return elem});

let road = [];
const solveMaze = (maze, miner, end) =>{

    //set copy of array to false
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            wasHere[i][j] = false;
        }    
    }
    checkNextNode(miner.x, miner.y, end.x, end.y);

    //reverse stacking order to get path from start instead of end
    road.reverse();
    console.log("correct", road)
}

const checkNextNode = (x, y, endX, endY) =>{

    // If end found
    if (x == endX && y == endY) return true; 

    // If 'wall' or already were here or already reached node 
    //in order to prevent possible infitie loops
    if ((!map[x][y] || wasHere[x][y])) {
        return false;
    }  
    //Miner was here
     wasHere[x][y] = true;

    //reached a dead end it should be possible to go back
    //and pop out of callstack       
    if( !map[x][y] && wasHere[x][y]){
        wasHere[x][y] = false;
        return false;
    }
    
    if (x != 0) {
        //go to left node
        if (checkNextNode(x-1, y, endX, endY)) { 
            road.push("left")
            return true;
        }
    }

    if (x != map.length - 1) {
        //go to left right node
        if (checkNextNode(x+1, y, endX, endY)) { 
            road.push("right")
            return true;
        }
    }
    if (y != 0) { 
      //go one node up
        if (checkNextNode(x, y-1, endX, endY)) { 
            road.push("up")
            return true;
        }
    }
    if (y != map.length - 1) {
        // go one node down
        if (checkNextNode(x, y+1, endX, endY)) { 
            road.push("down")
            return true;
        }
    }
    return false;

}
solveMaze(maze, miner, end)


