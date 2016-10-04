export default class Parallelogram {
	constructor(maxSizeX, maxSizeY, duration, fps, color) {
		// layout
		this.x = new Array(4);
		this.y = new Array(4);
		this.maxSizeX = maxSizeX;
		this.maxSizeY = maxSizeY;
		this.c = color;
		this.alpha = 0;

		// animation
		this.framesToMax = duration * fps;
		this.shrinkFactorX = maxSizeX/this.framesToMax;
		this.shrinkFactorY = maxSizeY/this.framesToMax;
		this.fadeFactor = 255/this.framesToMax;

		this.initLayout(p5.width, p5.height, this.maxSizeX, this.maxSizeY);
	}

	display() {
		p5.noStroke();
		p5.fill(p5.red(this.c), p5.green(this.c), p5.blue(this.c), this.alpha);
		p5.quad(this.x[0], this.y[0], this.x[1], this.y[1], this.x[2], this.y[2], this.x[3], this.y[3]);
	}

	update() {
		if (this.getSizeX() > 0) {
			this.x[0] += this.shrinkFactorX/5*3;
		    this.x[1] -= this.shrinkFactorX/5*2;
		    this.x[2] -= this.shrinkFactorX/5*3;
		    this.x[3] += this.shrinkFactorX/5*2;
		    
		    this.y[0] += this.shrinkFactorY/2;
		    this.y[1] += this.shrinkFactorY/2;
		    this.y[2] -= this.shrinkFactorY/2;
		    this.y[3] -= this.shrinkFactorY/2;

		    this.alpha += this.fadeFactor;
		} else {
			this.initLayout(p5.width, p5.height, this.maxSizeX, this.maxSizeY);
		}
	}

	initLayout(width, height, maxSizeX, maxSizeY) {
		this.x[0] = width/2 - maxSizeX*.60;
		this.x[1] = width/2 + maxSizeX*.40;
		this.x[2] = width/2 + maxSizeX*.60;
		this.x[3] = width/2 - maxSizeX*.40;

		this.y[0] = height/2 - maxSizeY/2;
		this.y[1] = this.y[0];
		this.y[2] = height/2 + maxSizeY/2;
		this.y[3] = this.y[2];

		this.alpha = 0;
	}

	getSizeX() {
		return this.x[1] - this.x[0];
	}
}