//var page_click_collect_sendUrl = "https://trace.hexun.com/bdcTrace/hexun.gif?";
var page_click_collect_sendUrl = "https://trace.hexun.com/bdcTrace/bdcTraceClick.gif?";
//统计用户点击数量 每次点击+1 手动收集可改变其值
var _bdcTrace_clickoid = 0;
//记录当前网站url
var _bdcTrace_url = window.location.href;
//记录来源页面
var _bdcTrace_ref = document.referrer;

function getCookie(c_name) {
	if (document.cookie.length > 0) {

		var c_start = document.cookie.indexOf(c_name + "=");

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


//绑定点击事件
function pageClickCollectX(Element, Url, Ref, Sessionid, Cookieid, Hxuid, Imei, Eventid, Targeturl, Clickoid, Collectmethod) {
	if (Element.attachEvent) { //IE 中
		Element.attachEvent('onmousedown', function() {
			try {
				var eventid = "click";
				var itemid = Element.id;
				var itemname = Element.innerText || Element.value;
				var itemtype = Element.tagName;
				var targeturl = Targeturl || Element.href || '-';
				var channel = Element.getAttribute('data-channel');
				var blockid = Element.getAttribute('data-blockid');
				var itemorder = Element.getAttribute('data-itemorder');
				pageClickCollect(Url, Ref, channel, Sessionid, Cookieid, Hxuid, Imei, Eventid, itemid, itemname, itemtype, Targeturl, blockid, itemorder, Clickoid, Collectmethod);
			} catch (e) {

			}
		});
	} else {
		Element.addEventListener('mousedown', function() {
			try {
				var eventid = Event||"click";
				var itemid = Element.id;
				var itemname = Element.innerText || Element.value;
				var itemtype = Element.tagName;
				var targeturl = Targeturl || Element.href || '-';
				var channel = Element.getAttribute('data-channel');
				var blockid = Element.getAttribute('data-blockid');
				var itemorder = Element.getAttribute('data-itemorder');
				pageClickCollect(Url, Ref, channel, Sessionid, Cookieid, Hxuid, Imei, Eventid, itemid, itemname, itemtype, Targeturl, blockid, itemorder, Clickoid, Collectmethod);
			} catch (e) {

			}
		});
	}
}
//传值
function pageClickCollect(url, ref, channel, sessionid, cookieid, hxuid, imei, eventid, itemid, itemname, itemtype, targeturl, blockid, itemorder, clickoid, collectmethod) {
	_bdcTrace_clickoid++;
	//每次点击重新获取URL 因AngularJS路由机制、切换页面不会重新加载js所以需更新
	if (_bdcTrace_url != window.location.href) {
		_bdcTrace_url = window.location.href;
		_bdcTrace_ref = _bdcTrace_url;
	}
	var dom = new Image(1, 1);
	var rnd_id = "_img_" + Math.random();
	window[rnd_id] = dom; // 全局变量引用
	dom.onload = dom.onerror = function() {
		window[rnd_id] = null; // 删除全局变量引用
	}
	var regC = /^SID=\w{0,100}/;
	var SID = regC.exec(getCookie('HexunTrack') || '');
	var storageCookieid = '-';
	//如果传参无cookieid且SID不为空
	if (!cookieid && SID) {
		storageCookieid = SID[0].substr(4);
	}
	var regS = /^\w{0,100}/;
	var storageHxid = regS.exec(getCookie('userToken') || "");
	if (!hxuid && storageHxid) {
		storageHxid = storageHxid[0];
	}
	if(channel==null||channel=='null'||channel==undefined){
		channel='-';
	}
	if(blockid==null||blockid=='null'||blockid==undefined){
		blockid='-';
	}
	if(itemorder==null||itemorder=='null'||itemorder==undefined){
		itemorder='-';
	}
	var cookieid = cookieid || storageCookieid || '-';
	var hxuid = hxuid || storageHxid || '-';
	var sessionid = sessionid || '-';
	var clickoid = clickoid || _bdcTrace_clickoid;
	var collectmethod = collectmethod || 'manual';
	var page_click_collect_sendUrl = page_click_collect_sendUrl +

		//当前完整浏览网址
		//"&url=" + escape(url || _bdcTrace_url || window.location.href || '') +
		//浏览网址来源
		"&ref=" + escape(ref || _bdcTrace_ref || document.referrer || '') +

		//所属频道名称。
		"&channel=" + channel +

		//会话ID，本次浏览器关闭之前，都属于一个sessionid
		"&sessionid=" + sessionid +

		//用户cookieid，必须传过来，值要求全网唯一
		"&cookieid=" + cookieid +

		//和讯用户注册UserID,没有传空
		"&hxuid=" + hxuid +

		//手机imei号
		"&imei=" + imei +

		//收集类型
		"&showflag=" + 'c' +

		//事件的ID(上拉/下拉/滑屏)
		"&eventid=" + eventid +

		//点击对象id
		"&itemid=" + itemid +

		//鼠标点击的对象的中文标签名称，即按钮上显示的字符串
		"&itemname=" + itemname +

		//类型（a标签,img图片,button）
		"&itemtype=" + itemtype +

		//鼠标点击的对象将跳往的完整URL网址、或者完整地址路径
		"&targeturl=" + escape(targeturl || '') +

		// 在页面中所属区块id
		"&blockid=" + blockid +

		//记录点击行为发生的位置 该内容所在区块的位置id（数字）
		"&itemorder=" + itemorder +


		//同一页面中鼠标点击的由小到大自增顺序编号。
		"&clickoid=" + clickoid +
		//收集方式(调用函数/自动)
		"&collectmethod=" + collectmethod +
		//随机字符串
		"&r=" + Math.ceil(Math.random() * 10000);

	dom.style = "display:none;width:0px;height:0px;";
	dom.src = page_click_collect_sendUrl;
	//console.log(dom.src)
	document.body.appendChild(dom);
}

//移动端浏览器不支持beforeunload事件
window.addEventListener('unload', function(event) {
	//暴力停留10ms
	var now = +new Date;
	while (new Date - now >= 10) {}
});