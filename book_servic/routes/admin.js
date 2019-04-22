//express示例
var express = require('express');
//路由引入
var router = express.Router();
var crypto = require('crypto');
var movie = require('../models/movie');
var comment = require('../models/comment');
const init_token = 'TKL02o';
//后台管理需要验证其用户的后台管理权限
//后台管理admin，添加新的电影
router.post('/movieAdd', function(req, res, next) {
    //验证完整性，这里使用if,可以使用正则表达式进行验证
    if (!req.body.username) {
        res.json({ status: 1, message: "用户名为空" })
    }
    if (!req.body.token) {
        res.json({ status: 1, message: "登录出错" })
    }
    if (!req.body.id) {
        res.json({ status: 1, message: "用户传递错误" })
    }
    if (!req.body.movieName) {
        res.json({ status: 1, message: "电影名称为空" })
    }
    if (!req.body.movieImg) {
        res.json({ status: 1, message: "电影图片为空" })
    }
    if (!req.body.movieDownload) {
        res.json({ status: 1, message: "电影下载地址为空" })
    }
    if (!req.body.movieMainPage) {

        var movieMainPage = false
    }
    //验证
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id);
    if (check.error == 0) {
        //验证用户情况
        user.findByUsername(req.body.username, function(err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                //根据数据集简历需要存入数据库的内容
                var saveMovie = new movie({
                    movieName: req.body.movieName,
                    movieImg: req.body.movieImg,
                    movieVideo: req.body.movieVideo,
                    movieDownload: req.body.movieDownload,
                    movieTime: Data.now(),
                    movieNumSuppose: 0,
                    movieNumDownload: 0,
                    movieMainPage: movieMainPage,
                })
                //保存合适的数据集
                saveMovie.save(function(err) {
                    if (err) {
                        res.json({ status: 1, message: err })
                    } else {
                        res.json({ status: 0, message: "添加成功" })
                    }
                })
            } else {
                res.json({ error: 1, message: "用户没有获得权限或者已经停用" })
            }
        })
    } else {
        res.json({ status: 1, message: check.message })
    }
});
//删除后台添加的电影条目
router.post('/movieDel', function(req, res, next) {
    //验证完整性，这里使用if,可以使用正则表达式进行验证
    if (!req.body.movieId) {
        res.json({ status: 1, message: "电影id传递失败" })
    }
    if (!req.body.username) {
        res.json({ status: 1, message: "用户名为空" })
    }
    if (!req.body.token) {
        res.json({ status: 1, message: "登录出错" })
    }
    if (!req.body.id) {
        res.json({ status: 1, message: "用户传递错误" })
    }
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id);
    if (check.error == 0) {
        user.findByUsername(req.body.username, function(err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                movie.remove({ _id: req.body.movieId }, function(err, delMovie) {
                    res.json({ status: 0, message: "删除成功", data: delMovie })
                })
            } else {
                res.json({ status: 1, message: "用户没有获得权限或者已经停用" });
            }
        })
    } else {
        res.json({ status: 1, message: check.message });
    }
});
router.post('/movieUpdata', function(req, res, next) {
    //验证完整性，这里使用if,可以使用正则表达式进行验证
    if (!req.body.movieId) {
        res.json({ status: 1, message: "电影id传递失败" })
    }
    if (!req.body.username) {
        res.json({ status: 1, message: "用户名为空" })
    }
    if (!req.body.token) {
        res.json({ status: 1, message: "登录出错" })
    }
    if (!req.body.id) {
        res.json({ status: 1, message: "用户传递错误" })
    }
    //这里在前台打包一个电影对象全部发送至后台直接储存
    var saveData = req.body.movieInfo;
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id);
    if (check.error == 0) {
        user.findByUsername(req.body.username, function(err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                //更新操作
                movie.updata({ _id: req.body.username }, saveData, function(err, delMovie) {
                    res.json({ status: 0, message: "删除成功", data: delMovie });
                })
            } else {
                res.json({ status: 1, message: "用户没有获得权限或者已经停用" })
            }
        })
    } else {
        res.json({ status: 1, message: check.message });
    }
});
//显示后台的所有电影
router.get('/movie', function(req, res, next) {
    movie.findAll(function(err, allMovie) {
        res.json({ status: 0, message: '获取成功', data: allMovie });
    })
});
//显示后台所有评论
router.get('/ ', function(req, res, next) {
    comment.findAll(function(err, allComment) {
        res.json({ status: 0, message: '获取成功', data: allComment });
    })
});
//审核评论
router.post('/checkComment', function(req, res, next) {
    //验证完整性，这里使用if,可以使用正则表达式进行验证
    if (!req.body.commentId) {
        res.json({ status: 1, message: "评论id传递失败" })
    }
    if (!req.body.username) {
        res.json({ status: 1, message: "用户名为空" })
    }
    if (!req.body.token) {
        res.json({ status: 1, message: "登录出错" })
    }
    if (!req.body.id) {
        res.json({ status: 1, message: "用户传递错误" })
    }
    //验证权限
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id);
    if (check.error == 0) {
        user.findByUsername(req.body.username, function(err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                //更新操作
                comment.update({ _id: req.body.commentId }, { check: true }, function(err, updateComment) {
                    res.json({ status: 0, message: "审核成功", data: updateComment })
                })
            } else {
                res.json({ status: 1, message: "用户没有获得权限或者已经停用" })
            }
        })
    } else {
        res.json({ status: 1, message: check.message })
    }
});
//删除用户评论
router.post('/delComment', function(req, res, next) {
    //验证完整性，这里使用if,可以使用正则表达式进行验证
    if (!req.body.commentId) {
        res.json({ status: 1, message: "评论id传递失败" })
    }
    if (!req.body.username) {
        res.json({ status: 1, message: "用户名为空" })
    }
    if (!req.body.token) {
        res.json({ status: 1, message: "登录出错" })
    }
    if (!req.body.id) {
        res.json({ status: 1, message: "用户传递错误" })
    }
    //验证权限
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id);
    if (check.error == 0) {
        user.findByUsername(req.body.username, function(err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                //删除操作
                comment.remove({ _id: req.body.commentId }, function(err, delComment) {
                    res.json({ status: 0, message: "删除成功", data: updateComment })
                })
            } else {
                res.json({ status: 1, message: "用户没有获得权限或者已经停用" })
            }
        })
    } else {
        res.json({ status: 1, message: check.message })
    }
});
//封停用户
router.post('/stopUser', function(req, res, next) {
    //验证完整性，这里使用if,可以使用正则表达式进行验证
    if (!req.body.userId) {
        res.json({ status: 1, message: "用户id传递失败" })
    }
    if (!req.body.username) {
        res.json({ status: 1, message: "用户名为空" })
    }
    if (!req.body.token) {
        res.json({ status: 1, message: "登录出错" })
    }
    if (!req.body.id) {
        res.json({ status: 1, message: "用户传递错误" })
    }
    //验证权限
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id);
    if (check.error == 0) {
        //在数据库中查找用户是否存在
        user.findByUsername(req.body.username, function(err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                //更新操作
                user.update({ _id: req.body.userId }, { userStop: true }, function(err, updateUser) {
                    res.json({ status: 0, message: "封停成功", data: updateUser })
                })
            } else {
                res.json({ status: 1, message: "用户没有获得权限或者已经停用" })
            }
        })
    } else {
        res.json({ status: 1, message: check.message })
    }
});
//用户密码更改
router.post('/changeUser', function(req, res, next) {
    //验证完整性，这里使用if,可以使用正则表达式进行验证
    if (!req.body.userId) {
        res.json({ status: 1, message: "用户id传递失败" })
    }
    if (!req.body.username) {
        res.json({ status: 1, message: "用户名为空" })
    }
    if (!req.body.token) {
        res.json({ status: 1, message: "登录出错" })
    }
    if (!req.body.id) {
        res.json({ status: 1, message: "用户传递错误" })
    }
    if (!req.body.id) {
        res.json({ status: 1, message: "用户新密码错误" })
    }
    //验证权限
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id);
    if (check.error == 0) {
        user.findByUsername(req.body.username, function(err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                user.update({ _id: req.body.userId }, { password: req.body.newPassword }, function(err, updateUser) {
                    //返回需要的内容
                    res.json({ status: 0, message: "修改成功", data: updateUser })
                })
            } else {
                //返回错误
                res.json({ status: 1, message: "用户没有获得权限或者已经停用" })
            }
        })
    } else {
        //返回错误
        res.json({ status: 1, message: check.message })
    }
});
//后端所有用户的资料显示
router.post('/showUser', function(req, res, next) {
    //验证完整性，这里使用if,可以使用正则表达式进行验证
    if (!req.body.username) {
        res.json({ status: 1, message: "用户名为空" })
    }
    if (!req.body.token) {
        res.json({ status: 1, message: "登录出错" })
    }
    if (!req.body.id) {
        res.json({ status: 1, message: "用户传递错误" })
    }
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id);
    if (check.error == 0) {
        user.findByUsername(req.body.username, function(err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                user.findAll(function(err, alluser) {
                    //返回需要的内容
                    res.json({ status: 0, message: "获取成功", data: alluser })
                })
            } else {
                res.json({ status: 1, message: "用户没有获得权限或者已经停用" })
            }
        })
    } else {
        res.json({ status: 1, message: check.message })
    }
});
//后台权限管理
router.post('/powerUpdate', function(req, res, next) {
    //验证完整性，这里使用if,可以使用正则表达式进行验证
    if (!req.body.userId) {
        res.json({ status: 1, message: "用户id传递失败" })
    }
    if (!req.body.username) {
        res.json({ status: 1, message: "用户名为空" })
    }
    if (!req.body.token) {
        res.json({ status: 1, message: "登录出错" })
    }
    if (!req.body.id) {
        res.json({ status: 1, message: "用户传递错误" })
    }
    //验证权限
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id);
    if (check.error == 0) {
        user.findByUsername(req.body.username, function(err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                //跟新操作
                user.data({ _id: req.body.userId }, { userAdmin: true }, function(err, updateUser) {
                    res.json({ status: 0, message: "修改成功", data: updateUser });
                })
            } else {
                //返回错误
                res.json({ status: 1, message: "用户没有获得权限或者已经停用" })
            }
        })
    } else {
        //返回错误
        res.json({ status: 1, message: check.message })
    }
});
//后台新增文章
router.post('/addArticle', function(req, res, next) {
    //验证完整性，这里使用if,可以使用正则表达式进行验证
    if (!req.body.token) {
        res.json({ status: 1, message: "登录出错" })
    }
    if (!req.body.id) {
        res.json({ status: 1, message: "用户传递错误" })
    }
    if (!req.body.articleTitle) {
        res.json({ status: 1, message: "文章名称为空" })
    }
    if (!req.body.articleContext) {
        res.json({ status: 1, message: "文章内容为空" })
    }
    //验证权限
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id);
    if (check.error == 0) {
        user.findByUsername(req.body.username, function(err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                //有权限的情况下
                var saveArticle = new article({
                    articleTitle: req.body.articleTitle,
                    articleContext: req.body.articleContext,
                    articleTime: Data.now()
                })
                saveArticle.save(function(err) {
                    if (err) {
                        res.json({ status: 1, message: err })
                    }
                })
            } else {
                res.json({ status: 1, message: "用户没有获得权限或者已经停用" })
            }
        })
    } else {
        res.json({ status: 1, message: check.message })
    }
});
//后台删除文章
router.post('/delArticle', function(req, res, next) {
    //验证完整性，这里使用if,可以使用正则表达式进行验证
    if (!req.body.articleId) {
        res.json({ status: 1, message: "文章id传递失败" })
    }
    if (!req.body.username) {
        res.json({ status: 1, message: "用户名为空" })
    }
    if (!req.body.token) {
        res.json({ status: 1, message: "登录出错" })
    }
    if (!req.body.id) {
        res.json({ status: 1, message: "用户传递错误" })
    }
    //验证权限
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id);
    if (check.error == 0) {
        user.findByUsername(req.body.username, function(err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                article.remove({ _id: req.body.articleId }, function(err, delArticle) {
                    res.json({ status: 0, message: "删除成功", data: delArticle });
                })
            } else {
                res.json({ status: 1, message: "用户没有获得权限或者已经停用" });
            }
        })
    } else {
        res.json({ status: 1, message: check.message });
    }
});
//新增主页推荐
router.post('/addRecommend', function(req, res, next) {
    //验证完整性，这里使用if,可以使用正则表达式进行验证
    if (!req.body.token) {
        res.json({ status: 1, message: "登录出错" })
    }
    if (!req.body.id) {
        res.json({ status: 1, message: "用户传递错误" })
    }
    if (!req.body.recommendImg) {
        res.json({ status: 1, message: "推荐图片为空" })
    }
    if (!req.body.recommendTitle) {
        res.json({ status: 1, message: "推荐标题为空" })
    }
    //验证权限
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id);
    if (check.error == 0) {
        user.findByUsername(req.body.username, function(err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                var saveRecommend = new recommend({
                    recommendImg: req.body.recommendImg,
                    recommendSrc: req.body.recommendSrc,
                    recommendTitle: req.body.recommendTitle
                })
                saveRecommend.save(function(err) {
                    if (err) {
                        res.json({ status: 1, message: err });
                    } else {
                        res.json({ status: 0, message: "保存成功" });
                    }
                })
            } else {
                res.json({ status: 1, message: "用户没有获得权限或者已经停用" });
            }
        })
    } else {
        res.json({ status: 1, message: check.message });
    }
});
//删除主页推荐
router.post('/delRecommend', function(req, res, next) {
    //验证完整性，这里使用if,可以使用正则表达式进行验证
    if (!req.body.recommendId) {
        res.json({ status: 1, message: "评论id传递失败" })
    }
    if (!req.body.username) {
        res.json({ status: 1, message: "用户名为空" })
    }
    if (!req.body.token) {
        res.json({ status: 1, message: "登录出错" })
    }
    if (!req.body.id) {
        res.json({ status: 1, message: "用户传递错误" })
    }
    //验证权限
    var check = checkAdminPower(req.body.username, req.body.token, req.body.id);
    if (check.error == 0) {
        user.findByUsername(req.body.username, function(err, findUser) {
            if (findUser[0].userAdmin && !findUser[0].userStop) {
                recommend.remove({ _id: req.body.recommendId }, function(err, delRecommend) {
                    res.json({ status: 0, message: "删除成功", data: delRecommend });
                })
            } else {
                res.json({ status: 1, message: "用户没有获得权限或者已经停用" });
            }
        })
    } else {
        res.json({ status: 1, message: check.message });
    }
});
module.exports = router;