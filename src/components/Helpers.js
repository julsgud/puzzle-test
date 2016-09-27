const Helpers = {
	initPortrait: function(w, h, spaces) {
		let that = {};

		// layout variables
		that.frameX = 0;
		that.frameY = (h - w)/2;
		that.puzzleSize = w;
		that.x = 0;
		that.y = that.frameY;
		that.pieceSize = that.puzzleSize/Math.sqrt(spaces);
		that.pieceLocations = this.getPieceLocations(spaces, that.frameX, that.frameY, that.puzzleSize);

		return that;
	},

	initLandscape: function(w, h, spaces) {
		let that = {};

		that.frameX = (w - h)/2;
		that.frameY = 0;
		that.puzzleSize = h;
		that.x = that.frameX;
		that.y = 0;
		that.pieceSize = that.puzzleSize/Math.sqrt(spaces);
		that.pieceLocations = this.getPieceLocations(spaces, that.frameX, that.frameY, that.puzzleSize);

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

	onLoadSound(load, index) {
		
	}
}

export default Helpers;