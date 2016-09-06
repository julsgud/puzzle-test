export default class Board {

	constructor(sketchWidth, sketchHeight, columns, rows) {
		let props;

		if (sketchWidth <= sketchHeight) {
			props = initPortrait(sketchWidth, sketchHeight, columns, rows);
		} else {
			props = initLandscape(sketchWidth, sketchHeight, columns, rows);
		}

		this.x = props.x;
		this.y = props.y;
		this.size = props.size;
		this.color = 255;
		this.pieces = generatePieces(columns, rows, props.frameX, props.frameY, props.size);
	}

	initPortrait(w, h, columns, rows) {
		let that = {};

		// layout variables
		that.frameX = 0;
		that.frameY = (h - w)/2;
		that.size = w;
		that.x = 0;
		that.y = that.frameY;
		that.pieceSize = that.size/columns;

		return that;
	}

	initLandscape(w, h, columns, rows) {
		let that = {};

		return that;
	}

	display() {
		p5.noStroke();
		p5.fill(255);
		p5.rect(this.x, this.y, this.size, this.size);
	}

	generatePieces(columns, rows, frameX, frameY, boardSize) {
		let pieces = new Array(9);

		let index = 0;
		for(var gridY = 0; gridY < columns; gridY++) {
			for(var gridX = 0; gridX < rows; gridX++) {

				let x = boardSize/columns * gridX + frameX;
				let y = boardSize/rows * gridY + frameY;

				locations[index] = new Piece(index, boardSize/columns);
				locations[index].x = x;
				locations[index].y = y;
				// console.log("location " + index + " x: " + pieceLocations[index].x + " y: " + pieceLocations[index].y);
				index++;
			}
		}
		return locations;
	}


}