$(document).ready(function() {
    $('#loadmore').on('tap', loadmore);
    $('.nav-wrap li').each(function(i) {
        if (i == 0) {
            var categoryId = $(this).attr('id');
            $(this).find('.underline').addClass('active');
            $(this).addClass('selected');
            $.ajax({
                url: '/index/' + categoryId,
                type: 'GET',
                dataType: 'JSON',
                beforeSend: function() {
                    $('.loading').show();
                },
                data: {
                    'category': categoryId
                },
                success: function(data) {
                    $('.loading').hide();
                    appendTo(data);
                    $('#loadmore').css('display', 'block');
                }
            });
        };
        if (i % 5 == 4) {
            $(this).find('.erect').remove();
        };
    });
})


$(document).ready(function() {
    var select = $('.nav-wrap li');
    select.each(function() {
        $(this).on('tap', function() {
            var categoryId = $(this).attr('id');
            $(this).find('.underline').addClass('active');
            select.not($(this)).find('.underline').removeClass('active');
            $(this).addClass('selected');
            select.not($(this)).removeClass('selected');
            $.ajax({
                url: '/index/' + categoryId,
                type: 'GET',
                dataType: 'JSON',
                beforeSend: function() {
                    $('#loadmore').hide();
                    $('.row').remove();
                    $('.loading').show();
                },
                data: {
                    'category': categoryId
                },
                success: function(data) {
                    var objEvt=$._data($("#loadmore")[0], "events");
                    $('.loading').hide();
                    appendTo(data);
                    if (data.length > 3) {
                        $('#loadmore').css('display', 'block');
                    }
                    if (!objEvt) {
                        $('#loadmore').on('tap',loadmore);
                        $('.loadtext').text('点击加载更多');
                    };
                }
            });
        })
    })

})

function loadmore() {
    var categoryId = $('.selected').attr('id');
    var count = $('.row').length;
    $.ajax({
        url: '/loadmore',
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
            $('.fa-spin').show();
            $('.loadtext').text('加载中...');
        },
        data: {
            'data': JSON.stringify({
                'category': categoryId,
                'count': count
            })
        },
        success: function(data) {
            appendTo(data);
            if (data.length < 4) {
                $('#loadmore').off('tap');
                $('.loadtext').text('没有更多了');
                $('.fa-spin').hide();
            } else {
                $('.fa-spin').hide();
                $('.loadtext').text('点击加载更多');
            }
        }
    })
}



function appendTo(data) {
    $.each(data, function(i) {
        var row = $('<div>').addClass('row').attr('id', data[i].newsId).appendTo($('.content'));
        var image = $('<div>').addClass('image').appendTo(row);
        var title = $('<div>').addClass('title').appendTo(row);
        var infor = $('<div>').addClass('infor').appendTo(row);
        var date = moment(data[i].date, 'YYYY-MM-DD HH:mm:ss', 'zh-cn').fromNow()
        $('<img>').attr({
            src: data[i].newsImages,
            alt: data[i].newsTitle,
            width: '95',
            height: '68'
        }).appendTo(image);
        $('<p>').text(data[i].newsTitle).appendTo(title);
        $('<span>').addClass('date').text(date).appendTo(infor);
        $('<span>').addClass('src').text(data[i].newsSource).appendTo(infor);
    })
}
