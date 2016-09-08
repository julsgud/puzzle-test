import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import Puzzle from './components/Puzzle';
import Piece from './components/Piece';
import Helpers from './components/Helpers';

const sketch = (p5) => {
	// make library globally available
	window.p5 = p5;

	// state
	let solved;

	// components
	let puzzle;
	let spaces = 9;

	p5.setup = () => {
		p5.createCanvas(p5.windowWidth, p5.windowHeight);

		let layout = {};

		if (p5.width <= p5.height) {
			layout = Helpers.initPortrait(p5.width, p5.height, spaces);
		} else {
			layout = Helpers.initLandscape(p5.width, p5.height, spaces);
		}

		// init objects
		puzzle = new Puzzle(layout);
	}

	p5.draw = () => {
		p5.background(p5.color(252, 182, 157), 35);
		puzzle.display();
	}

	p5.mouseClicked = () => {
		// todo: only fire when in-bounds of board
		puzzle.movePiece(p5.mouseX, p5.mouseY);
	}	
}

new p5(sketch);