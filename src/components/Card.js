export default class Card {
	constructor(size, endPosition, duration, fps, frontColor, image, videoId) {
		this.size = size;
		this.size2 = size;
		this.alpha = 0;
		this.videoId = videoId;

		this.image = image;

		// animation
		this.framesToMax = duration * fps;
		this.fadeFactor = 200/this.framesToMax;
		this.angle = 0.0;

		// movement
		this.position = p5.createVector(p5.width/2, p5.height/2);
		this.destination = p5.createVector(endPosition.x, endPosition.y);
		this.velocity = p5.createVector(0, 0);
		this.acceleration = p5.createVector(0, 0);
		this.speedLimit = p5.width/400;

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
		p5.imageMode(p5.CENTER);
		p5.rectMode(p5.CENTER);
		p5.image(this.image, this.position.x, this.position.y, this.size, this.size);
		p5.fill(255, this.alpha);
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
		if (this.alpha < 75) this.fadeIn();
	}

	fadeIn() {
		this.alpha += this.fadeFactor/5;
		// console.log(this.alpha);
	}

	getX() {
		return this.position.x;
	}

	getY() {
		return this.position.y;
	}

	getSize() {
		return this.size/2;
	}

	bang(orientation) {
		// window.open(this.link);
		return this.createVideo(orientation);
	}

	createVideo(orientation) {
		let video = true;
		console.log(orientation);

		let player;
		let w = (orientation === 'portrait') ? p5.width/1.5 : p5.width/3;
		let h = (orientation === 'portrait') ? p5.height/3 : p5. height/3;

		let wString = w.toString();
		let hString = h.toString();

		console.log(YT);

		player = new YT.Player('player', {
			height: hString,
			width: wString,
			videoId: this.videoId,
			playerVars: {
				showinfo: '0',
				color: 'white',
				controls: '2'
			}
		});

		console.log(player);

		return true;
	}


}