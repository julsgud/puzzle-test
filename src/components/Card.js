export default class Card {
	constructor(text, size, endPosition, duration, fps, frontColor) {
		this.size = size;
		this.alpha = 0;

		// animation
		this.framesToMax = duration * fps;
		this.fadeFactor = 200/this.framesToMax;

		// movement
		this.position = p5.createVector(p5.width/2, p5.height/2);
		this.destination = p5.createVector(endPosition.x, endPosition.y);
		this.velocity = p5.createVector(0, 0);
		this.acceleration = p5.createVector(0, 0);
		this.speedLimit = p5.width/600;

		// prep movement
		this.target = this.destination.copy();
		this.dest = this.destination.copy();
		this.dest.sub(this.position);

		let direction = this.dest.copy();
		direction.normalize();
		this.acceleration = direction.copy();

		this.moving = true;
	}

	display() {
		this.update();
		p5.fill(255, this.alpha);
		p5.rectMode(p5.CENTER);
		p5.rect(this.position.x, this.position.y, this.size, this.size);
	}

	update() {
		if (this.moving) {
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
		if(this.alpha < 200) this.fadeIn();
	}

	fadeIn() {
		this.alpha += this.fadeFactor/2;
	}
}