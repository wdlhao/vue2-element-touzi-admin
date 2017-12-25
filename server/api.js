// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
//"use strict";
const mongoose = require('mongoose');
const models = require('./db');
const express = require('express');
const router = express.Router();


// 引入工具函数
const mutils = require('./mutils');
//console.log(mutil);

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 获取数据
const execCallback = function(p,err,data,res){
 	if(err){
 		res.send(err);
	}else{
		//再次查询，获取总数
		p.find().count((err,result) => {
			if (err) {
				res.send({'status':0,'data':'','message':err,'count':''});  
			} else {
				res.send({'status':1,'data':data,'message':'success','count':result});  
			}
	    });
	}
}


// 更新和保存用户信息回调
const callback = function(err,data,res){
	if(err){
		res.send({'status':0,'data':'','message':err,'count':''});  
	}else{
		res.send({'status':1,'data':data,'message':'success','count':''});  
	}
}

/**
 * 保存用户信息
 * @params:p，为表格名称
 * @params:reqData，为更新的用户数据
 * @params:res,为接口响应的反馈
 **/ 
const saveUserInfo = function(p,reqData,res){
   p.create(reqData,function(err,data){
       callback(err,data,res);
   })
}

/**
 * 更新用户信息
 * @params:p，为表格名称
 * @params:reqData,数据类型为数组。reqData[0]:为更新的标准;reqData[1]:为更新的数据;
 * @params:res,为接口响应的反馈
 **/ 
const updateUserInfo = function(p,reqData,res){
	p.update(reqData[0],reqData[1],function(err,data){
		callback(err,data,res);
	})
}


/**
 * 用户登录/注册
 * @params:username
 * @params:password
 */  
router.get('/api/user/login',(req,res) => {
	let address,area,region,region_id,city_id,isp,createTime,updateTime;
	const username = req.query.username;
	const password = req.query.password;
	//const createTime = mutils.formatDate(new Date(),2); // 首次登录时间
	createTime = updateTime = mutils.formatDate(new Date(),2); // 最新一次登录时间
	const ip = req.query.ip; // ip地址[外网地址]
	const url = req.query.url;  

	mutils.getIpInfo(url,ip,function(err, msg) {
		 console.log(msg);
		 if(msg.data != ''){
			 const data = msg.data;
			 address =  data.country+' '+data.region+' '+data.city;
			 area = data.area;
			 region = data.region;
			 region_id = data.region_id;
			 city_id =	data.city_id;
			 isp =	data.isp;
		}
		const p = models.Users;
		// 保存数据之前，先要判断该用户是否已经存在。如果是，则更新数据；不是，则保存数据。
        const where = {'username':username} 
        p.find(where).exec(function(err,data){
			if(err){
				res.send({'status':'','data':'','message':err,'count':''});  
			}else{
				if(data != ''){ // data类型为数组
					console.log('update -----------');
					let dataArr = data[0];
					const reqData = [{'_id':dataArr._id},{
						'ip':ip,
						'address':address,
						'area':area,
						'region':region,
						'region_id':region_id,
						'city_id':city_id,
						'isp':isp,
						'updateTime':updateTime,
					}];
				   updateUserInfo(p,reqData,res);
	   
				}else{
					console.log('save -----------');// object
					const id = mongoose.Types.ObjectId();
					const reqData = {
						'_id':id,
						'username':username,
						'password':password,
						'ip':ip,
						'address':address,
						'area':area,
					    'region':region,
						'region_id':region_id,
						'city_id':city_id,
						'isp':isp,
						'createTime':createTime,
						'updateTime':updateTime,
					}
					saveUserInfo(p,reqData,res);
				}
			}
	    })
	 })
});

/**
 * 获取登录或者注册的用户信息
 * @params:pageIndex
 * @params:pageSize
 */  
router.get('/api/user/getUserInfo',(req,res) => {
	const pageIndex = parseInt(req.query.pageIndex);
	const pageSize = parseInt(req.query.pageSize);
	const m = models.Users.find({});
	let p = models.Users;
	const start = (pageIndex-1)*pageSize;

	m.skip(start); 
	m.limit(pageSize);
	m.sort({'createTime':'desc'}); //排序[asc表示升序，desc表示降序]
	m.exec(function(err,data){
		execCallback(p,err,data,res)
	})
})

/**
 * 用户信息修改
 * @params:username
 * @params:password
 */  
