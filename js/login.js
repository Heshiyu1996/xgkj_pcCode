$(function(){
	M_patent.init();
	bindEvent();
})

var M_patent = {
	url: publicDom.config.url,
	init:function(){},
	setCookie:function(){},
	getCookie:function(){}
}

M_patent.init = function(){
	$(".header-rt").show();
	M_patent.getCookie();
}

M_patent.setCookie = function (logaccount, logpassword, logChecked) {

		if(logChecked){
				$.cookie('logaccount', logaccount,{ expires: 7 });
				$.cookie('logpassword', $.base64.encode(logpassword),{ expires: 7 });
		}else{
				$.cookie('logpassword',null);
		}
}

M_patent.getCookie = function () {
		var logaccount = $.cookie('logaccount');
		var logpassword = $.cookie('logpassword');
		if(logpassword){
				$("#rememPass").prop('checked',true);
		}
		if(logaccount){
				$("#logaccount").val(logaccount);
		}
		if(logpassword){
				$("#logpassword").val($.base64.decode(logpassword));
		}
}

var bindEvent = function () {
		$('.loginBtn').click(function(event) {
				var logaccount = $('#account').val();
				var logpassword = $('#password').val();
				var logChecked = $("#rememPass").prop('checked');
				M_patent.setCookie(logaccount, logpassword, logChecked);

				if($('#account').val()=="" || $('#password').val()==""){
						$('.errorM').text("请输入登陆信息！");
				}else{
						$('.errorM').text("");
						$('.loginBtn').text("正在登陆...");
						var URL = M_patent.url + '/user/loginbyaccount';
						var param = {
							account: $('#account').val(),
							password: $('#password').val(),
						}

						publicDom.getData('post',URL,param,function(data){
							if(data[0].status=='success'){
									$('.errorM').text("");
								    localStorage.setItem('XGtoken',data[1].obj.tokennum);
									localStorage.setItem('XGAccount',data[0].obj.account);
									localStorage.setItem('XGUserId',data[1].obj.user_id);
									localStorage.setItem('XGName',data[0].obj.name);
									localStorage.setItem('XGType',data[0].obj.type);
									localStorage.setItem('XGPhone',data[0].obj.phone);
									localStorage.setItem('XGEmail',data[0].obj.email);
									localStorage.setItem('XGCreatetime',data[0].obj.create_time);
									localStorage.setItem('XGHeadimg',data[0].obj.headPhotoslist[0].url);
									localStorage.setItem('XGIntroduction',data[0].obj.introduction);
									window.location = "all.html";
							}else{
									$('.loginBtn').text("登陆");
									$('.errorM').text(data[0].msg+'！');
							}
						})
				}
		});

}
