import Piece from './Piece';

export default class GhostPiece extends Piece {
	constructor(i, realIndex, size, location, toLoc, backColor, frontColor, sounds, images) {
		super(i, realIndex, size, location, toLoc, backColor, frontColor, sounds, images);
		this.initIndex = i;
		this.realIndex = realIndex;
		this.size = size;
		this.color = p5.color(p5.red(backColor), p5.green(backColor), p5.blue(backColor), 128);

		// movement
		this.position = p5.createVector(location.x, location.y);
		this.target = p5.createVector(0, 0);
		this.moving = false;
		this.ready = false;

		// no sound or image
		this.sound = null;
	}

	display() {
		p5.fill(this.color, 0);
		p5.rect(this.position.x, this.position.y, this.size, this.size);
	}

	prepMovement(destination) {
		// 1. update helper vectors
		this.target = destination.copy();

		// 2. raise movement flag
		this.moving = true;
	}

	update() {
		if(this.moving) {
			this.position = this.target.copy();
			this.moving = false;
		} 
	}
}