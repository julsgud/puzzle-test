export default class Button {
	constructor(layout, x, y, duration, fps, c1, c2) {
		this.x = x;
		this.y = y;
		this.buttonSize = 0;
		if (layout.orientation == 'portrait') {
			this.buttonSize = layout.puzzleSize/6;
		} else {
			this.buttonSize = layout.puzzleSize/6;
		}
		this.size = 0;
		this.anchorSize = this.buttonSize;
		this.size2 = this.buttonSize/90;
		this.duration = duration;
		this.fps = fps;
		this.c1 = c1;
		this.c2 = c2;
		this.alpha = 0;

		// ani
		this.framesToMax = duration * fps;
		this.fadeFactor = 255/this.framesToMax;
		this.growthFactor = this.buttonSize/this.framesToMax;
		this.angle = 0.0;

		// layout

	}

	display(started, transition, shapeCount, totalShapes) {
		if (!started && shapeCount == totalShapes || !transition) {
			this.fadeIn();
			this.grow();
		} else if (transition) {
			this.fadeOut();
			this.shrink();
		}
		p5.fill(p5.red(this.c1), p5.green(this.c1), p5.blue(this.c1), this.alpha);
		// p5.ellipse(this.x, this.y, this.size, this.size);
		p5.fill(255, 200);
		p5.triangle(this.x-this.size/5, this.y-this.size/5, this.x+this.size/4, this.y, this.x-this.size/5, this.y+this.size/5);
	}

	update() {
		if (this.alpha > 155 && this.size >= this.anchorSize-this.anchorSize/10) {
			// console.log(angle);
			this.size = this.size + (this.size2*Math.sin(this.angle));
			this.angle += 0.07;
			// console.log(this.size);
			// console.log(this.size*Math.sin(this.angle));
		}
	}

	fadeIn() {
		if(this.alpha < 255) this.alpha += this.fadeFactor;
	}

	fadeOut() {
		if (this.alpha > 0) this.alpha -= this.fadeFactor;
	}

	grow() {
		if (this.size < this.anchorSize) this.size += this.growthFactor*2;
		// console.log(this.size + ' ' + this.buttonSize);
	}

	shrink() {
		if (this.size > 0) this.size -= this.growthFactor*1.3;
	}

	radius() {
		return this.anchorSize;
	}

	bang() {
		return true;
	}

	isDead() {
		if (this.size <= 0) {
			return false;
		} else {
			return true;
		}
	}
}