(function(){
	//var page_click_collect1_sendUrl = "http://trace.hexun.com/bdcTrace/*.gif?";
	var bdcTrace_request_url = "https://trace.hexun.com";
	var page_click_collect_sendUrl = bdcTrace_request_url + "/bdcTrace/*.gif?";
	//-------------------------------下面监听点击超链接事件-----------------------------------------
	function BdcTraceClickAddLinkClickEvent() {
		var objsLink = document.getElementsByTagName("a");
		//IE用attachEvent
		if (window.attachEvent) {
			for (var i = 0; i < objsLink.length; i++) {
				objsLink[i].attachEvent("onclick", function(evnet) {
					try {
						//IE用event传递参数
						var src = event.srcElement;
						if (!src) {
							src = event.target;
						}
						var itemid = src.id||'-';
						var itemname = src.innerText||src.value||'-';
						var itemtype = src.TagName||'A'||'-';
						var targeturl = src.href||'-';
						var strXY = getMousePos(event);
						var clickX = strXY[0];
						var clickY = strXY[1];
						var channel = src.getAttribute('data-channel')||'-';
						var blockid = src.getAttribute('data-blockid')||'-';
						var itemorder = src.getAttribute('data-itemorder')||'-';
						pageClickCollect('', '', channel, '', '', '', '', 'eventid', itemid, itemname, itemtype, targeturl, blockid, itemorder,'','auto',clickX,clickY);
					} catch (e) {
						console.log(1)
					}
				})
			}
		} else {
			//Mozilla系列浏览器用此方法监听
			for (var i = 0; i < objsLink.length; i++) {
				objsLink[i].addEventListener("click", function(event) {
					try {
						var itemid = this.id||'-';
						var itemname = this.innerText||this.value||'-';
						var itemtype = this.TagName||'A'||'-';
						var targeturl = this.href||'-';
						var strXY = getMousePos(event);
						var clickX = strXY[0];
						var clickY = strXY[1];
						var channel = this.getAttribute('data-channel')||'-';
						var blockid = this.getAttribute('data-blockid')||'-';
						var itemorder = this.getAttribute('data-itemorder')||'-';
						pageClickCollect('', '', channel, '', '', '', '', 'eventid', itemid, itemname, itemtype, targeturl, blockid, itemorder,'','auto',clickX,clickY);
					} catch (e) {
						console.log(1)
					}
				})
			}
		}
	}
	BdcTraceClickAddLinkClickEvent();
	//去除空格
　　 String.prototype.trim=function(){
　　    return this.replace(/(^\s*)|(\s*$)/g, "");
　　 }
	function BdcTraceClickGetMyFunction(functionName) {
		if (functionName == null || functionName.length <= 0 || functionName.indexOf("{") < 0)
			return functionName;

		var start = functionName.indexOf("{");
		var end = functionName.indexOf("}");

		return functionName.substring(start + 1, end).trim();
	}
	//监控input标签
	function BdcTraceClickAddInputBtnEvent() {
		var objs = document.getElementsByTagName("input");
		if (window.attachEvent) {
			for (var i = 0; i < objs.length; i++) {
				objs[i].attachEvent("onclick", function(evnet) {
					try {
						if (this.type != 'text') {
							//IE用event传递参数
							var src = event.srcElement;
							if (!src) {
								src = event.target;
							}
							var itemid = src.id||'-';
							var itemname = src.innerText||src.value||'-';
							var itemtype = src.TagName||'INPUT';
							var targeturl = src.onclick == null ? '-' : (BdcTraceClickGetMyFunction(src.onclick.toString()) || "-");
							var strXY = getMousePos(event);
							var clickX = strXY[0];
							var clickY = strXY[1];
							var channel = src.getAttribute('data-channel')||'-';
							var blockid = src.getAttribute('data-blockid')||'-';
							var itemorder = src.getAttribute('data-itemorder')||'-';
							pageClickCollect('', '', channel, '', '', '', '', 'eventid', itemid, itemname, itemtype, targeturl, blockid, itemorder,'','auto',clickX,clickY);
						}
					} catch (e) {}
				})
			}
		} else {
			//Mozilla系列浏览器用此方法监听
			for (var i = 0; i < objs.length; i++) {
				objs[i].addEventListener("click", function(event) {
					try {
						if (this.type != 'text') {
							var itemid = this.id||'-';
							var itemname = this.innerText||this.value||'-';
							var itemtype = this.TagName||'INPUT';
							var targeturl = this.onclick == null ? '-' : (BdcTraceClickGetMyFunction(this.onclick.toString()) || "-");
							var strXY = getMousePos(event);
							var clickX = strXY[0];
							var clickY = strXY[1];
							var channel = this.getAttribute('data-channel')||'-';
							var blockid = this.getAttribute('data-blockid')||'-';
							var itemorder = this.getAttribute('data-itemorder')||'-';
							pageClickCollect('', '', channel, '', '', '', '', 'eventid', itemid, itemname, itemtype, targeturl, blockid, itemorder,'','auto',clickX,clickY);
						}
					} catch (e) {}
				})
			}
		}
	}
	BdcTraceClickAddInputBtnEvent();

	//监控button标签
	function BdcTraceClickAddButtonEvent() {
		var objs = document.getElementsByTagName("button");
		if (window.attachEvent) {
			for (var i = 0; i < objs.length; i++) {
				objs[i].attachEvent("onclick", function(evnet) {
					try {
						//IE用event传递参数
						var src = event.srcElement;
						if (!src) {
							src = event.target;
						}
						var itemid = src.id||'-';
						var itemname = src.innerText||src.value||'-';
						var itemtype = src.TagName||'BUTTON';
						var targeturl = src.onclick == null ? '-' : (BdcTraceClickGetMyFunction(src.onclick.toString()) || "-");
						var strXY = getMousePos(event);
						var clickX = strXY[0];
						var clickY = strXY[1];
						var channel = src.getAttribute('data-channel')||'-';
						var blockid = src.getAttribute('data-blockid')||'-';
						var itemorder = src.getAttribute('data-itemorder')||'-';
						pageClickCollect('', '', channel, '', '', '', '', 'eventid', itemid, itemname, itemtype, targeturl, blockid, itemorder,'','auto',clickX,clickY);

					} catch (e) {
						console.log(e.message)
					}
				})
			}
		} else {
			//Mozilla系列浏览器用此方法监听
			for (var i = 0; i < objs.length; i++) {
				objs[i].addEventListener("click", function(event) {
					try {
						var itemid = this.id||'-';
						var itemname = this.innerText||this.value||'-';
						var itemtype = this.TagName||'BUTTON';
						var targeturl = this.onclick == null ? '-' : (BdcTraceClickGetMyFunction(this.onclick.toString()) || "-");
						var strXY = getMousePos(event);
						var clickX = strXY[0];
						var clickY = strXY[1];
						var channel = this.getAttribute('data-channel')||'-';
						var blockid = this.getAttribute('data-blockid')||'-';
						var itemorder = this.getAttribute('data-itemorder')||'-';
						pageClickCollect('', '', channel, '', '', '', '', 'eventid', itemid, itemname, itemtype, targeturl, blockid, itemorder,'','auto',clickX,clickY);

					} catch (e) {}
				})
			}
		}
	}
	BdcTraceClickAddButtonEvent();
	//统计用户点击数量 每次点击+1 手动收集可改变其值
	var _bdcTrace_clickoid=0;
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
	function pageClickCollectX(Element, Url, Ref, Sessionid, Cookieid, Hxuid, Imei,Clickoid,Collectmethod) {
		if (Element.attachEvent) { //IE 中
			Element.attachEvent('onmousedown', function(event) {
				try{
					var eventid = "click";
					var itemid = Element.id;
					var itemname = Element.innerText || Element.value;
					var itemtype = Element.tagName;
					var targeturl = Targeturl ||Element.href||'-';
					var strXY = getMousePos(event);
					var clickX = strXY[0];
					var clickY = strXY[1];
					var channel = Element.getAttribute('data-channel');
					var blockid = Element.getAttribute('data-blockid');
					var itemorder = Element.getAttribute('data-itemorder');
					pageClickCollect(Url, Ref, channel, Sessionid, Cookieid, Hxuid, Imei, eventid, itemid, itemname, itemtype, targeturl, blockid, itemorder, Clickoid, Collectmethod, clickX, clickY);
				}catch(e){

				}
			});
		} else {
			Element.addEventListener('mousedown', function() {
				try{
					var eventid = "click";
					var itemid = Element.id;
					var itemname = Element.innerText || Element.value;
					var itemtype = Element.tagName;
					var targeturl = Targeturl ||Element.href||'-';
					var strXY = getMousePos(event);
					var clickX = strXY[0];
					var clickY = strXY[1];
					var channel = Element.getAttribute('data-channel');
					var blockid = Element.getAttribute('data-blockid');
					var itemorder = Element.getAttribute('data-itemorder');
					pageClickCollect(Url, Ref, channel, Sessionid, Cookieid, Hxuid, Imei, eventid, itemid, itemname, itemtype, targeturl, blockid, itemorder, Clickoid, Collectmethod, clickX, clickY);
				}catch(e){
					
				}
			});
		}
	}
	//传值
	function pageClickCollect(url, ref, channel, sessionid, cookieid, hxuid, imei, eventid, itemid, itemname, itemtype, targeturl, blockid, itemorder,clickoid,collectmethod, clickX, clickY) {
		_bdcTrace_clickoid++;
		//每次点击重新获取URL 因AngularJS路由机制、切换页面不会重新加载js所以需更新
		if(_bdcTrace_url!=window.location.href){
			_bdcTrace_url = window.location.href;
			_bdcTrace_ref = _bdcTrace_url;
		}
		var dom = new Image(1, 1);
		var rnd_id = "_img_" + Math.random();
		window[rnd_id] = dom; // 全局变量引用
		dom.onload = dom.onerror = function () {
		    window[rnd_id] = null; // 删除全局变量引用
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
		var cookieid = cookieid||getCookie('BDCCOOKIEID')||'-';
		var sessionid = sessionid||getCookie('JSESSIONID')||getCookie('BDCSESSIONID')||'-';
		var clickoid = clickoid||_bdcTrace_clickoid;
		var collectmethod = collectmethod||'manual';
		var siteStr = getSiteCookieid();
		var siteArr = siteStr.split(',');
		var collectmethod = collectmethod||'auto';
		page_click_collect_sendUrl = page_click_collect_sendUrl +

			//当前完整浏览网址
			//"&url=" + escape(url||_bdcTrace_url||window.location.href||'') +
			//浏览网址来源
			"&ref=" + escape(ref||_bdcTrace_ref||document.referrer||'') +

			//所属频道名称。
			"&channel=" + channel +

			//会话ID，本次浏览器关闭之前，都属于一个sessionid
			"&bdcsessionid=" + sessionid +

			//用户cookieid，必须传过来，值要求全网唯一
			"&bdccookieid=" + cookieid +

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

			//鼠标点击X坐标
			"&clickx=" + clickX + 

			//鼠标点击Y坐标
			"&clicky=" + clickY +

			//类型（a标签,img图片,button）
			"&itemtype=" + itemtype +

			//鼠标点击的对象将跳往的完整URL网址、或者完整地址路径
			"&targeturl=" + escape(targeturl||'') +

			// 在页面中所属区块id
			"&blockid=" + blockid +

			//记录点击行为发生的位置 该内容所在区块的位置id（数字）
			"&itemorder=" + itemorder + 

			//同一页面中鼠标点击的由小到大自增顺序编号。
			"&clickoid=" + clickoid +

			//收集方式(调用函数/自动)
			"&collectmethod=" + collectmethod + 

			//收集屏幕分辨率
			"&screenratio=" + window.screen.height + "," + window.screen.width + 

			//收集当前时间
			"&triggertime=" + CurentTime() + 

			//收集sitecookieid
			"&sitecookidid=" + siteArr[0] +

			//收集siteuserid
			"&siteuserid=" + siteArr[1] + 

			//随机字符串
			"&r=" + Math.ceil(Math.random() * 100000000);

		dom.style.display = "none";
		dom.style.width = "0px";
		dom.style.height = "0px";
		dom.src = page_click_collect_sendUrl;
		//console.log(dom.src)
		document.body.appendChild(dom);
		page_click_collect_sendUrl = bdcTrace_request_url+"/bdcTrace/bdcTraceClick.gif?";
	}


	//采用此方式load，可以规避网页中已存在load函数，防止冲突
	if (document.all) {
		window.attachEvent('unload', function(event) {
			//暴力停留10ms
			var now = +new Date;
			while (new Date - now >= 10) {}
		});
	} else {
		window.addEventListener('unload', function(event) {
			//暴力停留10ms
			var now = +new Date;
			while (new Date - now >= 10) {}
		});
	}

	//获取鼠标位置
	function getMousePos(event) {
		var strXYlabel;
		var e = event || window.event,
			doc = document.documentElement,
			body = document.body;
		var scrollLeft = doc && doc.scrollLeft || body && body.scrollLeft || 0;
		var scrollTop = doc && doc.scrollTop || body && body.scrollTop || 0;
		var clientLeft = doc && doc.clientLeft || body && body.clientLeft || 0;
		var clientTop = doc && doc.clientTop || body && body.clientTop || 0;
		var x = e.pageX || e.clientX + (scrollLeft - clientLeft);
		var y = e.pageY || e.clientY + (scrollTop - clientTop);
		return [x, y];
	}

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

	//获取sitecookieid
	function getSiteCookieid(){
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
		if (Site_CookieId == null || Site_CookieId == "") {
			Site_CookieId = "-";
		}
		strjson.siteCookieId = Site_CookieId;

		if (Site_userId == null || Site_userId == "") {
			Site_userId = "-";
		}
		return Site_CookieId+','+Site_userId;
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

})();
