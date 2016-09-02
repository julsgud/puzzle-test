import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';

const sketch = (p5) => {
	// make library globally available
	window.p5 = p5;

	// layout
	let frame, boardSize, tileSize;
	let tileCount = 9;

	// object
	let tiles = {};

	p5.setup = () => {
		p5.createCanvas(p5.windowWidth, p5.windowHeight);
		frame = p5.width/13;
		boardSize = p5.width - frame*2;
		tileSize = boardSize/tileCount;
	}

	p5.draw = () => {
		p5.background(p5.color(252, 182, 157), 85);

		
	}

	setBoard = () => {
		boardParts = n
	}
}

new p5(sketch);