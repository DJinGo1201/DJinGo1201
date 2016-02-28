var express = require('express');
var router = express.Router();
var orm=require('orm');
var control=require('../control/control');
var user=require('../control/user');
var index=require('../control/index')


orm.connect("mysql://root:@localhost/baidunewsdb", function(err, db) {
    if (err) throw err;
    db.load('../models/table', function(err) {
        Category = db.models.category;
        News = db.models.news;
        User=db.models.user
    })
});


/*index*/
router.get('/', index.index);
router.get('/index/:id',index.loading);
router.post('/loadmore',index.loadMore);

/*user*/
router.get('/login',user.login);
router.get('/signup',user.signup);
router.post('/signup/save',user.userSave);
router.post('/login/match',user.userMatch);
router.get('/logout',user.logout);


/*admin*/
router.get('/admin',user.hasLogin,control.admin);
router.get('/newslist/:id',user.hasLogin,control.newsList);
router.get('/news/details/:id',user.hasLogin,control.newsDetail);
router.get('/news/all',user.hasLogin,control.allNews);
router.get('/news/add',user.hasLogin,control.newsAdd);
router.post('/news/add/save',user.hasLogin,control.newsSave);
router.post('/news/delete',user.hasLogin,control.newsDelete);
router.get('/news/edit/:id',user.hasLogin,control.newsEdit);
router.get('/category/list',user.hasLogin,control.categoryList);
router.get('/category/add',user.hasLogin,control.categoryAdd);
router.post('/category/add/save',user.hasLogin,control.categorySave);
router.get('/category/edit/:id',user.hasLogin,control.categoryEdit);
router.post('/category/delete',user.hasLogin,control.categoryDelete);
router.post('/search/result',user.hasLogin,control.search);
router.get('/search',user.hasLogin,function(req,res){
    res.render('page/search',{
        username:req.session.user
    });
});


module.exports = router;
