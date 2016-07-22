function Slider(opt) {
    this.wrap = opt.wrap;
    this.data = opt.data;
    this.len = opt.data.length;
    this.threshold = opt.threshold || 10;
    this.duration = opt.duration || '0.2s';
    this.timing = opt.timing || 'ease-in';
    this.transition = [];
    this.idx = 0;
    this.init();
    this.renderDOM();
    this.bindDOM();
};

Slider.prototype.init = function() {
    this.winWidth = window.innerWidth;
    this.winHeight = window.innerHeight;
    this.transition.push('transform');
    this.transition.push(this.duration);
    this.transition.push(this.timing); 
};

Slider.prototype.renderDOM = function() {
    var wrap = this.wrap;
    var data = this.data;
    var len = this.len;
    this.outer = document.createElement('ul');
    this.outer.className = 'imgbox';
    for (var i = 0; i < len; i++) {
        var li = document.createElement('li');
        var val = data[i];
        li.style.height = this.winHeight + 'px';
        li.style.webkitTransform = 'translate3d(' + this.winWidth * i + 'px,0,0)';
        li.innerHTML = '<img width="100%" src="' + val.src + '">';
        this.outer.appendChild(li);
    }
    wrap.appendChild(this.outer);
}

Slider.prototype.bindDOM = function() {
    var _that = this;
    var outer = this.outer;
    var lis = outer.getElementsByTagName('li');
    var startHandler = function(evt) {
        _that.touchStartX = evt.touches[0].pageX;
        _that.touchStartTime = (new Date().getTime());
        _that.offsetX = 0;
    };
    var moverHandler = function(evt) {
        evt.preventDefault();
        _that.touchMoveX = evt.touches[0].pageX;
        _that.offsetX = _that.touchMoveX - _that.touchStartX;
        var idx = _that.idx;
        if (lis[idx + 1] && _that.offsetX <= 0) {
            move(1);
        }
        if (lis[idx - 1] && _that.offsetX > 0) {
            move(-1);
        }

        function move(n) {
            lis[idx].style.webkitTransform = 'translate3d(' + _that.offsetX + 'px,0,0)'
            lis[idx].style.webkitTransition = 'none';
            lis[idx + n].style.webkitTransform = 'translate3d(' + (_that.winWidth * n + _that.offsetX) + 'px,0,0)';
            lis[idx + n].style.webkitTransition = 'none';
        }
    };
    var endHandler = function(evt) {
        _that.touchEndTime = (new Date().getTime());
        var touchTime = _that.touchEndTime - _that.touchStartTime;
        var idx = _that.idx;
        var threshold = _that.winWidth / _that.threshold;
        if (lis[idx + 1] && _that.offsetX < 0) {
            go(1);
        } else if (lis[idx - 1] && _that.offsetX > 0) {
            go(-1);
        }

        function go(n) {
            if (-_that.offsetX * n > threshold) {
                lis[idx + n].style.webkitTransform = 'translate3d(0,0,0)';
                lis[idx + n].style.webkitTransition = _that.transition.join(' ');
                lis[idx].style.webkitTransform = 'translate3d(' + (-_that.winWidth * n) + 'px,0,0)';
                lis[idx].style.webkitTransition = _that.transition.join(' ');
                if (idx < _that.len) {
                    _that.idx = idx + n;
                }
            } else {
                lis[idx].style.webkitTransform = 'translate3d(0,0,0)';
                lis[idx + n].style.webkitTransform = 'translate3d(' + (_that.winWidth * n) + 'px,0,0)';
            }
        }
    };
    outer.addEventListener('touchstart', startHandler);
    outer.addEventListener('touchmove', moverHandler);
    outer.addEventListener('touchend', endHandler);
}

var data = [{
    src: "img/13.jpg"
}, {
    src: "img/26.jpg"
}, {
    src: "img/30377507_p0.jpg"
}, {
    src: "img/37735432_p0.png"
}, {
    src: "img/44549299_p0.jpg"
}, {
    src: "img/46681568_p0.jpg"
}];

var slider = new Slider({
    "wrap": document.getElementById('container'),
    "data": data
});
