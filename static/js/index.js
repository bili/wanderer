DEBUG = true;

var KEY = {
	'UP': 38,
	'DOWN': 40,
	'LEFT': 37,
	'RIGHT': 39
};
var CONFIG = {
	'MOVESTEP': 10
};

var mapCanvas = document.getElementById('map');
var mapContext = mapCanvas.getContext('2d');
mapCanvas.width = window.innerWidth;
mapCanvas.height = window.innerHeight;

var map = new Map(mapCanvas, mapContext);
var man = new Human();
map.add(man);

function render() {
	map.repaint();
	window.requestAnimationFrame(render);
}
render();

document.addEventListener('keydown', function(e) {
	if (DEBUG) _.log('Event keyDown triggered', e.keyCode);
	switch(e.keyCode) {
		case KEY.LEFT:
			if (DEBUG) _.log('Move to', man._x - CONFIG.MOVESTEP, man._y)
			man.moveTo(man._x-CONFIG.MOVESTEP, man._y);
			break;
		case KEY.RIGHT:
			if (DEBUG) _.log('Move to', man._x + CONFIG.MOVESTEP, man._y)
			man.moveTo(man._x+CONFIG.MOVESTEP, man._y);
			break;
		case KEY.UP:
			if (DEBUG) _.log('Move to', man._x, man._y - CONFIG.MOVESTEP)
			man.moveTo(man._x, man._y-CONFIG.MOVESTEP);
			break;
		case KEY.DOWN:
			if (DEBUG) _.log('Move to', man._x, man._y + CONFIG.MOVESTEP)
			man.moveTo(man._x, man._y+CONFIG.MOVESTEP);
			break;
	}
}, false);