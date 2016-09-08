export default class Piece {
	constructor(i, realIndex, size, location) {
		//
		this.currentIndex = i;
		this.realIndex = realIndex;
		this.size = size;
		this.color = p5.random(0, 200);
		this.position = p5.createVector(location.x, location.y);

		// movement
		this.resetMovement();

		// reset vector
		this.initVector = p5.createVector(0, 0);

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

		if(this.position.x == this.target.x) {
			console.log('bam');
		} else {
			console.log('doy');
		}
		console.log(this.position.x);
		console.log(this.target.x);
		if(this.position.equals(this.target)) {
			this.resetMovement();
		}
	}

	move(destination) {
		// 1. update helper vectors
		console.log(destination.x + ' ' + destination.y);
		this.target = destination;
		console.log(this.target.x + ' ' + this.target.y);
		this.direction = this.target.sub(this.position);
		console.log(this.target.x + ' ' + this.target.y);
		this.direction.normalize();
		this.direction.mult(0.5);
		this.acceleration = this.direction;

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
		this.target = p5.createVector(0, 0);
		this.direction = p5.createVector(0, 0);
		this.velocity = p5.createVector(0, 0);
		this.acceleration = p5.createVector(0, 0);
	}
}