var mongoose=require('../common/db');
//电影数据集
var movie =new mongoose.Schema({
	movieName:String,
	movieImg:String,
	movieVideo:String,
	movieDownload:String,
	movieTime:String,
	movieNumSuppose:Number,
	movieNumDownload:Number,
	movieMainPage:Boolean,
	
})
//查找电影id
movie.statics.findById=function(movie_id,callBack){
	this.find({findById:movie_id,check:true},callBack);
};
movie.statics.findAll=function(callBack){
	this.find({},callBack);
};

var movieModel=mongoose.model('movie',movie);
module.exports=movieModel;
