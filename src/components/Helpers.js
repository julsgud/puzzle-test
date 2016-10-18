const Helpers = {
	initPortrait: function(w, h, spaces) {
		let that = {};
		let originalWidth = w;
		let widthDifference;

		if (originalWidth > 612) {
			widthDifference = w - 612;
			w = 612;
		}

		that.orientation = 'portrait';

		if (originalWidth > 612) {
			that.frameX = Math.ceil(widthDifference/2);
		} else {
			that.frameX = 0;
		}

		that.frameY = (h - w)/2;
		that.puzzleSize = w;
		that.x = that.frameX;
		that.y = that.frameY;
		that.pieceSize = that.puzzleSize/Math.sqrt(spaces);
		that.pieceLocations = this.getPieceLocations(spaces, that.frameX, that.frameY, that.puzzleSize);

		return that;
	},

	initLandscape: function(w, h, spaces) {
		let that = {};
		let originalHeight = h;
		let heightDifference;

		if (originalHeight > 612) {
			heightDifference = h - 612;
			h = 612;
		}

		that.orientation = 'landscape';
		that.frameX = (w - h)/2;

		if (originalHeight > 612) {
			that.frameY = Math.ceil(heightDifference/2);
		} else {
			that.frameY = 0;
		}
		
		that.puzzleSize = h;
		that.x = that.frameX;
		that.y = that.frameY;
		that.pieceSize = Math.floor(that.puzzleSize/Math.sqrt(spaces));
		that.pieceLocations = this.getPieceLocations(spaces, that.frameX, that.frameY, that.puzzleSize);

		// cards
		that.cardSize = h/3;

		that.card1position = {};
		that.card1position.x = p5.width*.20;
		that.card1position.y = p5.height*.5;

		that.card2position = {};
		that.card2position.x = p5.width*.5;
		that.card2position.y = p5.height*.5;

		that.card3position = {};
		that.card3position.x = p5.width*.80;
		that.card3position.y = p5.height*.5;

		return that;
	},

	getPieceLocations: function(spaces, frameX, frameY, puzzleSize) {
		let locations = new Array(spaces);
		let line = Math.sqrt(spaces);

		let index = 0;
		for(var gridY = 0; gridY < line; gridY++) {
			for(var gridX = 0; gridX < line; gridX++) {

				let x = puzzleSize/line * gridX + frameX;
				let y = puzzleSize/line * gridY + frameY;

				locations[index] = new Object;
				locations[index].x = x;
				locations[index].y = y;
				// console.log("location " + index + " x: " + locations[index].x + " y: " + locations[index].y);
				index++;
			}
		}
		return locations;
	},

	generateRandomIndices: function(sizeOfArray) {
		// create array with numbers
		let nums = new Array(sizeOfArray), n=0;

		while(n < sizeOfArray) {
			nums[n] = n;
			n++;
		}

		// shuffle 'em
		let i = nums.length, j = 0, temp;

		while(i--) {
			j = Math.floor(Math.random() * (i+1));
			temp = nums[i];
			nums[i] = nums[j];
			nums[j] = temp;
		}

		// console.log(nums);
		return nums;
	},

	getIndexOfClickedPiece(pieces, x, y) {
		let index, i = 0, current = false;

		while(i < pieces.length && !current) {
			current = pieces[i].wasClicked(x, y);
			if(current) index = i;
			i++
		}

		return index;
	},

	getIndexOfGhostPiece(pieces, GhostPiece) {
		let index, i = 0, bool = false;

		while(i < pieces.length && !bool) {
			bool = pieces[i] instanceof GhostPiece;
			if (bool) index = i;
			i++;
		}

		return index;
	},

	canPieceMove(pieces, clickedPiece, ghostPiece) {
		let canMove = false;

		if (clickedPiece != ghostPiece) {
			canMove = pieces[clickedPiece].isAdjacentToGhostPiece(pieces[ghostPiece].getPosition());
		} 

		return canMove;
	},

	swapPiecesInArray(pieces, clickedPiece, ghostPiece) {
		let temp = pieces[clickedPiece];

		pieces[clickedPiece] = pieces[ghostPiece];

		pieces[ghostPiece] = temp;

		return pieces;
	},

	checkIfSolved(pieces) {
		let bool = true;
		for (var i = 0; i < pieces.length; i++) {
			if (pieces[i].realIndex != i) {
				bool = false;
			}
		}
		return bool;
	},

	countInversions(randomIndices) {
		/* a 3x3 slding puzzle can only
		be solved when its total inversions is even
		more info here: http://bit.ly/2dOueVY*/
		let totalInversions = 0;

		for (let i = 0; i < randomIndices.length; i++) {
			let inversions = 0;
			let current = randomIndices[i];

			if (current < randomIndices.length-1) {
				// copy array from current index
				let array = randomIndices.slice(i);
				for (let j = 0; j < array.length; j++) {
					if (array[j] < current) {
						inversions++;
					}
				}
			}

			totalInversions += inversions;
		}

		return totalInversions;
	},

	isEven(n) {
		return n % 2 == 0;
	}
}

export default Helpers;