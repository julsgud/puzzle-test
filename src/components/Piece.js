export default class Piece {
	constructor(i, realIndex, size, location) {
		this.currentIndex = i;
		this.realIndex = realIndex;
		this.size = size;
		this.color = p5.random(0, 200);
		this.position = p5.createVector(location.x, location.y);

		// use index to load image and sound to piece
	}

	display(pieceLocations) {
		p5.fill(this.color);
		p5.rect(this.position.x, this.position.y, this.size, this.size);
	}

	update() {
		
	}

	move(to) {
		let destination = p5.createVector(to.x, to.y);

		this.position.add(destination);
		console.log(this.position);
	}

	isClicked(x, y) {
		if(x >= this.position.x && x <= this.position.x + this.size && y >= this.position.y && y <= this.position.y + this.size) {
			return true;
		} else {
			return false;
		}
	}

	getRealIndex() {
		return this.realIndex;
	}

	getPosition() {
		return this.position;
	}

	isAdjacentToGhostPiece(ghostPiece) {
		if(p5.dist(this.position.x, this.position.y, ghostPiece.x, ghostPiece.y).toFixed(4) === this.size.toFixed(4)) {
			return true;
		} else {
			return false;
		}
	}
}