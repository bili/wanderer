var Map = function(cvs, ctx) {
    this._elems = [];
    this._cvs = cvs;
    this._ctx = ctx;
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
		_.log('repaint', e._res);
        e.repaint();
    });
    return this;
};

var Human = function() {
    this._map = null;
    this._x = 0;
    this._y = 0;
    this._res = "static/images/human.png";
	this._imgCache = null;
    return this;
}
Human.prototype.moveTo = function(x, y) {
    this._x = x;
    this._y = y;
    return this;
};
Human.prototype.repaint = function() {
	var img;
	var _self = this;
	if (this._imgCache) {
		img = this.imgCache;
		if (_self._map) {
			_self._map._ctx.drawImage(img, _self._x, _self._y, img.width, img.height);
		}
	} else {
		img = new Image();
		img.onload = function() {
			if (_self._map) {
				_self._map._ctx.drawImage(this, _self._x, _self._y, this.width, this.height);
			}
			_self.imgCache = this;
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
