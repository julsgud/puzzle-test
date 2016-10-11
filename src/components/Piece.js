export default class Piece {
	constructor(i, realIndex, size, location, backColor, frontColor, sounds, images) {
		this.initIndex = i;
		this.realIndex = realIndex;
		this.size = size;
		this.color = frontColor;
		this.colorPlaying = p5.color(p5.red(this.color), p5.green(frontColor), p5.blue(frontColor), 200);
		this.textColor = p5.color(p5.red(backColor), p5.green(backColor), p5.blue(backColor), 222);
		this.playingColor = '#f00';

		// movement
		this.position = p5.createVector(location.x, location.y);
		this.target = p5.createVector(0, 0);
		this.direction = p5.createVector(0, 0);
		this.velocity = p5.createVector(0, 0);
		this.acceleration = p5.createVector(0, 0);
		this.speedLimit = p5.width/13;
		this.moving = false;

		// sound
		this.sound = sounds[realIndex];

		// image
		this.img = images[realIndex];
	}

	display() {
		if (this.sound.isPlaying()) {
			// let level = amp.getLevel();
			// let alpha = p5.map(level, 0, 1, 0, 255);
			// p5.fill(p5.color(p5.red(this.color), p5.green(this.color), p5.blue(this.color), alpha)); 
			// p5.fill(this.colorPlaying);
			p5.tint(200, 200);
		} else {
			p5.noTint();
			// p5.fill(this.color);
		}
		// p5.rect(this.position.x, this.position.y, this.size, this.size);
		// p5.fill(this.textColor);
		// p5.textAlign(p5.CENTER, p5.CENTER);
		// p5.textSize(this.size/3);
		// p5.text((this.realIndex + 1).toString(), this.position.x + this.size/2, this.position.y + this.size/2);
		p5.image(this.img, this.position.x, this.position.y, this.size, this.size);
	}

	update() {
		if(this.moving) {
			if(this.position.dist(this.target) > this.speedLimit) {
				/* Accel away!*/
				// 1. accel
				this.velocity.add(this.acceleration);
				
				// 2. cap speed
				this.velocity.limit(this.speedLimit);

				// 3. move
				this.position.add(this.velocity);
			} else {
				/* when distance is less than speed limit, use it to
				cap velocity and stop at dist===0 */
				this.velocity.limit(this.position.dist(this.target));
				this.position.add(this.velocity);
			}

			if (this.position.dist(this.target) === 0) {
				this.acceleration.mult(0);
				this.velocity.mult(0);
				this.moving = false;
			}
		} 
	}

	play() {
		this.sound.play();
	}

	prepMovement(destination) {
		// 1. update helper vectors
		this.target = destination.copy();
		this.dest = destination.copy();
		this.dest.sub(this.position);
		// console.log(this.dest);

		// create direction from difference between position and target
		let direction = this.dest.copy();
		direction.normalize();
		this.acceleration = direction.copy();
		//console.log(this.acceleration);

		// 2. raise movement flag
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

	isMoving() {
		return this.moving;
	}
}