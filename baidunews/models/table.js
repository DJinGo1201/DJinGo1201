module.exports = function(db, cb) {
    db.define('news', {
        newsId: {
            type: 'serial',
            key: true
        },
        newsTitle: String,
        newsImages: String,
        newsContent: String,
        newsSource: String,
        date: String,
        categoryId: Number,
        categoryName: String
    });
    db.define('category', {
        categoryId: {
            type: 'serial',
            key: true
        },
        categoryName: String,
        describe: String,
        date: String
    });
    db.define('user', {
        userid: {
            type: 'serial',
            key: true
        },
        username: String,
        password: String
    });
    return cb();
};
