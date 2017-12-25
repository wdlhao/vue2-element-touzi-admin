/**
 *  Schema、Model、Entity或者Documents的关系请牢记，
 *  Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
 */ 
const mongoose = require('mongoose'); // 4.11.6


// 连接数据库 如果不自己创建 默认test数据库会自动生成
// port默认为：27017,tougu为数据库名;
mongoose.connect('mongodb://localhost:27017/tougu',{useMongoClient: true});

// 为这次连接绑定事件
const db = mongoose.connection;
db.on('error', console.error.bind(console, '连接错误'));
db.once('open', function() {console.log(new Date+'  http:localhost:80连接成功')});
db.on("disconnected", function () { console.log("MongoDB connected disconnected.")});
console.log(12);

/************** 定义模式Schema **************/
const Schema = mongoose.Schema
/**
 * user表
 */
const UserSchema = new Schema({
	_id:Schema.Types.ObjectId ,
	username: String,
	password: String,
	createTime: Number,
	updateTime: Number,
	ip:String,
	address:String,
	area:String,
	region:String,
	region_id:String,
	city_id:String,
	isp:String,
})
/**
 * 修改信息表
 */
const InfoSchema = new Schema({
	_id:Schema.Types.ObjectId,
    username: String,
	nickname: String,
	touziyear:String,
	email:String,
	modifyTime: { type: Date, default: Date.now },
	baseType:String,
	changeType:String,
}, {
    versionKey: false,
    timestamps: { createdAt: 'modifyTime'}
})
/**
 * 资金流水表 
 */
const MoneyIncomePaySchema = new Schema({
	_id:Schema.Types.ObjectId ,
	createTime: Number,
	incomePayType: String,
	incomePayDes: String,
	income: Number,
	pay: Number,
	accoutCash: Number,
	remarks: String
})
/**
 * 支付单据表 
 */
const PayListSchema = new Schema({
	_id:Schema.Types.ObjectId ,
	payNumber: String,
	orderMoney: Number,
	incomeMoney:Number,
	payType: String,
	orderTime: { type: Date, default: Date.now },
	payStatus: String,
	remarks: String
})
/**
 * 国内投资统计表
 */
const ChinaTouziListSchema = new Schema({
	_id:Schema.Types.ObjectId ,
	provinces: String,
	orderMoney: Number,
	incomeMoney:Number,
	orderPersonConunt:Number,
	orderPersonAge:String,
	payType: String,
	orderPeriod: String,
	orderYearRate:String,
	remarks: String
})
/**
 * 金融文章表
 */
const FundArticlesListSchema = new Schema({
	_id:Schema.Types.ObjectId ,
	title: String,
	abstracts: String,
	author:String,
	category:String,
	comeFrom:String,
	important: String,
	status: String,
	publishDate:{type: Date},
	content: String
})









/************** 编译模型Model **************/
/**
 * 编译模型： model(name, [schema], [colleciton], [skipInit] )
   参数： name ：标识model的字符串
　　     schema: 即前面定义的Schema对象
　　 collection：要连接的集合名称（如果在Schema对象中没有指定一个集合）
　　 skipInit： 默认为false，如果为true，则跳过初始化过程，创建一个没有连接到数据库的一个简单的Model对象。
 */
const Models = {
	Users: mongoose.model('users', UserSchema,'users',false),  
	InfoList: mongoose.model('infoList', InfoSchema,'infoList',false),  
	MoneyIncomePay: mongoose.model('moneyIncomePay', MoneyIncomePaySchema,'moneyIncomePay',false),  
	payList: mongoose.model('payList', PayListSchema,'payList',false),
	ChinaTouziList: mongoose.model('chinaTouziList', ChinaTouziListSchema,'chinaTouziList',false), 
	FundArticlesList: mongoose.model('fundArticlesList', FundArticlesListSchema,'fundArticlesList',false)
}

module.exports = Models;	