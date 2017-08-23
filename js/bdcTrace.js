// #pageLoad.js   
//-------------------全局变量，用于保存页面中获得的所有信息---------------------------------
/*str中只存静态信息，譬如url，各种id，分辨率、ip，打开时间、关闭时间等等；--获取的动态信息另定义变量取str的值，再进行操作，这样保证此次的记录不会遗留上次的动态信息 */
var strjson = {};
var bdcTrace_request_url = "https://trace.hexun.com";
//var ip = "https://trace.hexun.com/bdcTrace/*?" 
//var ip = hostConfig + "/bdcTrace/*?";
var ipGif = bdcTrace_request_url+"/bdcTrace/*.gif?";
//var ip = "https://trace.hexun.com/bdcTrace/*.gif?"
//var ipPost = "https://trace.hexun.com/bdcTrace/*?";
	//-------------------下面获取PageOpenTime---------------------------------
strjson.pageopentime = CurentTime();

//-------------------下面嵌入ip方法，在onload中获取--------------------------------------------
// document.write("<script src='http://pv.sohu.com/cityjson?ie=utf-8'></script>");
//document.write("<script src='http://trace.hexun.com/bdcTrace/json/json2.js'></script>");

var JSON = window.JSON;
if (!JSON)
	JSON = {};
if (!JSON.stringify) {
	var hasOwn = ({}).hasOwnProperty;

	function isPlainObject(obj) {
		var key;
		if (!obj || _getConstructorName(obj).toLowerCase() != "object") {
			return false;
		}
		try {
			if (obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
				return false;
			}
		} catch (e) {
			return false;
		}
		for (key in obj) {}
		return key === undefined || hasOwn.call(obj, key);
	}

	function _getConstructorName(o) {
		//加o.constructor是因为IE下的window和document
		if (o != null && o.constructor != null) {
			return Object.prototype.toString.call(o).slice(8, -1);
		} else {
			return '';
		}
	}

	function _mulReplace(s, arr) {
		for (var i = 0; i < arr.length; i++) {
			s = s.replace(arr[i][0], arr[i][1]);
		}
		return s;
	}

	function _escapeChars(s) {
		return _mulReplace(s, [
			[/\\/g, "\\\\"],
			[/"/g, "\\\""],
			//[/'/g, "\\\'"],//标准json里不支持\后跟单引号
			[/\r/g, "\\r"],
			[/\n/g, "\\n"],
			[/\t/g, "\\t"]
		]);
	}

	function _type(obj) {
		var type = _getConstructorName(obj).toLowerCase();
		switch (type) {
			case 'string':
				return '"' + _escapeChars(obj) + '"';
			case 'number':
				var ret = obj.toString();
				return /N/.test(ret) ? 'null' : ret;
			case 'boolean':
				return obj.toString();
			case 'date':
				return 'new Date(' + obj.getTime() + ')';
			case 'array':
				var ar = [];
				for (var i = 0; i < obj.length; i++) {
					ar[i] = _stringify(obj[i]);
				}
				return '[' + ar.join(',') + ']';
			case 'object':
				if (isPlainObject(obj)) {
					ar = [];
					for (i in obj) {
						ar.push('"' + _escapeChars(i) + '":' + _stringify(obj[i]) + '');
					}
					return '{' + ar.join(',') + '}';
				}
		}
		return 'null';
	}

	function _capitalize(val) {
		return val[0].toUpperCase() + val.substr(1);
	}

	function _stringify(obj) {
		if (obj == null) {
			return 'null';
		}
		if (obj.toJSON) {
			return obj.toJSON();
		}
		return _type(obj);
	}

	JSON.stringify = _stringify;
}


//-------------------------下面获取sessionid-----------------------------------------------
var sessionid = getCookie('JSESSIONID');

if (sessionid == null || sessionid == "") {
	//自定义的sessionid形式如：yJYMPRSDJEi1438755711959（前11位随机字母，后13位为时间戳）
	var sessionid_tem = getCookie("BDCSESSIONID");
	var mytime = sessionid_tem.substring(11);

	//如果获取为空或已经超时，重建sessionid
	if (sessionid_tem == null || sessionid_tem == "" || isTimeOut(mytime)) {
		sessionid = createHexunSession();
		//第三个参数为此条HEXUNSESSIONID的存活期，null代表关闭浏览器就自动删除。
		document.cookie = setCookie("BDCSESSIONID", sessionid, null);
	} else {
		sessionid = sessionid_tem;
	}
}

