//引入相关的文件包
var mongoose=require('../common/db.js');
//数据库的数据集
var mail=new mongoose.Schema({
	toUser:String,
	fromUser:String,
	title:String,
	context:String,
})
//数据操作的常用方法
mail.statics.findByToUserId=function(user_id,callBack){
	this.find({toUSer:user_id},callBack);
};
mail.statics.findByFromUserId=function(user_id,callBack){
	this.find({fromUser:user_id},callBack);
}
var mailModel= mongoose.model('mail',mail);

module.exports=mailModel