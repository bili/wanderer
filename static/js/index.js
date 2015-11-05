var mapCanvas = document.getElementById('map');
var mapContext = mapCanvas.getContext('2d');
mapCanvas.width = window.innerWidth;
mapCanvas.height = window.innerHeight;

var KEY = {
	'UP': 38,
	'DOWN': 40,
	'LEFT': 37,
	'RIGHT': 39
};
var CONFIG = {
	'MOVESTEP': 5
}

var map = new Map(mapCanvas, mapContext);
var man = new Human();
map.add(man);

function render() {
	map.repaint();
	window.requestAnimationFrame(render);
}
render();

document.addEventListener('keydown', function(e) {
	_.log('Event keyDown triggered', e.keyCode);
	switch(e.keyCode) {
		case KEY.LEFT:
			_.log('Move to', man._x - CONFIG.MOVESTEP, man._y)
			man.moveTo(man._x-CONFIG.MOVESTEP, man._y);
			break;
		case KEY.RIGHT:
			_.log('Move to', man._x + CONFIG.MOVESTEP, man._y)
			man.moveTo(man._x+CONFIG.MOVESTEP, man._y);
			break;
		case KEY.UP:
			_.log('Move to', man._x, man._y - CONFIG.MOVESTEP)
			man.moveTo(man._x, man._y-CONFIG.MOVESTEP);
			break;
		case KEY.DOWN:
			_.log('Move to', man._x, man._y + CONFIG.MOVESTEP)
			man.moveTo(man._x, man._y+CONFIG.MOVESTEP);
			break;
	}
}, false);