function shuffle(array) {
    // Fisher-Yates Shuffle
    var n = array.length, t, i;

    while (n) {
        i = Math.random() * n-- | 0;
        t = array[n];
        array[n] = array[i];
        array[i] = t;
    }
    return array;
}

var methods = {
    shuffle: function(mode) {
        var value = this.val;

        if (mode === 'words') {
            value = shuffle(value.split(' ')).join(' ');

            this.val = value;
        } else if (mode === 'chars') {
            value.split(' ').forEach(function (item) {
                value = value.replace(item, shuffle(item.split('')).join(''));
            });

            this.val = value;
        } else {
            value = shuffle(value.split('')).join('');

            this.val = value;
        };

        return this;
    },

    random: function() {
        var result;

        function unrandom(row) {
            var _start = '{';
            var _inside = '|';
            var _end = '}';
            var start = row.indexOf(_end);
            var end = row.lastIndexOf(_start, start);
            var inside = row.substring(end + 1, start);
            var strings = inside.split(_inside);
            var s = Math.floor((Math.random() * strings.length));

            result = row.substring(0, end) + strings[s] + row.substring(start + 1, row.length);

            if (start !== -1) {
                unrandom(result);
            };
        };

        unrandom(this.val);
        this.val = result;

        return this;
    },

    times: function(n) {
        var beforeArr;
        var toAdd;

        if (this._times && this.val !== this._times) {
            // after first time
            toAdd = this.val.replace(this._times, '');
            beforeArr = this.val.slice(0, -Math.abs(toAdd.length));
        } else {
            // first time
            toAdd = this.val;
            beforeArr = '';
        };

        this.val = beforeArr + new Array(n + 1).join(toAdd);
        this._times = this.val;

        return this;
    },

    every: function(func, separator) {
        if (!separator) {
            separator = '';
        }

        var values = this.val.split(separator);

        if (typeof (func) === 'function') {
            var arr = [];

            for (var i = 0; i < values.length; i++) {
                var r = func(values[i], i);

                arr.push(r);
            }

            this.val = arr.join(separator);
            this._times = this.val;
        };

        return this;
    },

    after: function(func) {
        if (typeof (func) === 'function') {
            this.val = func(this.val);
        };

        return this;
    },

    add: function(value) {
        this.val = this.val + value;

        return this;
    },

    replace: function(data) {
        for (var key in data) {
            var from = key;
            var to = data[key];
            var re;

            try {
                re = new RegExp(from, 'g');
            } catch (err) {
                re = new RegExp('[' + from + ']', 'g');
            }

            this.val = this.val.replace(re, to);
        }

        return this;
    }
};

// init
function C(str) {
    if (!(this instanceof C)) {
        return new C(str);
    };

    this.val = str;
};

Object.keys(methods).forEach(function(m) {
    C.prototype[m] = methods[m];
});

let c = C;

export default c;
