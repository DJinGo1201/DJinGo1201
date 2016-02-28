exports.hasLogin = function(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
}

exports.login = function(req, res) {
    res.render('page/login', {
        title: '登陆'
    });
}

exports.signup = function(req, res) {
    res.render('page/signup', {
        title: '注册'
    });
}

exports.userMatch = function(req, res) {
    var data = req.body.user;
    var _user = JSON.parse(data);
    User.find({
        username: _user.username
    }, function(err, user) {
        if (err) throw err;
        if(!user[0]){
            return res.json({
                match: false
            })
        }
        if (user[0].password == _user.password) {
            req.session.user = _user.username;
            res.json({
                match: true
            })
        } else {
            res.json({
                match: false
            })
        }
    })
}


exports.userSave = function(req, res) {
    var data = req.body.user;
    var _user = JSON.parse(data);
    User.find({
        username: _user.username
    }, function(err, user) {
        if (err) throw err;
        if (user.length != 0) {
            if (err) throw err;
            res.json({
                exist: true
            });
        } else {
            User.create({
                username: _user.username,
                password: _user.password
            }, function(err) {
                if (err) throw err;
                res.json({
                    exist: false
                });
            });
        }
    });
};

exports.logout = function(req, res) {
    delete req.session.user;
    res.redirect('/login');
}