router.get('/api/user/infoModify',(req,res) => {
	let p = models.InfoList;
	const username = req.query.username;
	const nickname = req.query.nickname;
	const touziyear = req.query.touziyear;
	const email = req.query.email;

	let baseType = (req.query.baseType).join(',');
	let changeType = (req.query.changeType).join(',');

	// 保存数据之前，先要判断该用户是否已经存在。如果是，则更新数据；不是，则保存数据。
	const where = {'username':username} 
	p.find(where).exec(function(err,data){
		if(err){
			res.send({'status':'','data':'','message':err,'count':''});  
		}else{
			if(data != ''){ // data类型为数组
				console.log('update -----------:');
				let dataArr = data[0];
				const reqData = [{'_id':dataArr._id},{
					'nickname':nickname,
					'touziyear':touziyear,
					'email':email,
					'baseType':baseType,
					'changeType':changeType
				}];
				updateUserInfo(p,reqData,res);
	
			}else{
				console.log('save -----------');// object
				const id = mongoose.Types.ObjectId();
				const reqData = {
					'_id':id,
					'username':username,
					'nickname':nickname,
					'touziyear':touziyear,
					'email':email,
					'baseType':baseType,
					'changeType':changeType
				}
				saveUserInfo(p,reqData,res);
			}
		}
	})
});

/**
 * 获取信息列表
 * @params:pageIndex
 * @params:pageSize
 */  
router.get('/api/user/getInfoList',(req,res) => {
	console.log('into getInfoList------')
	const pageIndex = parseInt(req.query.pageIndex);
	const pageSize = parseInt(req.query.pageSize);
	const m = models.InfoList.find({});
	let p = models.InfoList;
	const start = (pageIndex-1)*pageSize;

	m.skip(start); 
	m.limit(pageSize);
	m.sort({'modifyTime':'desc'}); //排序[asc表示升序，desc表示降序]
	m.exec(function(err,data){
		execCallback(p,err,data,res)
	})
})

/**
 * 修改用户信息 上传个人图像
 */  
router.get('/api/userInfo/uploadimg',(req,res) => {
	console.log('into uploadimg------')
	
})
/**
 * 获取信息列表by用户名[查找整个表格]
 * @params:username
 */  
router.get('/api/user/getInfoByUsername',(req,res) => {
	console.log('into getInfoByUsername------')
	const username = req.query.username;
	const where = {'username':username};
	let p = models.InfoList;
	p.find(where).exec(function(err,data){
		execCallback(p,err,data,res)
	})
})

/**
 * 获取资金信息
 * @params:pageIndex
 * @params:pageSize
 */  
router.get('/api/money/getMoneyIncomePay',(req,res) => {
	console.log('into getMoneyIncomePay');
	const pageIndex = parseInt(req.query.pageIndex);
	const pageSize = parseInt(req.query.pageSize);
	const m = models.MoneyIncomePay.find({});
	let p = models.MoneyIncomePay;
	const start = (pageIndex-1)*pageSize;
	//暂时没有用到
	if(req.query.where){
		p.find(where);
	}
	m.skip(start); 
	m.limit(pageSize);
	m.sort({'createTime':'desc'}); //排序[asc表示升序，desc表示降序]
	m.exec(function(err,data){
		execCallback(p,err,data,res)
	})
});

/**
 * 删除资金信息
 * @params:id
 */  
router.get('/api/money/deleteMoneyIncomePay',(req,res) => {
	const id = req.query.id;
	if(id && ''!=id){  
		const p = models.MoneyIncomePay; 
		p.remove({'_id':id}).exec(function(err,data){
		  execCallback(p,err,data,res)
	   })
	}
});

/**
 * 编辑资金信息
 * @params:id
 */  
router.get('/api/money/editMoneyIncomePay',(req,res) => {
	const id = req.query.id
	const createTime = mutils.formatDate(new Date(),2);
	if(id && ''!=id){  
		const p = models.MoneyIncomePay;
		p.update({'_id':id},{
		    "createTime":createTime,
		   "incomePayType":req.query.incomePayType,
		   "incomePayDes":req.query.incomePayDes,
		   "income":req.query.income,
		   "pay":req.query.pay,
		   "accoutCash":req.query.accoutCash,
		   "remarks":req.query.remarks
		}).exec(function(err,data){
		  execCallback(p,err,data,res)
	   })
	}
});

/**
 *  新增资金信息
 *  @params:id
 */  
router.get('/api/money/addMoneyIncomePay',(req,res) => {
	const id = mongoose.Types.ObjectId();
	const p = models.MoneyIncomePay;
	const createTime = mutils.formatDate(new Date(),2);

	p.create({
		"_id":id,
		"createTime":createTime,   // number 时间戳
		"incomePayType":req.query.incomePayType,
		"incomePayDes":req.query.incomePayDes,
		"income":req.query.income,
		"pay":req.query.pay,
		"accoutCash":req.query.accoutCash,
		"remarks":req.query.remarks
	},function(err,data){
		execCallback(p,err,data,res)
	})
})

