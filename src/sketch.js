import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import Puzzle from './components/Puzzle';
import Piece from './components/Piece';
import Helpers from './components/Helpers';
import Shapes from './components/Shapes';
import Button from './components/Button';
import Card from './components/Card';

const sketch = (p5) => {
	// make library globally available
	window.p5 = p5;

	// settings
	let fps = 60;
	let bpm = 133;

	// assets
	let sounds = new Array(8);
	let introSound;
	let fullLoop;
	let cheers;
	let images = new Array(8);
	let cardImages = new Array(3);
	let tabacGlam; 

	// state
	var started = false;
	let solved = false;
	let transition = false;

	// components
	let layout;
	let shapes;
	let shapeCount = 8;
	let button;
	let puzzle;
	let spaces = 9;
	let cards = new Array(3);

	// colors
	let backColor, frontColor;


	/*-------- preload --------*/
	p5.preload = () => {
		for (let i = 0; i < sounds.length; i++) {
			sounds[i] = p5.loadSound('assets/f' + i.toString() + '.mp3');
		}

		introSound = p5.loadSound('assets/intro.mp3');
		fullLoop = p5.loadSound('assets/loop.mp3');
		cheers = p5.loadSound('assets/cheer.mp3');

		for (let i = 0; i < images.length; i++) {
			images[i] = p5.loadImage('assets/pz' + i.toString() + '.png');
		}

		for (let i = 0; i < cardImages.length; i++) {
			cardImages[i] = p5.loadImage('assets/ci' + i.toString() + '.png');
		}

		tabacGlam = p5.loadFont('./assets/tabac_glam.ttf');
	}

	/*-------- setup --------*/
	p5.setup = () => {
		p5.createCanvas(p5.windowWidth, p5.windowHeight);
		p5.smooth(8);
		p5.frameRate(fps);

		// text
		p5.textFont(tabacGlam);

		// colors
		backColor = p5.color(247, 157, 95);
		frontColor = p5.color(59, 65, 149);

		// layout
		if (p5.width <= p5.height) {
			layout = Helpers.initPortrait(p5.width, p5.height, spaces);
		} else {
			layout = Helpers.initLandscape(p5.width, p5.height, spaces);
		}

		// init shapes
		shapes = new Shapes(layout.orientation, layout.puzzleSize*.84, shapeCount, 4 , fps, frontColor);

		// init button
		button = new Button(layout, p5.width/2, p5.height/2, 1.5, fps, backColor, frontColor);

		// init card
		
		cards[0]= new Card("hola", layout.cardSize, layout.card1position, 1.5, fps, frontColor);
		cards[1] = new Card("hola", layout.cardSize, layout.card2position, 1.5, fps, frontColor);
		cards[2] = new Card("hola", layout.cardSize, layout.card3position, 1.5, fps, frontColor);
	}

	/*-------- draw --------*/
	p5.draw = () => {
		p5.background(p5.color(p5.red(backColor), p5.green(backColor), p5.blue(backColor), 255));

		if (!started || solved || transition) {
			shapes.display(started);
			shapes.update();
			if (shapes.getSize() === shapeCount && !started || transition) {
				button.display(started, transition, shapeCount, shapes.getSize());
				button.update();
				transition = button.isDead();
			}
		} else if (started && !transition && !solved) {
			puzzle.display(started, transition);
		}

		cards.forEach(c => c.display());
	}

	/*-------- touch --------*/
	p5.touchStarted = () => {

		if (!started) {
			let distance = p5.dist(p5.mouseX || p5.touchX, p5.mouseY || p5.touchY, button.x, button.y);
			if (!started && distance < button.radius()) {
				// 1. init puzzle
				puzzle = new Puzzle(layout, bpm, fps, backColor, frontColor, sounds, images, fullLoop);
				// 2. play 8th piece
				introSound.play();
				//3. change bools
				started = true;
				transition = true;
			} 
		} else {
			let distance = p5.dist(p5.mouseX || p5.touchX, p5.mouseY || p5.touchY, puzzle.getX(), puzzle.getY());
			if (!solved && distance < puzzle.getSize()) {
				solved = puzzle.movePiece(p5.mouseX || p5.touchX, p5.mouseY || p5.touchY);

				if (solved) {
					fullLoop.loop();
					cheers.play();
				}
			}
		}

		return false;
	}

	p5.keyTyped = () => {
  
	  if (p5.key == 's' || p5.key == 'S') {
	    p5.saveCanvas('myCanvas_.png');
	  }
  
	  return false;
	  
	}	
}

new p5(sketch);