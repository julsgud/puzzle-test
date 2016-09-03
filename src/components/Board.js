export default class Board {
	constructor(x, y, size, color) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
	}

	display() {
		p5.noStroke();
		p5.fill(255);
		p5.rect(this.x, this.y, this.size, this.size);
	}
}