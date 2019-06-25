const maze = [
	[true, false, true, true, true, false],
	[true, false, true, false, true, false],
	[true, true, true, false, true, false],
	[false, false, false, false, true, false],
	[true, true, true, true, true, false],
	[true, false, false, false, false, true],
	[true, true, true, false, false, true],
	[true, false, false, false, false, true],
	[true, true, true, true, true, true]
];

const miner = {
	x: 0,
	y: 0
};
const end = {
	x: 6,
	y: 3
};

//copy maze

const solveMaze = (maze, miner, end) => {
	//set copy of array to false
	let road = [];

	let wasHere = maze.map(col => {
		return col.map(row => row);
	});
	for (let i = 0; i < wasHere.length; i++) {
		for (let j = 0; j < wasHere[i].length; j++) {
			wasHere[i][j] = false;
		}
	}
	checkNextNode(road, wasHere, miner.x, miner.y, end.x, end.y);

	//reverse stacking order to get path from start instead of end
	return road.reverse();
};

const checkNextNode = (road, wasHere, x, y, endX, endY) => {
	// If end found
	if (x == endX && y == endY) return true;

	// If 'wall' or already were here or already reached node
	//in order to prevent possible infitie loops
	if (!maze[x][y] || wasHere[x][y]) {
		return false;
	}
	//Miner was here
	wasHere[x][y] = true;

	//reached a dead end it should be possible to go back
	//and pop out of callstack
	if (!maze[x][y] && wasHere[x][y]) {
		wasHere[x][y] = false;
		return false;
	}

	if (x != 0) {
		//go to up node
		if (checkNextNode(road, wasHere, x - 1, y, endX, endY)) {
			road.push("up");
			return true;
		}
	}

	if (x != maze.length - 1) {
		//go to down node
		if (checkNextNode(road, wasHere, x + 1, y, endX, endY)) {
			road.push("down");
			return true;
		}
	}
	if (y != 0) {
		//go one node left
		if (checkNextNode(road, wasHere, x, y - 1, endX, endY)) {
			road.push("left");
			return true;
		}
	}
	if (y != maze.length - 1) {
		// go one node right
		if (checkNextNode(road, wasHere, x, y + 1, endX, endY)) {
			road.push("right");
			return true;
		}
	}
	return false;
};

console.log(solveMaze(maze, miner, end));
