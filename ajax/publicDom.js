var publicDom = {

	//配置项
	config:{
		rootUrl: "http://115.29.137.247:8080/",
		url: "http://115.29.137.247:8080/wxCrowd", // 请求接口的url
		//url: "http://localhost:8080/wxCrowd",
		userType: 'usertype', // 2为普通用户
		storageName: "crowdtoken", // 本地storage的item的名字
		storageId:'uid'
	},

	getData: function(type, url, param, f, isAsync, err) {
		if(localStorage.getItem(publicDom.config.storageName)){
			param.token=localStorage.getItem(publicDom.config.storageName);
		}
		var ajaxParam  = {
			type: type,
			url: url,
			data: param,
			async: isAsync !== false,
			success: function(data) {				
				var jsonData;
				try{
					jsonData = $.parseJSON(data);
				}catch(e) { // 返回值不是json格式
					if(typeof f !== 'function') { // 如果没有回调函数,抛出异常。
						throw new Error('请求数据之后，没有回调函数!');
					}
					f(data);
					return;
				}
				if(jsonData.code === 302){
					window.location.href = jsonData.msg||"../html/login_store.html";
					
				} else if(jsonData.code===-1){
					//超时或者存在
					window.localStorage.removeItem(publicDom.config.userType);
					window.localStorage.removeItem(publicDom.config.storageName);
					window.location.href = jsonData.msg||"../html/login_store.html";
				}
				else {

					if(typeof f !== 'function') { // 如果没有回调函数,抛出异常。

						throw new Error('请求数据之后，没有回调函数!');
					}
					f(jsonData);
				}
			},
		};
		$.ajax(ajaxParam);
	},

	initMenu:function(activeFlag){
		var newUrl = publicDom.config.url + '/menu/findmenu',
			param = {
					token : localStorage.getItem(publicDom.config.storageName)||''
				};
		publicDom.getData("post", newUrl, param, function(json) {
			$('#menu').empty();
			if(json.code===200){
				var $ulDom=$('<ul></ul>');
				for (var i=0;i<json.data.length;i++) {
					var  listr='<li><a href="'+json.data[i].url+'">'+json.data[i].name+'</a></li>';
					$ulDom.append(listr);
				}
				$('#menu').append($ulDom);
			}
		});
	},

	//退出登录
	reBack:function(){
		$('#reBack').on('click',function(){
			var userType = localStorage.getItem(publicDom.config.userType);
			window.localStorage.removeItem(publicDom.config.userType);
			window.localStorage.removeItem(publicDom.config.storageName);
			window.localStorage.removeItem(publicDom.config.storageId);
			if (userType == 2) {
				window.location.href = "../html/login_store.html";
			}else if (userType == 1) {
				window.location.href = "../html/login.html";
			}		
		});
	},

	resetPwd:function(){
		var account = localStorage.getItem(publicDom.config.storageId);		
		$('#changePw').on('click',function(){
			$('#user_account').val(account);
			$('#resetPd').modal('show');				
		});

		$('#change').on('click',function(){
			var userType = localStorage.getItem(publicDom.config.userType);
			if ($('#newPw').val()!=$('#repeatPw').val()) {
				alert('两次输入的密码不一致！');
				return false;
			}

			if (userType == 1) {
				var url = publicDom.config.url + '/adminUser/resetPwd';
			}else if (userType == 2){
				var url = publicDom.config.url + '/store/resetPwd';
			}
			param = {
				account : $('#user_account').val(),
				oldPw : $.md5( $('#oldPw').val()),
				newPw : $.md5( $('#newPw').val())
			};
			publicDom.getData('post',url,param,function(data){
				if (data.code == 200) {
					alert('修改成功,请重新登录！');
					if (userType == 2) {
						window.location.href = "../html/login_store.html";
					}else if (userType == 1) {
						window.location.href = "../html/login.html";
					}	
				}else{
					alert('修改失败！');
				}
			});
		});
	}
};
