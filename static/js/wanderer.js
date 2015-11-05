var Map = function(cvs, ctx, config) {
    this._elems = [];
    this._cvs = cvs;
    this._ctx = ctx;
	this._config = {
		'CELLSIZE': config && config.CELLSIZE || 10,
		'MOVESTEP': config && config.MOVESTEP || 10
	};
	this._w = this._cvs.width / this._config.CELLSIZE;
	this._h = this._cvs.height / this._config.CELLSIZE;
    return this;
};
Map.prototype.add = function(elem) {
    elem._map = map;
    this._elems.push(elem);
    return this;
};
Map.prototype.repaint = function() {
    this._cvs.width = this._cvs.width;
    this._cvs.height = this._cvs.height;
    this._elems.forEach(function(e) {
        e.repaint();
    });
    return this;
};
Map.prototype.isHill = function(x, y) {
	var flag = false;
    this._elems.forEach(function(e) {
        if (e._x == x && e._y == y && _.isChildOf(e, Hill)) {
        	_.log(x, y, 'is Hill');
        	flag = true;
        	return;
        }
    });
    return flag;
};

var Human = function(x, y) {
    this._map = null;
    this._x = x || 0;
    this._y = y || 0;
	this._w = 0;
	this._h = 0;
    this._res = "static/images/human.png";
	this._imgCache = null;
    return this;
}
Human.prototype.moveTo = function(x, y) {
	if (this._map.isHill(x, y)) {
		_.log('Hill! Can not move ahead.'); 
		return;
	}
    this._x = x;
    this._y = y;
    return this;
};
Human.prototype.repaint = function() {
	var img;
	var _self = this;
	if (this._imgCache) {
		img = this._imgCache;
		if (_self._map) {
			_self._map._ctx.drawImage(img, _self._x * _self._map._config.CELLSIZE, _self._y * _self._map._config.CELLSIZE, img.width, img.height);
		}
	} else {
		img = new Image();
		img.onload = function() {
			if (_self._map) {
				_self._map._ctx.drawImage(this, _self._x * _self._map._config.CELLSIZE, _self._y * _self._map._config.CELLSIZE, this.width, this.height);
			}
			_self._imgCache = this;
			_self._w = this.width / _self._map._config.CELLSIZE;
			_self._h = this.height / _self._map._config.CELLSIZE;
		};
		img.src = this._res;
	}
    return this;
};

var BlueHuman = function() {
	Human.apply(this, arguments);
	this._res = 'static/images/human-blue.png';
	return this;
};
extend(BlueHuman, Human);

var GoldHuman = function() {
	Human.apply(this, arguments);
	this._res = 'static/images/human-gold.png';
	return this;
};
extend(GoldHuman, Human);

var PinkHuman = function() {
	Human.apply(this, arguments);
	this._res = 'static/images/human-pink.png';
	return this;
};
extend(PinkHuman, Human);

var Hill = function() {
	Human.apply(this, arguments);
	this._res = 'static/images/hill.png';
	return this;
};
extend(Hill, Human);

window.requestAnimationFrame = window.requestAnimationFrame 
	|| window.mozRequestAnimationFrame 
	|| window.webkitRequestAnimationFrame 
	|| window.msRequestAnimationFrame
	|| function(callback){
		window.setTimeout(callback, 1000 / 60);
	};

function extend(Child, Parent) {
　　var F = function() {};　　　　
	F.prototype = Parent.prototype;　　　　
	Child.prototype = new F();　　　　
	Child.prototype.constructor = Child;　　　　
	Child.uber = Parent.prototype;　　
}