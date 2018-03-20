$(function(){
	M_patent.init();
	bindEvent();
})

var M_patent = {
	url: publicDom.config.url,
	init:function(){},

}

M_patent.init = function(){
  $(".header-rt").show();
  var objs = localStorage.getItem('regisInfo');
  if(objs){
    var obj = JSON.parse(objs);
    $('#account').val(obj.account||"");
    $('#phone').val(obj.phone);
    $('#email').val(obj.email);
  }
}



var bindEvent = function () {
  $('#account').blur(function(){
      var URL = M_patent.url + '/user/findAccountInAdd?account=' + $(this).val();
      publicDom.getDataNoToken('get',URL,{},function(data){
          if(data.status=="success"){
              $('.errorU').hide().find('div').text('');
          }else{
              $('.errorU').show().find('div').text('该用户名已存在！');
          }
      })
  });
  $("#passconf").blur(function(){
     if($(this).val() != $("#password").val()){
        $(".errorPa").show().find('div').text('两次输入密码不一致！');
     }else{
        $(".errorPa").hide().find('div').text("");
     }
  });
	$('.registerBtn').click(function(event) {

    var regisLocal = {
      account: $('#account').val(),
      phone: $('#phone').val(),
      email: $('#email').val(),
    };
    localStorage.setItem('regisInfo',JSON.stringify(regisLocal));

		if($("#passconf").val() != $("#password").val()){
			 $(".errorPa").show().find('div').text('两次输入密码不一致！');
		}else{
			 $(".errorPa").hide().find('div').text("");
		}

		if($('#account').val()=="" || $('#password').val()=="" || $("#mobile").val()=="" || $("#email").val()==""){
				$('.errorM').text("请输入完整的注册信息！");
		}else if($('.errorU').is(":visible") || $('.errorPa').is(":visible")){
        $('.errorM').text("请确保信息输入无误！");
    }else if(!$('#readToReg').prop('checked')){
        $('.errorM').text("请先认真阅读并同意《小功注册协议》！");

    }else{
				$('.errorM').text("");
				$('.registerBtn').text("正在注册...");
				var URL = M_patent.url + '/user/addUser';
				var param = {
					account: $('#account').val(),
					password: $('#password').val(),
          phone: $('#phone').val(),
          email: $('#email').val(),
          type: 1,
				}
				publicDom.getData('post',URL,param,function(data){
					if(data.status=='success'){
							$('.errorM').text("");
              $('.registerBtn').text("注册成功！");
              setTimeout(function(){
                window.location = "login.html";
                $('.registerBtn').text("注册");
              },2000)

					}else{
							$('.registerBtn').text("注册");
							$('.errorM').text(data.msg+'！');
					}
				})
		}
	});
}
