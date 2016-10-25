export default class Video {
	constructor(orientation, size, playerId, videoId) {
		let player;

		let w = size, h = size;
		let wString = w.toString(), hString = h.toString();

		player = new YT.Player('player' + playerId.toString(), {
			height: hString,
			width: wString,
			videoId: videoId,
			playerVars: {
				showinfo: '0',
				color: 'white',
				controls: '2'
			}
		});
	}
}