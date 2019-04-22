//引入相关的文件包
var mongoose=require('../common/db');
//数据库的数据集
var recommend=new mongoose.Schema({
	recommendImg:String,
	recommendSrc:String,
	recommendTitle:String
})
//数据操作的常用方法
//通过ID获取主页推荐
recommend.statics.findByIndexId=function(m_id,callBack){
	this.find({findByIndexId:m_id},callBack);
};
//找到所有推荐
recommend.statics.findAll=function(callBack){
	this.find({},callBack);
};
var recommendModel = mongoose.model('recommend',recommend);

module.exports=recommendModel