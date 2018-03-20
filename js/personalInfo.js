$(function(){
    M_patent.init();
    // css_setting();
    bindEvent();
})

var M_patent = {
    url: publicDom.config.url,
    init:function(){},
    showConfirmModal:function(){},
    strCheck:function(){}
}

M_patent.init = function(){
    
}

M_patent.strCheck = function(){
    var nickname = document.getElementById('nickname');
    var introduction = document.getElementById('introduction');
    var oldEmail = document.getElementById('oldEmail');
    var newEmail = document.getElementById('newEmail');
    var website = document.getElementById('website');
    
    if (nickname.value.length == 0){
      return -1;
    }
    if (nickname.value.indexOf(" ") >= 0){
      return -2
    }
    if (newEmail.value.length == 0){
      newEmail.value = oldEmail.value;
    }
    if (newEmail.value.indexOf(" ") >= 0){
      return -3;
    }
    if (website.value.indexOf(" ") >= 0){
      return -4;
    }
    return 1;
}

var bindEvent = function () {
    $('#saveInfo').click(function(event) {
        if(M_patent.strCheck() == 1){
            var URL = M_patent.url + '/user/editPersonalInfo';
            var param = {
                user_id: 12,
                email: $('#newEmail').val()
            }
            publicDom.getData('post',URL,param,function(data){
                if(data.status=='success'){
                    M_patent.showConfirmModal('成功','default','信息修改成功');
                }else{
                    M_patent.showConfirmModal('失败','default','信息修改失败');
                }
            })
        }
        else if (M_patent.strCheck() == -1){
            alert("昵称不能为空！");
        }
        else if (M_patent.strCheck() == -2){
            alert("昵称不允许输入空格！");
        }
        else if (M_patent.strCheck() == -3){
            alert("邮箱不允许出现空格！");
        }
        else if (M_patent.strCheck() == -4){
            alert("网站链接不允许出现空格！");
        }
    });
}

M_patent.showConfirmModal=function(info,status,msgBody){
    var gobalModal = "";
    $("#confirm").remove();
    var font_icon = '';
    if(info == '成功'){
        font_icon = 'glyphicon glyphicon-ok';
    }else if(info == '警告'){
        font_icon = 'glyphicon glyphicon-warning-sign';
    }
    else{
        font_icon = 'glyphicon glyphicon-remove';
    }


    if(status!="default"&&status!="delete"){
        gobalModal = '<button type="button" id="confirmBtn" class="btn btn-default comFirmModal hide" data-toggle = "modal" data-target = "#confirm">确定</button>'+
            '<div class = "modal fade" id = "confirm" tabindex = "-1" role = "dialog" aria-labelledby = "myModalLabel" aria-hidden = "true">'+
                '<div class = "modal-dialog">'+
                  '<div class = "modal-content">'+
                     '<div class = "modal-header">'+
                        '<button type = "button" class = "close" data-dismiss = "modal" aria-hidden = "true">&times;</button>'+  
                        '<h4 class = "modal-title text-danger" id = "myModalLabel">&nps<span class="'+ font_icon +'"></span> '+info+'</h4>'+
                     '</div>'+
                     '<div class = "modal-body">'+msgBody+'</div>'+
                     '<div class = "modal-footer">'+
                        '<button type = "button" class = "btn btn-danger confirm" data-dismiss = "modal">确定</button>'+
                     '</div>'+
                  '</div>'+
               '</div>'+
            '</div>';
    }
    else if(status=="delete"){
        gobalModal = '<button type="button" id="confirmBtn" class="btn btn-default comFirmModal hide" data-toggle = "modal" data-target = "#confirm">确定</button>'+
                    '<div class = "modal fade" id = "confirm" tabindex = "-1" role = "dialog" aria-labelledby = "myModalLabel" aria-hidden = "true">'+
                        '<div class = "modal-dialog">'+
                          '<div class = "modal-content">'+
                             '<div class = "modal-header">'+
                                '<button type = "button" class = "close" data-dismiss = "modal" aria-hidden = "true">&times;</button>'+  
                                '<h4 class = "modal-title text-primary" id = "myModalLabel"><span class="'+ font_icon +'"></span> '+info+'</h4>'+
                             '</div>'+
                             '<div class = "modal-body">'+msgBody+'<span class="text-danger font-d-under font-w-bold"></span></div>'+
                             '<div class = "modal-footer">'+
                                '<button type = "button" class = "btn btn-primary deleteConfirm" data-dismiss = "modal">确定</button>'+
                                '<button type = "button" class = "btn btn-default confirm" data-dismiss = "modal">取消</button>'+
                             '</div>'+
                          '</div>'+
                       '</div>'+
                    '</div>';
    }
    else{
        gobalModal = '<button type="button" id="confirmBtn" class="btn btn-default comFirmModal hide" data-toggle = "modal" data-target = "#confirm">确定</button>'+
            '<div class = "modal fade" id = "confirm" tabindex = "-1" role = "dialog" aria-labelledby = "myModalLabel" aria-hidden = "true">'+
                '<div class = "modal-dialog">'+
                  '<div class = "modal-content">'+
                     '<div class = "modal-header">'+
                        '<button type = "button" class = "close" data-dismiss = "modal" aria-hidden = "true">&times;</button>'+  
                        '<h4 class = "modal-title text-primary" id = "myModalLabel"><span class="'+ font_icon +'"></span> '+info+'</h4>'+
                     '</div>'+
                     '<div class = "modal-body">'+msgBody+'</div>'+
                     '<div class = "modal-footer">'+
                        '<button type = "button" class = "btn btn-primary confirm" data-dismiss = "modal">确定</button>'+
                     '</div>'+
                  '</div>'+
               '</div>'+
            '</div>';
    }
    $("body").append(gobalModal);
    $("#confirmBtn").trigger('click');
}