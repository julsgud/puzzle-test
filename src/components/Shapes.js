import Parallelogram from './Parallelogram';

export default class Shapes {
	constructor(orientation, size, shapeCount, duration, fps, color) {
		this.orientation = orientation;
		this.shapeCount = shapeCount;
		this.duration = duration;
		this.color = color;
		this.fps = fps;
		this.totalShapes = 1;
		this.maxSizeX = size;
		this.maxSizeY = size;
		this.run = true;
		this.shapes = [];
		this.shapes[0] = new Parallelogram(this.maxSizeX, this.maxSizeY, duration, fps, color);
	}

	display(started) {
		// console.log(this.shapes.length);
		for (let i = 0; i < this.shapes.length; i++) {
			this.shapes[i].display();
			this.shapes[i].update();
		}
	}

	update() {
		if (this.totalShapes < this.shapeCount && this.shapes[this.totalShapes-1].getSizeX() < (this.maxSizeX/this.shapeCount)*(this.shapeCount-1)) {
			this.totalShapes++;
			this.shapes[this.totalShapes-1] = new Parallelogram(this.maxSizeX, this.maxSizeY, this.duration, this.fps, this.color);
		}
	}

	getSize() {
		return this.shapes.length;
	}

	checkIfFaded() {
		if (this.shapes.length === this.shapeCount) {
			if (this.shapes[this.shapeCount-1].getSizeX() <= 0) {
				return true;
			} else {
				return false;
			}
		}
	}

	stop() {
		var i = 0;
		var bool = false;

		while(i < this.shapes.length || !bool) {
			if (this.shapes[i].isAtMaxSize()){
				// this.run = false;
				bool = true;
			}
		}
	}

	isRunning() {
	}
}