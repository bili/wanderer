(function() {
    var _ = {};
    _.type = function(obj) {
        var types = {
            "[object String]": "STRING",
            "[object Number]": "NUMBER",
            "[object Date]": "DATE",
            "[object Function]": "FUNCTION",
            "[object Array]": "ARRAY",
            "[object Object]": "OBJECT",
            "[object Null]": "NULL",
            "[object Boolean]": "BOOLEAN",
            "[object RegExp]": "REGEXP",
            "[object Undefined]": "UNDEFINED"
        };
        return types[Object.prototype.toString.call(obj)];
    }

    _.isString = function(obj) {
        return _.type(obj) === "STRING";
    }

    _.isStringF = function(obj) {
        return _.type(obj) === "STRING" && obj.trim() != '';
    }

    _.isNumber = function(obj) {
        return _.type(obj) === "NUMBER";
    }

    _.isDate = function(obj) {
        return _.type(obj) === "DATE";
    }

    _.isFunction = function(obj) {
        return _.type(obj) === "FUNCTION";
    }

    _.isArray = function(obj) {
        return _.type(obj) === "ARRAY";
    }

    _.isObject = function(obj) {
        return _.type(obj) === "OBJECT";
    }

    _.isNull = function(obj) {
        return _.type(obj) === "NULL";
    }

    _.isBoolean = function(obj) {
        return _.type(obj) === "BOOLEAN";
    }

    _.isRegExp = function(obj) {
        return _.type(obj) === "REGEXP";
    }

    _.isUndefined = function(obj) {
        return _.type(obj) === "UNDEFINED";
    }

    _.isChildOf = function(child, parent) {
        return child instanceof parent;
    }

    _.Getter = function(k) {
        return this['__'+k];
    }

    _.Setter = function(k, v) {
        if (_.isUndefined(k)) return this;
        if (!_.isUndefined(v) && _.isString(k)) {
            this['__'+k] = v;
            return this;
        }
        var ks = k;
        if (_.isObject(k)) {
            for (var i in ks) this['__'+i] = ks[i];
            return this;
        }
        return this;
    }

    _.Data = function(k, v) {
        if (arguments.length === 1 && _.isString(k)) return _.Getter.call(this, k);
        return _.Setter.call(this, k, v);
    }

    _.GUID = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    }

    _.namespace = function(namespaceStr) {
        var cur = window;
        var ns = namespaceStr.split('.');
        for (var i = 0, len = ns.length; i < len; i++) {
            if (!cur[ns[i]]) cur[ns[i]] = {};
            cur = cur[ns[i]];
        }
    };

    _.tmpl = function(str, data) {
        if (!_.isObject(data) || !_.isString(str)) return '';
        str = str.replace(/#{([^}]*)}/g, function(val, replacement) {
            return eval('data.' + replacement);
        });
        return str;
    }

    var root = typeof exports !== "undefined" && exports !== null ? exports : window;
    root._ = _;

}());
