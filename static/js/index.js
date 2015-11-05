_.log.DEBUG = true;

var KEY = {
	'UP': 38,
	'DOWN': 40,
	'LEFT': 37,
	'RIGHT': 39,
	'W': 87,
	'S': 83,
	'A': 65,
	'D': 68
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
	_.log('Event keyDown triggered', e.keyCode);
	switch(e.keyCode) {
		case KEY.LEFT:
			man.moveTo(man._x -1, man._y);
			break;
		case KEY.A:
			man.moveTo(man._x -1, man._y);
			break;
		case KEY.RIGHT:
			man.moveTo(man._x + 1, man._y);
			break;
		case KEY.D:
			man.moveTo(man._x + 1, man._y);
			break;
		case KEY.UP:
			man.moveTo(man._x, man._y - 1);
			break;
		case KEY.W:
			man.moveTo(man._x, man._y - 1);
			break;
		case KEY.DOWN:
			man.moveTo(man._x, man._y + 1);
			break;
		case KEY.S:
			man.moveTo(man._x, man._y + 1);
			break;
	}
	_.log('Move to', man._x, man._y)
}, false);