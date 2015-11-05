DEBUG = true;

var KEY = {
	'UP': 38,
	'DOWN': 40,
	'LEFT': 37,
	'RIGHT': 39
};
var cvs = document.querySelector('#map');
var ctx = cvs.getContext('2d');
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

var map = new Map(cvs, ctx, {});
var man = new Human();
map.add(man);
moveToCenter(man);

function render() {
	map.repaint();
	window.requestAnimationFrame(render);
}
render();
function moveToCenter(obj) {
	var x = Math.floor((map._w - obj._w) / 2);
	var y = Math.floor((map._h - obj._h) / 2);
	obj.moveTo(x, y);
}
window.addEventListener('resize', function(e) {
	cvs.width = window.innerWidth;
	cvs.height = window.innerHeight;
});
document.addEventListener('keydown', function(e) {
	if (DEBUG) _.log('Event keyDown triggered', e.keyCode);
	switch(e.keyCode) {
		case KEY.LEFT:
			if (DEBUG) _.log('Move to', man._x - 1, man._y)
			man.moveTo(man._x -1, man._y);
			break;
		case KEY.RIGHT:
			if (DEBUG) _.log('Move to', man._x + 1, man._y)
			man.moveTo(man._x + 1, man._y);
			break;
		case KEY.UP:
			if (DEBUG) _.log('Move to', man._x, man._y - 1)
			man.moveTo(man._x, man._y - 1);
			break;
		case KEY.DOWN:
			if (DEBUG) _.log('Move to', man._x, man._y + 1)
			man.moveTo(man._x, man._y + 1);
			break;
	}
}, false);