function isTimeOut(sessiontime) {
	var nowtime = new Date().getTime();
	var datetime = nowtime - sessiontime //时间差的毫秒数
		//计算相差分钟数
	var leave = datetime % (3600 * 1000)
	var minutes = Math.floor(leave / (60 * 1000))
	if (minutes >= 60)
		return true;
	else
		return false;
}

function createHexunSession() {
	var sessiontime = new Date().getTime();
	var sessionid = getRandomString(11) + sessiontime;

	return sessionid;
}

// 获取长度为len的随机字符串
function getRandomString(len) {
	len = len || 32;
	var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
	var maxPos = chars.length;
	var pwd = '';
	for (i = 0; i < len; i++) {
		pwd += chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}

strjson.bdcsessionid = sessionid;
//-------------------------------下面获取Ga_Id---------------------------------------------
// var Ga_Id = getCookie('_ga');
// if (Ga_Id == null || Ga_Id == "") {
// 	Ga_Id = '-';
// }

// strjson.gaId = Ga_Id;
//-------------------------------下面获取BAIDUID---------------------------------------------
// var baiduId = getCookie('BAIDUID');
// if (baiduId == null || baiduId == "") {
// 	baiduId = '-';
// }
// strjson.baiduId = baiduId;

//-------------------------------下面获取MacAdress-------------------------------------------
//strjson.macAdress = "-";

//-------------------------------下面获取指定名称的Site_CookieId,Site_userId-----------------------------------------
var Site_CookieId = "";
var Site_userId = "";
var strcookie = document.cookie;
var arrcookie = strcookie.split(";");
if (arrcookie.length >= 1) {
	//cookie分组长度较小，可以循环判断，一般不超过10个
	for (var i = 0; i < arrcookie.length; i++) {
		if (Site_CookieId != "")
			break;

		var myarrcookie = arrcookie[i];
		var flag = myarrcookie.indexOf("JSESSIONID") < 0 && myarrcookie.indexOf("BAIDUID") < 0 && myarrcookie.indexOf("BDCSESSIONID") < 0 && myarrcookie.indexOf("fsp_cust_id") < 0;

		if (flag) {
			Site_CookieId == "" && (Site_CookieId = getKeyId(myarrcookie, "SID"));
			Site_CookieId == "" && (Site_CookieId = getKeyId(myarrcookie, "emstat_bc_emcount"));
		}
	}

	for (var i = 0; i < arrcookie.length; i++) {
		if (Site_userId != "")
			break;
		var myarrcookie = arrcookie[i];
		var flag = myarrcookie.indexOf("JSESSIONID") < 0 && myarrcookie.indexOf("BAIDUID") < 0 && myarrcookie.indexOf("BDCSESSIONID") < 0;

		//获取和讯userid
		if (myarrcookie.indexOf("userToken") == 0) {
			Site_userId = getKeyId(myarrcookie, "");
			break;
		}

		if (flag) {
			Site_userId == "" && (Site_userId = getKeyId(myarrcookie, "fsp_cust_id"));
		}
	}
}

function getKeyId(mycookie, searchIdName) {
	var index = -2;
	var c_start = mycookie.indexOf(searchIdName + "=")
	if (c_start != -1) {
		c_end = mycookie.indexOf(";", c_start)
		if (c_end == -1)
			c_end = mycookie.length;
		var subcookie = mycookie.substring(c_start, c_end);

		index = subcookie.indexOf("&");
		if (index >= 0)
			subcookie = subcookie.substring(0, index);
		index = subcookie.indexOf("|");
		if (index >= 0)
			subcookie = subcookie.substring(0, index);
		index = subcookie.indexOf("%");
		if (index >= 0)
			subcookie = subcookie.substring(0, index);
		index = subcookie.indexOf("=");
		if (index >= 0)
			subcookie = subcookie.substring(index + 1, subcookie.length);
		index = subcookie.indexOf(":");
		if (index >= 0)
			subcookie = subcookie.substring(index + 1, subcookie.length);

		if (subcookie != null || subcookie.length > 0)
			return subcookie;
	}
	return "";
}


if (Site_CookieId == null || Site_CookieId == "") {
	Site_CookieId = "-";
}
strjson.siteCookieId = Site_CookieId;

if (Site_userId == null || Site_userId == "") {
	Site_userId = "-";
}
strjson.siteUserId = Site_userId;


//------------------------------获取浏览器版本--------------------------------------------
// function getBrowserInfo() {
// 	var agent = navigator.userAgent.replace(/\;/g, ",");
// 	if (agent == null || agent == "") {
// 		agent = "msie";
// 	}
// 	strjson.userAgent = agent;
// }
// getBrowserInfo();


function forIn(obj, handler) {
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			handler(i, obj[i]);
		}
	}
}

