export default class Piece {
	constructor(i, realIndex, size, location) {
		//
		this.currentIndex = i;
		this.realIndex = realIndex;
		this.size = size;
		this.color = p5.random(0, 200);
		this.position = p5.createVector(location.x, location.y);

		// movement
		this.moving = false;
		this.target = p5.createVector(0, 0);
		this.direction = p5.createVector(0, 0);
		this.velocity = p5.createVector(0, 0);

		// use index to load image and sound to piece
	}

	display(pieceLocations) {
		if (moving) update();
		p5.fill(this.color);
		p5.rect(this.position.x, this.position.y, this.size, this.size);
	}

	update() {
		
	}

	move(to) {
		// change helper vectors
		// set moving to true
	}

	wasClicked(x, y) {
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