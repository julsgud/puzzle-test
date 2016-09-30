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

	// external assets
	let sounds = new Array(8);
	let images = new Array(8);
	let tabacGlam; 

	// state
	let solved;

	// components
	let puzzle;
	let spaces = 9;

	// colors
	let backColor, frontColor;

	p5.preload = () => {
		for (let i = 0; i < sounds.length; i++) {
			sounds[i] = p5.loadSound('assets/f' + i.toString() + '.mp3');
		}

		// for (let i = 0; i < sounds.length; i++) {
		// 	images[i] = p5.loadImage('assets/i' + i.toString() + '.png');
		// }

		tabacGlam = p5.loadFont('./assets/tabac_glam.ttf');
	}

	p5.setup = () => {
		p5.createCanvas(p5.windowWidth, p5.windowHeight);
		// p5.smooth(8);
		p5.frameRate(fps);

		// text
		p5.textFont(tabacGlam);

		// colors
		backColor = p5.color(247, 157, 95);
		frontColor = p5.color(59, 65, 149);

		// layout
		let layout = {};

		if (p5.width <= p5.height) {
			layout = Helpers.initPortrait(p5.width, p5.height, spaces);
		} else {
			layout = Helpers.initLandscape(p5.width, p5.height, spaces);
		}

		// init
		puzzle = new Puzzle(layout, bpm, fps, backColor, frontColor, sounds);
	}

	p5.draw = () => {
		p5.background(p5.color(p5.red(backColor), p5.green(backColor), p5.blue(backColor), 255));
		puzzle.display();
	}

	// p5.mousePressed = () => {
	// 	// todo: only fire when in-bounds of board
	// 	console.log('mouse pressed', p5.mouseX || p5.touchX, p5.mouseY || p5.touchY);

	// 	return false;
	// }

	p5.touchStarted = () => {
		puzzle.movePiece(p5.mouseX || p5.touchX, p5.mouseY || p5.touchY);
		console.log('touch started', p5.mouseX || p5.touchX, p5.mouseY || p5.touchY);

		return false;
	}	
}

new p5(sketch);