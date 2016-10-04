import Parallelogram from './Parallelogram';

export default class Shapes {
	constructor(orientation, shapeCount, duration, fps, color) {
		this.orientation = orientation;
		this.shapeCount = shapeCount;
		this.duration = duration;
		this.color = color;
		this.fps = fps;
		this.totalShapes = 1;

		if (this.orientation == 'portrait') {
			this.maxSizeX = p5.width/8*7;
			this.maxSizeY = p5.width/8*7;
		} else {
			this.maxSizeX = p5.height/8*7.5;
			this.maxSizeY = p5.height/8*7.5;
		}
		
		this.shapes = [];
		this.shapes[0] = new Parallelogram(this.maxSizeX, this.maxSizeY, duration, fps, color);
	}

	display() {
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
}