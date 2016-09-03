export default class Piece {
		constructor(i, size) {
			this.index = i;
			this.size = size;
			// this.currentLocation = pieceLocations[this.index];

			// use index to load image and sound to piece
		}

		display(pieceLocations) {
			p5.fill(p5.random(0, 255));
			p5.rect(pieceLocations[this.index].x, pieceLocations[this.index].y, this.size, this.size);
		}

		move(from, to) {

		}
	}