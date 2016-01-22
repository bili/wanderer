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
    
    this._grid = new PF.Grid(this._w, this._h);
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
Map.prototype.remove = function(x, y) {
    this._ctx.clearRect(x*this._config.CELLSIZE, y*this._config.CELLSIZE, (x+1)*this._config.CELLSIZE,(y+1)*this._config.CELLSIZE+this._config.CELLSIZE);
    _.log(x*this._config.CELLSIZE, y*this._config.CELLSIZE, (x+1)*this._config.CELLSIZE,(y+1)*this._config.CELLSIZE+this._config.CELLSIZE);
    var that = this;
    this._elems.forEach(function(item, idx) {
        if (item._x == x, item._y == y) {
            that._elems.splice(idx, 1);
        }
    });
    return this;
};
Map.prototype.isRock = function(x, y) {
	var flag = false;
    this._elems.forEach(function(e) {
        if (e._x == x && e._y == y && _.isChildOf(e, Rock)) {
        	_.log(x, y, 'is Rock');
        	flag = true;
        	return;
        }
    });
    return flag;
};
Map.prototype.findPath = function(start, end) {
    var finder = new PF.BiDijkstraFinder({
        allowDiagonal: true,
        // dontCrossCorners: true
        heuristic: function(dx, dy) {
            return Math.min(dx, dy);
        }
    });
    var path = finder.findPath(start._x, start._y, end._x, end._y, this._grid.clone());
    // _.log('Path from A('+[start._x, start._y].join(',')+'),' + ' to B('+[end._x, end._y].join(',')+'): ', JSON.stringify(path));
    return path;
};

var Thing = function(x, y, isBlocked) {
    this._map = null;
    this._x = x || 0;
    this._y = y || 0;
	this._w = 0;
	this._h = 0;
    this._isBlocked = isBlocked;
    return this;
};
Thing.prototype.setPosition = function(x, y, isBlocked) {
    this._x = x;
    this._y = y;
    this._isBlocked = typeof isBlocked == 'undefined' ?  this._isBlocked : isBlocked;
    this._map._grid.setWalkableAt(this._x, this._y, !this._isBlocked);
    return this;
};
Thing.prototype.repaint = function() {
	return this;
};

var Human = function() {
	Thing.apply(this, arguments);
    this._res = "static/images/human.png";
    this._isBlocked = true;
	this._imgCache = null;
    return this;
};
extend(Human, Thing);
Human.prototype.moveTo = function(x, y) {
	if (this._map.isRock(x, y)) {
		_.log('Hill! Can not move ahead.'); 
		return;
	}
	this.setPosition(this._x, this._y, false);
	this.setPosition(x, y, true);
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

var Rock = function() {
	Thing.apply(this, arguments);
    this._isBlocked = true;
	this._res = 'static/images/rock.png';
	return this;
};
extend(Rock, Thing);

Rock.prototype.repaint = function() {
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
var Hill = function() {
	Thing.apply(this, arguments);
    this._isBlocked = true;
	this._res = 'static/images/hill.png';
	return this;
};
extend(Hill, Thing);

Hill.prototype.repaint = function() {
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
var Tree = function() {
	Thing.apply(this, arguments);
	this._res = 'static/images/tree.png';
    this._isBlocked = false;
	return this;
};
extend(Tree, Thing);

Tree.prototype.repaint = function() {
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