//引入相关的文件包
var mongoose=require('../common/db');
//数据库的数据集
var article=new mongoose.Schema({
	articleTitle:String,
	articleContext:String,
	articleTime:String
})
//数据操作的常用方法
//通过ID查找
article.statics.findByArticleId=function(id,callBack){
	this.find({_id:id},callBack);
};
//找到所有文章
article.statics.findAll=function(callBack){
	this.find({},callBack);
};
var articleModel = mongoose.model('article',article);

module.exports=articleModel;