function each(arr, handler) {
	for (var i = 0, len = arr.length; i < len; i += 1) {
		handler(i, arr[i]);
	}
}

//------------------------------完成发送到后台的功能--------------------------------------------

function getXMLHttpRequest() {

	//ie低版本浏览器跨域
	if (window.XDomainRequest) {
		return new XDomainRequest();
	}

	//高版本浏览器
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else {
		var names = ["msxml", "msxml2", "msxml3", "Microsoft"];
		for (var i = 0; i < names.length; i++) {
			try {
				var name = names[i] + ".XMLHTTP";
				return new ActiveXObject(name);
			} catch (e) {

			}
		}
	}
	return null;
}

// var repeatAjax = setTimeout(function(){
// 	sendAjaxRequest(url,1);
// },6000);

var xmlHttp = getXMLHttpRequest();

function sendAjaxRequest(url) {
	try {
/*		var body = document.getElementsByTagName("body")[0];
		var img = document.getElementById("bdcTrace");
		if (img) {
			body.removeChild(img);
		}
		var img = document.createElement("img");
		img.id = "bdcTrace";
		img.src = url;
		img.style.cssText = "display:none;width:0;height:0;overflow:hidden;";
		body.appendChild(img);
		console.log(url);*/
		// xmlHttp.open("get", url, true);
		// xmlHttp.send();

		// xmlHttp.onreadystatechange = function(){
		// 	if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
		// 		clearTimeout(repeatAjax);
		// 		return ;
	 //        }else if(arguments.length==1){
	 //        	repeatAjax;
	 //        }else{
	 //        	xmlHttp.close();
	 //        }
		// }
		var dom = new Image(1, 1);
		var rnd_id = "_img_" + Math.random();
		window[rnd_id] = dom; // 全局变量引用
		dom.onload = dom.onerror = function () {
		    window[rnd_id] = null; // 删除全局变量引用
		}
		dom.style.display = "none";
		dom.style.width = "0px";
		dom.style.height = "0px";
		dom.src = url;
		//console.log(dom.src)
		document.body.appendChild(dom);
	} catch (e) {
		console.log("sendAjaxRequest,'" + url + "'," + e.message);
	}
}

//------------------------------获取cookieid，否则自动创建--------------------------------------------

function getCookie(c_name) {
	if (document.cookie.length > 0) {

		c_start = document.cookie.indexOf(c_name + "=");

		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) {
				c_end = document.cookie.length
			}
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return "";
}

//-------------------------------获取hxuid------------------------------------------------------------

// var regS = /^\w{0,100}/;
// var storageHxid = regS.exec(getCookie('userToken')||"");
// if(!strjson.hxuid&&storageHxid){
// 	storageHxid = storageHxid[0];
// }
// strjson.hxuid = storageHxid||'-';

//------------------------------获取trackid----------------------------------------------------------
//strjson.trackid = '-';

//设置cookie，载入网页内
function setCookie(c_name, value, expiremins) {
	var exdate = new Date()
	if (expiremins != null) {
		exdate.setMinutes(exdate.getMinutes() + expiremins);
	}
	document.cookie = c_name + "=" + escape(value) + ((expiremins == null) ? "" : "; expires=" + exdate.toGMTString());
}

//自定义生成cookieId，格式如：abcdefgh1234567891011
function getTimeRndString() {
	var tm = new Date();
	var str1 = tm.getMilliseconds() + tm.getSeconds() * 60 + tm.getMinutes() * 3600 + tm.getHours() * 60 * 3600 + tm.getDay() * 3600 * 24 + tm.getMonth() * 3600 * 24 * 31 + tm.getYear() * 3600 * 24 * 31 * 12;
	return getRandomString(8) + str1;
}

//------------------------------页面加载检查BDC_UserId存在否，不存在则创建--------------------------------------------

var BDC_UserId = "";

//------------------------------收集channel频道值--------------------------------------------

strjson.channel = "-";

//------------------------------收集手机端imei号--------------------------------------------

strjson.imei = "-";

