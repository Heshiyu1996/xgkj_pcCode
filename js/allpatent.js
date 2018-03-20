/**
 * Created by USER on 2016/12/3.
 */
$(function(){
    auction.init();
})

var auction = {
    url: publicDom.config.url,
    imgurl:publicDom.config.imgurl,
    init:function(){},
}

auction.init = function(){
    var URL = auction.url + '/patent/getAllPatent?page=1&pageSize=2';
    publicDom.getData('get',URL,{},function(data){

        if(data.status=="success"){
            $(".text12").empty();
            for(var i=0;i<data.obj.length;i++) {
                var descp = (data.obj[i].description).substr(0,29) + '...';
                var item = '<div class="box">\
                    <div class="boxImg">\
                    <img src="' + auction.imgurl + data.obj[i].user.headPhotoslist[0].url + '" id="patentImg" style="width: 80px;height: 80px">\
                    </div>\
                    <div class="boxIntro boxIntro1" style="display: inline-block">' + descp + '</div>\
                    <div class="boxButtons" style="display: inline-block">\
                    <button style="background-color: #2E426C;color:white;width: 40px;height: 22px"class="sell" id="sell">出售</button>\
                    <button style="background-color: #2E426C;color:white;position: relative;left:-5px;width: 40px;height: 22px">修改</button>\
                    <button style="background-color: #2E426C;color:white;margin-top:10px;width: 40px;height: 22px">查看</button>\
                    <button style="background-color: #2E426C;color:white;margin-top:10px;position: relative;left:-5px;width: 40px;height: 22px">删除</button>\
                    </div>\
                    </div>';
                $(".text12").append(item);
            }
            if(data.obj.status=="0"){
                $('#patentStatus').empty().append("未上架");
            }
            if(data.obj.status=="1"){
                $('#patentStatus').empty().append("拍卖中");
            }
            if(data.obj.status=="2"){
                $('#patentStatus').empty().append("出售中");
            }
            if(data.obj.status=="3"){
                $('#patentStatus').empty().append("已出售");
            }


        }else{
            publicDom.showConfirmModal('失败','default','加载失败啦！');
        }
    })
}





