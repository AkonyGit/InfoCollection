//var page_exposure_collect_sendUrl = "https://trace.hexun.com/bdcTrace/bdcTraceClickPost ";
var page_exposure_collect_sendUrl = "https://trace.hexun.com/bdcTrace/bdcTraceClickPost";
function getCookie(c_name) {
	if (document.cookie.length > 0) {

		c_start = document.cookie.indexOf(c_name + "=");

		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) {
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return "";
}
function pageExposureCollect(data) {
	if(!data.hasOwnProperty('collectmethod')){
		data.collectmethod = 'manual';
	}
	if(!data.hasOwnProperty('sessionid')||data.sessionid==null||data.sessionid==undefined||data.sessionid==''){
		data.sessionid = "-";
	}
	if(!data.hasOwnProperty('cookieid')||data.cookieid==null||data.cookieid==undefined||data.cookieid==''){
		var regC = /^SID=\w{0,100}/;
		var SID=regC.exec(getCookie('HexunTrack')||'');
		var storageCookieid = '-';
		//如果传参无cookieid且SID不为空
		if(!data.cookieid&&SID){
			storageCookieid = SID[0].substr(4);
		}
		data.cookieid = storageCookieid||'-';
	}
	if(!data.hasOwnProperty('hxuid')||data.hxuid==null||data.hxuid==undefined||data.hxuid==''){
		var regS = /^\w{0,100}/;
		var storageHxid = regS.exec(getCookie('userToken')||"");
		if(!data.hxuid&&storageHxid){
			storageHxid = storageHxid[0];
		}
		data.hxuid = storageHxid||'-';
	}  
	if(!data.hasOwnProperty('imei')||data.imei==null||data.imei==undefined||data.imei==''){
		data.imei = "-";
	}
	if(!data.hasOwnProperty('url')||data.url==null||data.url==undefined||data.url==''){
		data.url = window.location.href;
	}
	if(!data.hasOwnProperty('ref')||data.ref==null||data.ref==undefined||data.ref==''){
		data.ref = document.referrer;
	}
	if(data.showData){
		for(var i=0;i<data.showData.length;i++){
			if(!data.showData[i].hasOwnProperty('blockid')||data.showData[i].blockid==null||data.showData[i].blockid==undefined||data.showData[i].blockid==''||data.showData[i].blockid=='null'){
				data.showData[i].blockid = '-';
			}
			if(!data.showData[i].hasOwnProperty('itemorder')||data.showData[i].itemorder==null||data.showData[i].itemorder==undefined||data.showData[i].itemorder==''||data.showData[i].itemorder=='null'){
				data.showData[i].itemorder = '-';
			}
		}
	}
	data.showflag = "s";
	console.log(data);
	var jsonResult = JSON.stringify(data);
	sendAjaxRequestPost(jsonResult);
}
/*	var _bdcTraceData = "";
var repeatAjaxPost = setTimeout(function(){
	sendAjaxRequestPost(_bdcTraceData,1);
},6000);*/
//发送数据
function sendAjaxRequestPost(data) {
	try {
		var xmlHttpPost = getXMLHttpRequest();
		xmlHttpPost.open("post",page_exposure_collect_sendUrl, true);
		xmlHttpPost.send(data);

		xmlHttpPost.onreadystatechange = function(){
			if(xmlHttpPost.readyState == 4 && xmlHttpPost.status == 200){
				//clearTimeout(repeatAjaxPost);
				return ;
	        }else if(arguments.length==1){
	        	//_bdcTraceData = data;
	        	//repeatAjaxPost;
	        }else{
	        	xmlHttpPost.close();
	        }
		}
	} catch (e) {
		console.log("sendAjaxRequestPost,'" + data + "'," + e.message);
	}
}

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
