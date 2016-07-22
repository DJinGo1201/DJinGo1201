(function() {
    var Util = (function() {
        var prefix = 'reader';

        var StorageGetter = function(key) {
            return localStorage.getItem(prefix + key);
        };

        var StorageSetter = function(key, val) {
            return localStorage.setItem(prefix + key, val);
        };

        var getJonp = function(url, callback) {
            return $.jsonp({
                url: url,
                cache: true,
                callback: 'duokan_fiction_chapter',
                success: function(result) {
                    var data = $.base64.decode(result);
                    var json = decodeURIComponent(escape(data));
                    var jsonParse = JSON.parse(json);
                    callback(jsonParse);
                },
                error: function(xOptions, textStatus) {
                    console.log("status" + textStatus);
                }
            });
        };

        return {
            StorageGetter: StorageGetter,
            StorageSetter: StorageSetter,
            getJonp: getJonp
        };
    })();

    var readerModel = ReaderModel();
    var readerBaseFrame = ReaderBaseFrame();

    function main() {
        readerBaseFrame.userSet();
        readerModel.init(readerBaseFrame.contentFrame);
        EvenHandler();
    }

    function ReaderModel() {
        //to do 数据交互
        var ChapterId,
            ChapterTotal = [],
            ChapterIndex = 0;
        var getChapterInfo = function(callback) {
            $.get('../data/chapter.json', function(data) {
                ChapterId = data.chapters[ChapterIndex].chapter_id;
                for (var i = 0, len = data.chapters.length; i < len; i++) {
                    ChapterTotal.push(data.chapters[i].chapter_id);
                }
                callback && callback();
            }, 'json');
        };

        var getContent = function(callback) {
            $.get('../data/data_' + ChapterId + '.json', function(data) {
                if (data.result == 0) {
                    var jsonpUrl = data.jsonp;
                    Util.getJonp(jsonpUrl, function(data) {
                        data.chapterId = ChapterId;
                        data.chapterIndex = ChapterIndex;
                        var content = JSON.stringify(data);
                        Util.StorageSetter('localContent', content);
                        callback && callback(data);
                    });
                }
            }, 'json');
        };

        var nextContent = function(callback) {
            if (!ChapterTotal[ChapterIndex + 1]) {
                return false;
            }
            ChapterIndex++;
            ChapterId = ChapterTotal[ChapterIndex];
            getContent(callback);
            $(window).scrollTop(0);
        };

        var prevContent = function(callback) {
            if (ChapterIndex == 0) {
                return false;
            }
            ChapterIndex--;
            ChapterId = ChapterTotal[ChapterIndex];
            getContent(callback);
            $(window).scrollTop(0);
        };

        var init = function(callback) {
            getChapterInfo(function() {
                if (Util.StorageGetter('localContent')) {
                    var dataStr = Util.StorageGetter('localContent');
                    var data = JSON.parse(dataStr);
                    ChapterId = data.chapterId;
                    ChapterIndex = data.chapterIndex;
                    callback(data);
                } else {
                    getContent(callback);
                }
            });
        };

        return {
            init: init,
            nextContent: nextContent,
            prevContent: prevContent
        };
    }

    function ReaderBaseFrame() {
        //to do 渲染基本的UI结构
        var userSet = function() {
            var fontSize = Util.StorageGetter('FontSize') || 16;
            var bgClass = Util.StorageGetter('BgClass') || '.bg-color-1';
            if (fontSize) {
                $('#chapter_content').css('font-size', fontSize + 'px');
            }
            if (bgClass) {
                $("body").attr('class', bgClass);
            }
        };

        var contentFrame = function(data) {
            var content = [];
            content.push('<h4 class="chapter_title" id="chapter_title">');
            content.push(data.t);
            content.push('</h4>');
            for (var i = 0, len = data.p.length; i < len; i++) {
                content.push('<p>');
                content.push(data.p[i]);
                content.push('</p>');
            }
            $('#chapter_content').html(content.join(''));
        };

        return {
            userSet: userSet,
            contentFrame: contentFrame
        };
    }

    function EvenHandler() {
        // to do 事件绑定
        var Dom = {
            $topNav: $('#top-nav'),
            $bottomNav: $('#bottom-nav'),
            $navPannel: $('#nav-pannel'),
            $fontSet: $('#font-set'),
            $chapterContent: $('#chapter_content'),
            $modeSet: $('#mode-set'),
            $body: $('body')
        };
        var win = $(window);
        var initFontSize = Util.StorageGetter('FontSize') || 16;
        $('#chapter_content').click(function() {
            Dom.$topNav.toggle();
            Dom.$bottomNav.toggle();
            Dom.$navPannel.hide();
            Dom.$fontSet.removeClass('font-action');
        });

        Dom.$fontSet.click(function() {
            Dom.$navPannel.toggle();
            Dom.$fontSet.toggleClass('font-action');
        });

        $('#large-font').click(function() {
            if (initFontSize >= 20) {
                return false;
            }
            initFontSize++;
            Util.StorageSetter('FontSize', initFontSize);
            Dom.$chapterContent.css('font-size', initFontSize + 'px');
        });

        $('#small-font').click(function() {
            if (initFontSize <= 12) {
                return false;
            }
            initFontSize--;
            Util.StorageSetter('FontSize', initFontSize);
            Dom.$chapterContent.css('font-size', initFontSize + 'px');
        });

        $('.bg-container').click(function() {
            if (Dom.$modeSet.hasClass('neigh')) {
                return false;
            }
            var $this = $(this);
            var bgClass = $this.attr('data-bg');
            Dom.$body.attr('class', bgClass);
            Util.StorageSetter('BgClass', bgClass);
        });

        Dom.$modeSet.click(function() {
            Dom.$modeSet.toggleClass('neigh');
            if (Dom.$modeSet.hasClass('neigh')) {
                Dom.$modeSet.find('p').text('夜间');
                Dom.$body.addClass('bg-color-5');
            } else {
                Dom.$modeSet.find('p').text('白天');
                Dom.$body.removeClass('bg-color-5');
            }
        });

        $('#next').click(function() {
            readerModel.nextContent(readerBaseFrame.contentFrame);
        });

        $('#prev').click(function() {
            readerModel.prevContent(readerBaseFrame.contentFrame);
        });

        win.scroll(function() {
            Dom.$topNav.hide();
            Dom.$bottomNav.hide();
            Dom.$navPannel.hide();
            Dom.$fontSet.removeClass('font-action');
        });
    }

    main();

})();
