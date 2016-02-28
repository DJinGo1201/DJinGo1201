var moment = require('moment');

exports.admin = function(req, res) {
    Category.find({}, function(err, category) {
        res.render('page/admin', {
            username:req.session.user,
            category: category
        })
    });
}

exports.newsList = function(req, res) {
    var category = req.params.id;
    News.find({
        categoryId: category
    }, function(err, news) {
        Category.find({
            categoryId: category
        }, function(err, category) {
            res.render('page/content', {
                username:req.session.user,
                newsList: news.reverse(),
                category: category
            });
        })
    });
}

exports.newsDetail = function(req, res) {
    var newsid = req.params.id;
    News.get(newsid, function(err, news) {
        if (err) throw err;
        res.render('page/article', {
            username:req.session.user,
            news: news
        });
    });
}


exports.newsAdd = function(req, res) {
    var emptyNews = [{
        newsId: "",
        newsTitle: "",
        newsImages: "",
        newsContent: "",
        newsSource: "",
        date: "",
        categoryId: "",
        categoryName: ""
    }];
    Category.find({}, function(err, category) {
        res.render('page/add', {
            username:req.session.user,
            title: "添加内容",
            category: category,
            news: emptyNews
        })
    });
}

exports.newsSave = function(req, res) {
    var data = req.body.newsData;
    var row = JSON.parse(data);
    if (!row.newsid) {
        News.create({
            newsTitle: row.newstitle,
            newsImages: row.newsimages,
            newsContent: row.newscontent,
            newsSource: row.newssource,
            date: moment().format("YYYY-MM-DD HH:mm:ss"),
            categoryId: row.categoryId,
            categoryName: row.categoryName
        }, function(err) {
            if (err) throw err;
            res.json({
                url: '/newslist/' + row.categoryId
            })
        });

    } else {
        News.get(row.newsid, function(err, news) {
            news.save({
                newsTitle: row.newstitle,
                newsImages: row.newsimages,
                newsContent: row.newscontent,
                newsSource: row.newssource,
                date: moment().format("YYYY-MM-DD HH:mm:ss"),
                categoryId: row.categoryId,
                categoryName: row.categoryName
            }, function(err) {
                if (err) throw err;
                res.json({
                    url: '/newslist/' + row.categoryId
                });
            });
        });
    }

}


exports.newsDelete = function(req, res) {
    var data = req.body.deleteid;
    var deleteid = JSON.parse(data);
    News.find({
        newsId:deleteid
    }).remove(function(err){
        if (err) throw err;
        res.json({
            success:true
        })
    })
}


exports.newsEdit = function(req, res) {
    var id = req.params.id;
    Category.find({}, function(err, category) {
        News.find({
            newsId: id
        }, function(err, news) {
            res.render('page/add', {
                username:req.session.user,
                title: "编辑内容",
                category: category,
                news: news
            })
        })
    });
}

exports.categoryList = function(req, res) {
    Category.find({}, function(err, category) {
        res.render('page/categorylist', {
            username:req.session.user,
            categoryList: category
        });
    });

}

exports.categoryAdd = function(req, res) {
    var emptyCategory = [{
        categoryId: "",
        categoryName: "",
        describe: ""
    }];
    res.render('page/addcategory', {
        username:req.session.user,
        title: "添加标签",
        category: emptyCategory
    });

}

exports.categorySave = function(req, res) {
    var data = req.body.categoryData;
    var row = JSON.parse(data);
    if (!row.categoryId) {
        Category.create({
            categoryName: row.categoryName,
            describe: row.describe,
            date: moment().format("YYYY-MM-DD HH:mm:ss")
        }, function(err) {
            if (err) throw err;
            res.json({
                url: '/category/list'
            });
        });
    } else {
        Category.get(row.categoryId, function(err, category) {
            category.save({
                categoryName: row.categoryName,
                describe: row.describe,
                date: moment().format("YYYY-MM-DD HH:mm:ss")
            }, function(err) {
                if (err) throw err;
                res.json({
                    url: '/category/list'
                });
            })
        })
    }

}


exports.categoryEdit = function(req, res) {
    var id = req.params.id;
    Category.find({
        categoryId: id
    }, function(err, category) {
        res.render('page/addcategory', {
            username:req.session.user,
            title: "编辑分类",
            category: category
        })
    })

}


exports.categoryDelete = function(req, res) {
    var data = req.body.deleteid;
    var deleteid = JSON.parse(data);
    News.find({
        categoryId: deleteid
    }).remove(function(err) {
        if (err) throw err;
        Category.get(deleteid, function(err, deleteCategory) {
            deleteCategory.remove(function(err) {
                if (err) throw err;
                res.json({
                    success: true
                });
            })
        })
    });
}


exports.allNews = function(req, res) {
    News.find({}, function(err, news) {
        if (err) throw err;
        res.render('page/allnews', {
            username:req.session.user,
            newsList: news
        })
    })
}

exports.search = function(req, res) {
    var keyword = req.body.keyword;
    News.find({}).where('newsTitle LIKE ? or categoryName LIKE ? or newsSource LIKE ? or newsContent LIKE ?', ['%' + keyword + '%', '%' + keyword + '%', '%' + keyword + '%', '%' + keyword + '%']).all(function(err, result) {
        if (err) throw err;
        res.json(result);
    })
}
