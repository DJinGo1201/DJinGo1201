(function($) {
    var I = 0;
    var _supportCss = (function(temp) {
        if ((temp.style['transition'] != undefined || temp.style['WebkitTranstion'] != undefined) &&
            (temp.style['transform'] != undefined || temp.style['WebkitTransform'] != undefined)) {
            return true;
        } else {
            return false;
        }
    })(document.createElement('div'));
    var FullPage = (function() {
        function FullPage(elem, opts) {
            this.options = $.extend(true, $.fn.FullPage.defaults, opts || {});
            this.container = elem;
            this.init();
        }
        FullPage.prototype = {
            init: function() {
                this.selectors = this.options.selectors;
                this.sections = this.selectors.sections;
                this.section = this.selectors.section;
                this.direction = this.options.direction == 'vertical' ? true : false;
                this.pagesCount = this.getPagesCount();
                this.curContainerLength = this.getContainerLength();
                this.ableSrocll = true;
                this.index = (this.options.index > this.pagesCount || this.index < 0) ? 0 : this.options.index;
                if (!this.direction) {
                    this._initLayout();
                }
                if (this.options.pagination) {
                    this._initPages();
                }
                this._initEvent();
            },
            getPagesCount: function() {
                return $(this.section).length;
            },
            getContainerLength: function() {
                return this.direction ? this.container.height() : this.container.width();
            },
            prev: function() {
                if (this.index > 0) {
                    this.index--;
                } else if (this.options.loop) {
                    this.index = this.pagesCount - 1;
                }
                this._scrollPage();
            },
            next: function() {
                if (this.index < this.pagesCount - 1) {
                    this.index++;
                } else if (this.options.loop) {
                    this.index = 0;
                }
                this._scrollPage();
            },
            _initLayout: function() {
                var wrapWidth = (this.pagesCount * 100) + '%',
                    cellWidth = (100 / this.pagesCount).toFixed(2) + '%';
                $(this.sections).width(wrapWidth);
                $(this.section).width(cellWidth).css('float', 'left');
            },
            _initPages: function() {
                var pageDom = $(this.selectors.page);
                var pageHtml = ['<ul>'];
                for (var i = 0; i < this.pagesCount; i++) {
                    pageHtml.push('<li class="pagination-bullet"></li>');
                }
                pageHtml.push('</ul>');
                pageDom.append(pageHtml.join(''));
                if (this.direction) {
                    var wrapHeight = pageDom.find('ul').height();
                    pageDom.addClass('pagination-vertical');
                    pageDom.css('margin-top', (-wrapHeight / 2).toFixed(2) + 'px');
                } else {
                    pageDom.addClass('pagination-horizontal');
                }
                this.pageItem = pageDom.find('.pagination-bullet');
                this.curPage = this.pageItem.eq(this.index);
                this.curPage.addClass('active');
            },
            _initEvent: function() {
                var _that = this;
                this.container.on('click', '.pagination-bullet', function() {
                    if (_that.ableSrocll) {
                        _that.index = $(this).index();
                        _that._scrollPage();
                    }
                });
                this.container.on('mousewheel DOMMouseScroll', function(e) {
                    if (_that.ableSrocll) {
                        var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
                        if (delta > 0 && (_that.index > 0 || _that.options.loop)) {
                            _that.prev();
                        } else if (delta < 0 && (_that.index < (_that.pagesCount - 1) || _that.options.loop)) {
                            _that.next();
                        }
                    }
                });
                if (this.options.keyboard) {
                    $(window).on('keydown', function(e) {
                        var keyCode = e.keyCode;
                        if (_that.ableSrocll) {
                            if (keyCode == 37 || keyCode == 38) {
                                _that.prev();
                            } else if (keyCode == 39 || keyCode == 40) {
                                _that.next();
                            }
                        }
                    })
                }
                this.container.on('touchstart', function(e) {
                    if (_that.ableSrocll) {
                        var touch = e.touches[0];
                        _that.touchStart = _that.direction ? touch.pageY : touch.pageX;
                    }
                });
                this.container.on('touchmove', function(e) {
                    if (_that.ableSrocll) {
                        var touch = e.touches[0];
                        var touchMove = _that.direction ? touch.pageY : touch.pageX;
                        var touchOffset = touchMove - _that.touchStart;
                        if (touchOffset < -50 && (_that.index < (_that.pagesCount - 1) || _that.options.loop)) {
                            _that.next();
                        } else if (touchOffset > 50 && (_that.index > 0 || _that.options.loop)) {
                            _that.prev();
                        }
                    }
                });
                $(window).on('resize', function(e) {
                    if (_that.curContainerLength != _that.getContainerLength()) {
                        _that.curContainerLength = _that.getContainerLength();
                        _that._scrollPage();
                    }
                });
                this.container.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend', function() {
                    _that.ableSrocll = true;
                    _that.curPage = _that.pageItem.eq(_that.index)
                    _that.curPage.addClass('active');
                    _that.pageItem.not(_that.curPage).removeClass('active');
                    if (_that.options.callback && $.type(_that.options.callback) === 'function') {
                        _that.options.callback();
                    }
                })
            },
            _scrollPage: function() {
                var _that = this;
                this.ableSrocll = false;
                if (_supportCss) {
                    var containerLength = this.curContainerLength;
                    var translate = this.direction ? 'translateY(' + (-containerLength * this.index) + 'px)' : 'translateX(' + (-containerLength * this.index) + 'px)';
                    $(this.sections).css({
                        'transition': 'all ' + this.options.duration + 'ms ' + this.options.easing,
                        '-webkit-transition': 'all ' + this.options.duration + 'ms ' + this.options.easing,
                        'transform': translate,
                        '-webkit-transform': translate
                    });
                } else {
                    var dest = $(this.section).eq(this.index).position();
                    var animateCss = this.direction ? { 'top': (-dest.top) + 'px' } : { 'left': (-dest.left) + 'px' };
                    $(this.sections).css('position', 'absolute');
                    $(this.sections).animate(animateCss, this.options.duration, function() {
                        _that.ableSrocll = true;
                        _that.curPage = _that.pageItem.eq(_that.index)
                        _that.curPage.addClass('active');
                        _that.pageItem.not(_that.curPage).removeClass('active');
                        if (_that.options.callback && $.type(_that.options.callback) === 'function') {
                            _that.options.callback();
                        }
                    })
                }
            }
        }

        return FullPage;
    })();

    $.fn.FullPage = function(opts) {
        return this.each(function() {
            var _that = $(this),
                instance = _that.data('FullPage');
            if (!instance) {
                instance = new FullPage(_that, opts);
                _that.data('FullPage', instance);
            }
        });
    };

    $.fn.FullPage.defaults = {
        selectors: {
            sections: '.sections',
            section: '.section',
            page: '.pages'
        },
        index: 0,
        easing: 'ease',
        duration: 1000,
        pagination: true,
        loop: false,
        keyboard: true,
        direction: 'vertical',
        callback: ''
    }
})(jQuery);
