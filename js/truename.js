/**
 * Created by USER on 2016/11/28.
 */

$(function(){
    M_patent.init();
    // css_setting();
    //M_patent.showConfirmModal();
    bindEvent();
})

var M_patent = {
    url: publicDom.config.url,
    init:function(){},
    showConfirmModal:function(){},
    strMatch:function(){},
}

M_patent.init = function(){

}
M_patent.showConfirmModal = function(){

}

M_patent.init = function(){
    //var URL = M_patent.url + '/orderfixedprice/getOrderFixedPriceByPatentId?patentId=12';
    //publicDom.getData('get',URL,{},function(data){
    //
    //});
    ////console.log(publicDom.test);
}
var bindEvent = function () {
    console.log(122);
    $('#accredition').click(function(event) {
            var URL = M_patent.url + '/realname/addR_N';
            var param = {
                user_id: '2',
                real_name: $('#realnames').val(),
                ID_card_NO: $('#ownid').val(),
            }
            publicDom.getData('post',URL,param,function(data){
                if(data.status=='success'){
                    M_patent.showConfirmModal('成功','default','认证成功');
                }else{
                    M_patent.showConfirmModal('失败','default','认证失败');
                }
            })
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