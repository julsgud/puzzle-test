import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import Puzzle from './components/Puzzle';
import Piece from './components/Piece';
import Helpers from './components/Helpers';

const sketch = (p5) => {
	// make library globally available
	window.p5 = p5;

	// settings
	let fps = 60;
	let bpm = 133;

	// state
	let solved;

	// components
	let puzzle;
	let spaces = 9;

	// font
	let tabacGlam;

	// colors
	let backColor, frontColor;

	// sound
	let amp;

	p5.setup = () => {
		p5.createCanvas(p5.windowWidth, p5.windowHeight);
		// p5.smooth(8);
		p5.frameRate(fps);

		// text
		tabacGlam = p5.loadFont('./assets/tabac_glam.ttf');
		p5.textFont(tabacGlam);

		// colors
		backColor = p5.color(247, 157, 95);
		frontColor = p5.color(59, 65, 149);
		console.log(p5.SoundFile);

		// sound
		// amp = new p5.Amplitude();

		// layout
		let layout = {};

		if (p5.width <= p5.height) {
			layout = Helpers.initPortrait(p5.width, p5.height, spaces);
		} else {
			layout = Helpers.initLandscape(p5.width, p5.height, spaces);
		}

		// init
		puzzle = new Puzzle(layout, bpm, fps, backColor, frontColor);
	}

	p5.draw = () => {
		p5.background(p5.color(p5.red(backColor), p5.green(backColor), p5.blue(backColor), 255));
		puzzle.display();
	}

	p5.mouseClicked = () => {
		// todo: only fire when in-bounds of board
		puzzle.movePiece(p5.mouseX, p5.mouseY);
	}	
}

new p5(sketch);