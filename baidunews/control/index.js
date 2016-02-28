exports.index = function(req, res) {
    Category.find({}, function(err, category) {
        res.render('index', {
            category: category
        })
    });
}

exports.loading = function(req, res) {
    var categoryId = req.params.id;
    News.find({
        categoryId: categoryId
    }).orderRaw("?? DESC", ['newsId']).limit(4).run(function(err, news) {
        if (err) throw err;
        res.json(news);
    });
}


exports.loadMore = function(req, res) {
    var data = req.body.data;
    var limit = JSON.parse(data);
    News.find({
        categoryId: limit.category
    }).orderRaw("?? DESC", ['newsId']).limit(4).offset(limit.count).run(function(err, news) {
        if (err) throw err;
        res.json(news);
    });
}
