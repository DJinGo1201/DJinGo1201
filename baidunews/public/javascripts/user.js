$(document).ready(function() {
    $('#signup-bt').click(function() {
        event.preventDefault();
        var form = 'signup';
        var user = isNull(form);
        if (user) {
            $.ajax({
                url: '/signup/save',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    "user": JSON.stringify(user)
                },
                success: function(data) {
                    if (data.exist) {
                        $('.warn').remove();
                        $('<p>').addClass('warn').text('用户已存在').appendTo('.username');
                    } else {
                        window.location = '/login';
                    }
                }
            })
        };
    })
})

$(document).ready(function() {
    $('#login-bt').click(function() {
        event.preventDefault();
        var form = 'login';
        var user = isNull(form);
        if (user) {
            $.ajax({
                url: '/login/match',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    "user": JSON.stringify(user)
                },
                success: function(data) {
                    if (!data.match) {
                        $('.warn').remove();
                        $('<p>').addClass('warn').text('用户名或密码错误').appendTo('.password');
                    } else {
                        window.location = '/admin';
                    }
                }
            })
        };
    })
})



function isNull(form) {
    var pattern = /^[ ]+$/;
    var username = $('#username').val();
    var password = $('#password').val();
    var data = $('#' + form).serializeArray();
    var jsonObj = {};
    if (!username) {
        $('.warn').remove();
        $('<p>').addClass('warn').text('请输入用户名').appendTo('.username');
        return false;
    }
    if (!password) {
        $('.warn').remove();
        $('<p>').addClass('warn').text('请输入密码').appendTo('.password');
        return false;
    }
    $.each(data, function() {
        if (jsonObj[this.name]) {
            if (!jsonObj[this.name].push) {
                jsonObj[this.name] = [jsonObj[this.name]];
            }
            jsonObj[this.name].push(this.value);
        } else {
            jsonObj[this.name] = this.value;
        }
    });
    return jsonObj;
}
