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

	initLandscape: function(w, h, puzzleSize) {
		let that = {};

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

	generateRandomIndices: function(size) {
		let nums = new Array(size), n=0;
		let i = nums.length, j = 0, temp;

		while(n < size) {
			nums[n] = n;
			n++;
		}

		while(i--) {
			j = Math.floor(Math.random() * (i+1));
			temp = nums[i];
			nums[i] = nums[j];
			nums[j] = temp;
		}

		return nums;
	}
}

export default Helpers;