function checkCookie() {
	BDC_UserId = getCookie('BDCCOOKIEID')
	var dateStr = CurentTime();
	var cuturl = window.location.href;
	//var userIp = returnCitySN["cip"] || "-";

	//strjson.pageLoadCompleteTime = dateStr;
	//strjson.currentURL = urlReplace(cuturl);
	//strjson.clientIP = userIp;
	//strjson.status = "-";

	if (BDC_UserId == null || BDC_UserId == "") {

		BDC_UserId = getTimeRndString();
		if (BDC_UserId != null && BDC_UserId != "") {
			//cookie存活期为1年
			setCookie('BDCCOOKIEID', BDC_UserId, 365 * 24 * 10)
		}
	}

	if (BDC_UserId != null && BDC_UserId != "") {
		var triggertime = CurentTime();
		strjson.screenratio = window.screen.height + "," + window.screen.width;
		strjson.bdccookieid = BDC_UserId;
		strjson.ref = urlReplace(document.referrer || '-');
		//strjson.triggerTime = triggertime;
		strjson.projectid = hexunGetProductId();
		//var jsonResult = JSON.stringify(strjson);
		strjson.r = Math.ceil(Math.random() * 100000000);
		var jsonResult = "";
		var dataList = [];
		if (Object.getOwnPropertyNames) {
			dataList = Object.getOwnPropertyNames(strjson);
		}else{
			for(key in strjson){
				dataList.push(key)
			}
		}
		for (var i = 0; i < dataList.length; i++) {
			jsonResult += dataList[i] + "=" + eval('strjson.' + dataList[i]) + "&";
		}
		jsonResult = jsonResult.substring(0, jsonResult.length - 1);
		url = ipGif + jsonResult;
		sendAjaxRequest(url);
	}
}

//采用此方式load，可以规避网页中已存在load函数，防止冲突
if (document.all) {
	window.attachEvent('onload', checkCookie);
	window.attachEvent('unload', function(event) {
		//暴力停留10ms
		var now = +new Date;
		while (new Date - now >= 10) {}
	});
} else {
	window.addEventListener('load', checkCookie, false);
	window.addEventListener('unload', function(event) {
		//暴力停留10ms
		var now = +new Date;
		while (new Date - now >= 10) {}
	});
}

console.log(1)
//---------------------下面是计算页面激活时间focusTime---------------------------------------------------
var focusTime = 0;
var timer;

//非IE浏览器的监控
window.onfocus = onFocus;
window.onblur = onBlur;

//ie浏览器的监控
window.onfocusin = onFocus;
window.onfocusout = onBlur;

//Chrome浏览器刚刚打开网页，无法激活当前页，故加载时启动记时
if (isBrower("Chrome")) {
	timer = setInterval("getSinglefocusTime()", 1000);
}

function onBlur() {
	clearInterval(timer);
}

function onFocus() {
	clearInterval(timer);
	timer = setInterval("getSinglefocusTime()", 1000);
}

function getSinglefocusTime() {
	focusTime = focusTime + 1;
}


//判断是什么浏览器
function isBrower(BrowerName) {
	var userAgent = navigator.userAgent;
	if (userAgent.indexOf(BrowerName) > 0) {
		return true;
	}
	return false;
}
//-------------------------------获取系统时间------------------------------
//获取当前时间
function CurentTime() {
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var day = now.getDate();
	var hour = now.getHours();
	var minu = now.getMinutes();
	var sec = now.getSeconds();
	var millsec = now.getUTCMilliseconds();
	if (month < 10) {
		month = "0" + month;
	}
	if (day < 10) {
		day = "0" + day;
	}
	if (hour < 10) {
		hour = "0" + hour;
	}
	if (minu < 10) {
		minu = "0" + minu;
	}
	if (sec < 10) {
		sec = "0" + sec;
	}
	var val = year + "" + month + "" + day + "" + hour + "" + minu + "" + sec;
	return val;
}

//----------------------------------
function urlReplace(url) {

	return url.replace(/\&/g, "\001").replace(/\#/g, "\002");

}

	//获取产品id（广告投放项目）
function hexunGetProductId() {
	var _product_id;
	if(typeof(hx_bdcTrace_projectid)!="undefined"&&hx_bdcTrace_projectid!=null)
		return hx_bdcTrace_projectid;
	else if(document.getElementById('_product_id'))
		_product_id = document.getElementById('_product_id').title;
	else
		_product_id = "";
	return _product_id;
}
//通过gif发送请求 主要获取productid
//sendGifRequest();
