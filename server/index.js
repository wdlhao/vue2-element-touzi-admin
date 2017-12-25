
// 引入Express
const express = require('express');
const api = require('./api');  // 引入编写好的api
const http = require('http');
const path = require('path');   // 引入处理路径的模块
const fs = require('fs'); // 引入文件模块
const app = express();

app.set('port',process.env.PORT || 80);
app.use(api);  						// express use router       

// 引入处理post数据的模块
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))

// 因为是单页应用 所有请求都走/dist/index.html
app.get('*', function(req, res) {
	const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'),'utf-8');
	res.send(html)
})

//允许跨域访问
// app.all('*',function (req, res, next) {
	// 	console.log(req,res)
	// 	res.header("Access-Control-Allow-Origin", "*");
	//  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	//  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	//  res.header('Access-Control-Allow-Headers', 'Content-Type');
	//  next();
//});

// 监听80端口
http.createServer(app).listen(app.get('port'),'0.0.0.0',function(){
	console.log('Express server listening on port '+app.get('port'));
})