/**
 * 筛选资金信息
 * @params:startTime
 * @params:endTime
 */  
router.get('/api/money/screeoutMoneyIncomePay',(req,res) => {
	const startTime = (req.query.startTime != '')?parseInt(req.query.startTime):'';
	const endTime = (req.query.endTime != '')?parseInt(req.query.endTime):'';
	console.log('startTime----'+startTime);
	console.log('endTime----'+endTime);
	const p = models.MoneyIncomePay
	let where = ""
	if(startTime != "" && endTime != ""){  
		where = {'createTime':{'$gte':startTime,'$lte':endTime}}
	}else if(startTime != "" && endTime == ""){
		where = {'createTime':{'$gte':startTime}}
	}else if(startTime == "" && endTime != ""){ 
		where = {'createTime':{'$lte':endTime}}
	}else if(startTime == "" && endTime == ""){ 
		where = {}
	}
	console.log(where);
	// 根据条件筛选之后，按时间进行倒序排列[因为MongoDB 的 _id 生成算法中已经包含了当前的时间，
	// 所以这样写不仅没问题，也是推荐的按时间排序的写法。]
	p.find(where).sort({'_id':-1}).exec(function(err,data){
		execCallback(p,err,data,res)
	})
});

/**
 * 获取支付单据
 * @params:pageIndex
 * @params:pageSize
 */  
router.get('/api/money/getPayList',(req,res) => {
	const pageIndex = parseInt(req.query.pageIndex);
	const pageSize = parseInt(req.query.pageSize);
	const m = models.payList.find({});
	let p = models.payList;
	const start = (pageIndex-1)*pageSize;
	
	m.skip(start); 
	m.limit(pageSize);
	m.sort({'createTime':-1}); 
	m.exec(function(err,data){
	    execCallback(p,err,data,res)
	})
});

/**
 * 筛选订单信息
 * @params:payNumber,支付单号
 */  
router.get('/api/money/screeoutPayList',(req,res) => {
	const payNumber = req.query.payNumber
	const p = models.payList
	let where = "";
	if(payNumber != ""){
        where = {payNumber:payNumber}
	}else{
		where = {}
	}
	// 根据创建的时间顺序 降序排列
	p.find(where).sort({'_id':-1}).exec(function(err,data){
		execCallback(p,err,data,res)
	})
});

/**
 * 批量删除订单信息
 * @params:id,支付id
 **/  
router.get('/api/money/batchDeletePayList',(req,res) => {
	const ids = req.query.ids
	const p = models.payList
    let where = {'_id':{"$in":ids}}
	// 根据创建的时间顺序 降序排列
	p.remove(where).sort({'_id':-1}).exec(function(err,data){
		execCallback(p,err,data,res)
	})
});

/**
 * 获取国内投资统计
 **/  
router.get('/api/money/getChinaTouziList',(req,res) => {
    const m = models.ChinaTouziList.find({});
	const p = models.ChinaTouziList;
	m.sort({'orderMoney':-1}); 
	m.exec(function(err,data){
	   execCallback(p,err,data,res)
	})
});

/**
 * 保存金融文章
 **/  
router.get('/api/article/addFundArtices',(req,res) => {
	const id = mongoose.Types.ObjectId();
	const p = models.FundArticlesList;
	p.create({
		"_id":id,
		"title":req.query.title,
		"abstracts":req.query.abstracts,
		"author":req.query.author,
		"category":req.query.category,
		"comeFrom":req.query.comeFrom,
		"important":req.query.important,
		"status":req.query.status, 
		"publishDate":req.query.publishDate,
		"content":req.query.content
	},function(err,data){
		 callback(err,data,res);
	})
});


/**
 * 获取金融文章列表
 * @params:pageIndex
 * @params:pageSize
 */  
router.get('/api/article/getFundArticles',(req,res) => {
	const pageIndex = parseInt(req.query.pageIndex);
	const pageSize = parseInt(req.query.pageSize);
	const m = models.FundArticlesList.find({});
	const p = models.FundArticlesList;
	const start = (pageIndex-1)*pageSize;
	
	m.skip(start);  // 从多少条开始
	m.limit(pageSize);  // 取多少条数据
	m.sort({'publishDate':-1}); // 按发布日期倒序
	m.exec(function(err,data){
		execCallback(p,err,data,res)
	})
});

/**
 * 根据id来查看文章
 * @params:id
 */  
router.get('/api/article/getFundArticlesById',(req,res) => {
	const id = req.query.id;
	const p = models.FundArticlesList;
    p.find({_id:id}).exec(function(err,data){
		execCallback(p,err,data,res)
	});
});









module.exports = router;

