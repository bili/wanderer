var cvs = document.querySelector('#map');
var ctx = cvs.getContext('2d');
cvs.width = MAP.w;
cvs.height = MAP.h;

var path = [];
var map = new Map(cvs, ctx);
var man = new BlueHuman();
map.add(man);
moveToCenter(man);
var woman = new PinkHuman();
map.add(woman);
// woman.moveTo(man._x + 3, man._y+10);
woman.moveTo(Math.floor(Math.random()*map._w), Math.floor(Math.random()*map._h));
// for(var i = 0; i < 200; i++) {
	// if (Math.random() > 0.2) map.add(new Tree(Math.floor(Math.random()*map._w), Math.floor(Math.random()*map._h), false));
	// else map.add(new Rock(Math.floor(Math.random()*map._w), Math.floor(Math.random()*map._h), false));
// }

function render() {
	map.repaint();
	window.requestAnimationFrame(render);
}
render();
showPath(man, woman);
function moveToCenter(obj) {
	var x = Math.floor((map._w - obj._w) / 2);
	var y = Math.floor((map._h - obj._h) / 2);
	obj.moveTo(x, y);
}
window.addEventListener('resize', function(e) {
	cvs.width = MAP.w;
	cvs.height = MAP.h;
});
document.addEventListener('keydown', function(e) {
	_.log('Event keyDown triggered', e.keyCode);
	switch(e.keyCode) {
		case KEY.LEFT:
			man.moveTo(man._x - 1, man._y);
			break;
		case KEY.A:
			man.moveTo(man._x - 1, man._y);
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
		case KEY.Q:
			man.moveTo(man._x - 1, man._y - 1);
			break;
		case KEY.E:
			man.moveTo(man._x + 1, man._y - 1);
			break;
		case KEY.Z:
			man.moveTo(man._x - 1, man._y + 1);
			break;
		case KEY.C:
			man.moveTo(man._x + 1, man._y + 1);
			break;
	}
    showPath(man, woman);
	_.log('Move to', man._x, man._y)
}, false);

function showPath(a, b) {
    clearPath(path);
    path = map.findPath(a, b);
    path.shift();
    path.pop();
    for(var i = 0; i < path.length; i++) {
        map.add(new Tree(path[i][0], path[i][1]));
    }
}
function clearPath(path) {
    for(var i = 0; i < path.length; i++) {
        map.remove(path[i][0], path[i][1]);
    }
}