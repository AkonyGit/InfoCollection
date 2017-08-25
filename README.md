# 用户信息收集程序
文件说明：bdcTrace_backup.js     1.0版本/监控页面打开、关闭、按钮点击、屏幕滚动等。<br>
         bdcTrace.js            1.1版本/监控页面打开，改进ie下部分兼容性问题。<br>
         bdcTrace_click_auto.js 1.1版本/监控按钮点击等用户行为。<br>
页面引用参考：<br>

	var hx_bdcTrace_projectid = "DSP_HX_T**";
	(function(){
		var arr = ['//trace.hexun.com/bdcTrace/js/*.min.js','//trace.hexun.com/bdcTrace/js/*.min.js'];
		for(var i=0;i<arr.length;i++){
			var hx = document.createElement('script'); hx.type='text/javascript';
			arr[i] = (document.location.protocol == 'https:' ? 'https:' : 'http:') + arr[i];//判断页面协议
			hx.src = arr[i];
			var s = document.getElementsByTagName('head')[0]; s.parentNode.insertBefore(hx,s);
		}
	})();

