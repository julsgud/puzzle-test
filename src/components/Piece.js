export default class Piece {
	constructor(i, realIndex, size, location) {
		
		this.currentIndex = i;
		this.realIndex = realIndex;
		this.size = size;
		this.color = p5.random(0, 200);
		this.position = p5.createVector(location.x, location.y);
		this.emptyVector = p5.createVector(0, 0);

		// movement
		this.resetMovement();

		// reset vector
		this.emptyVector = p5.createVector(0, 0);

		// use index to load image and sound to piece
	}

	display(pieceLocations) {
		if (this.moving) this.update();
		p5.fill(this.color);
		p5.rect(this.position.x, this.position.y, this.size, this.size);
	}

	update() {
		this.velocity.add(this.acceleration);
		this.velocity.limit(2);
		this.position.add(this.velocity);

		if(this.position.x.toFixed(4) === this.target.x.toFixed(4)) {
			console.log('woop');
			this.acceleration.mult(0);
			this.velocity.mult(0);
			this.moving = false;
			// this.resetMovement();
		}
	}

	move(destination) {
		// 1. update helper vectors
		this.target = destination.copy();
		this.dest = destination.copy();
		this.dest.sub(this.position);
		// create direction from difference between pos and tar
		let direction = p5.createVector(this.dest.x, this.dest.y);
		this.direction.normalize();
		this.direction.mult(0.5);
		this.acceleration = this.direction.copy();

		// 2. start moving
		this.moving = true;
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

	resetMovement() {
		this.moving = false;
		this.target = this.emptyVector.copy();
		this.direction = this.emptyVector.copy();;
		this.velocity = this.emptyVector.copy();;
		this.acceleration = this.emptyVector.copy();;
	}
}