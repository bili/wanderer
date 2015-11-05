var mapCanvas = document.getElementById('map');
var mapContext = mapCanvas.getContext('2d');
mapCanvas.width = window.innerWidth;
mapCanvas.height = window.innerHeight;

function log() {
	console && console.log.apply(console, arguments);
}
var Human = function(ctx) {
	this._x = 0;
	this._y = 0;
	this._res = "static/images/human.png";
	
	var img = new Image();
	img.src = this._res;
	var _self = this;
	img.onload = function() {
		log('loading', _self._res, img.width, img.height);
		ctx.drawImage(img, 100, 100, img.width, img.height);
	};
	return this;
};
Human.prototype.moveTo = function(x, y) {
	this._x = x;
	this._y = y;
	return this;
};
var bili = new Human(mapContext);