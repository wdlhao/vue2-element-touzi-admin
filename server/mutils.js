// 获取ip和地理位置信息
const os = require('os');
const http = require('http');

const formatDate = (date, type) =>{
    var year = date.getFullYear();//年
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;//月
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();//日
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();//时
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();//分
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();//秒
    var milliseconds = date.getMilliseconds() < 10 ? "0" + date.getMilliseconds() : date.getMilliseconds() //毫秒
    if (type == 1) {
        return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds + "." + milliseconds;
    } else if(type == 2){
        return year+""+month+""+day+""+hour+""+minutes+""+seconds;
    }else {
        return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
    }
}

const getOSdata = ()=>{
	const type = os.type();
	const platform = os.platform();
	const ptype = type+' '+platform;
	return ptype;
}
/**
 * 根据 ip 获取获取地址信息
 */
const getIpInfo = (url,ip, cb) => {
    const serverurl = url + ip;
    http.get(serverurl, function(res) {
        var code = res.statusCode;
        if (code == 200) {
            res.on('data', function(data) {
                try {
                    cb(null, JSON.parse(data));
                } catch (err) {
                    cb(err);
                }
            });
        } else {
            cb({ code: code });
        }
    }).on('error', function(e) { cb(e); });
};



const mutils = {
   'formatDate':formatDate,
   'getOSdata':getOSdata,
   'getIpInfo':getIpInfo,
}

module.exports = mutils;