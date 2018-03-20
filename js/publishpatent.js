/**
 * Created by USER on 2016/12/4.
 */
$(function(){
    M_patent.init();
    // css_setting();
    auction.init();
    recent_record.init();
    price.init();
    bindEvent();
    getUserMoney();
})

var auction = {
    url: publicDom.config.url,
    imgurl:publicDom.config.imgurl,
    init:function(){},
}

var recent_record = {
    url: publicDom.config.url,
    imgurl:publicDom.config.imgurl,
    init:function(){},
}

var price = {
    url: publicDom.config.url,
    imgurl:publicDom.config.imgurl,
    init:function(){},
}

var M_patent = {
    url: publicDom.config.url,
    imgurl:publicDom.config.imgurl,
    select_id:'',
    init:function(){},
    showConfirmModal:function(){},
    strCheck:function(){},
    strCheck_personalInfo:function(){},
    getListByOne: function(){},
    getListByOnes: function(){},
    getListByOness: function(){},
    getpullDown: function(){},
}

M_patent.init = function(){
    M_patent.getpullDown();
    //M_patent.getListByOne();
    M_patent.getListByOnes();
    M_patent.getListByOness();
}

M_patent.getpullDown=function(){
    var URL = M_patent.url + '/patent/getMyReleasedPatent?page=1&pageSize=9999';
    publicDom.getData('get',URL,{},function(data){
        if(data.status == "success"){
            $('.patentbox ul').empty();
            for(var i=0; i< data.obj.length; i++){
                var item = "<li data-id='"+data.obj[i].id+"' data-num='"+data.obj[i].patent_num+"' data-desc='"+data.obj[i].description+"'>"+data.obj[i].name +"</li>";
                $('.patentbox ul').append(item);
            }
            $('.patentbox ul li').click(function(){
                M_patent.select_id = $(this).data('id');
                $('#patent_name').val($(this).text());
                $('#patentnumbers').val($(this).data('num'));
                $('#patentdescripitions').val($(this).data('desc'));
                $('.patentbox ul').hide();
            })
        }else{

        }
    })
}
M_patent.strCheck = function(){
    var patentnumber = document.getElementById('patentnumber');
    var patentname = document.getElementById('patentname');
    var patentdescripition = document.getElementById('patentdescripition');
    var patentdesign = document.getElementById('patentdesign');
    var patentpurpose = document.getElementById('patentpurpose');

    if (patentnumber.value.length == 0|| patentname.value.length == 0||
        patentdescripition.value.length == 0||patentdesign.value.length == 0||patentpurpose.value.length == 0){
        return -1;
    }
    return 1;
}
M_patent.strCheck_sellpatent = function(){
    var patentdescripition = document.getElementById('patentdescripitions');
    var price = document.getElementById('price');

    if (price.value.length == 0||
        patentdescripition.value.length == 0){
        return -1;
    }
    return 1;
}

M_patent.strCheck_personalInfo = function(){
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


var getUserMoney = function (){

    var URL = M_patent.url + '/userWallet/getMyWallet';
    publicDom.getData('get',URL,{},function(data){
        if(data.status=='success'){
            $('.realNameCheck').empty().append('（已认证√）');
        $('.money21').empty().append('你当前的账户余额： '+data.obj.able_balance+' 元');
        }
        else {
            $('.realNameCheck').empty().append('（未认证！）');
            $('.money21').empty().append('<span style="font-weight: bold;color: red;">' + "（请先实名制后再使用虚拟钱包功能！）" + '</span>');
        }
    })
}











var bindEvent = function () {

    var XGName = localStorage.getItem("XGName");
    $('#XGName').html(XGName);
    var XGCreatetime = localStorage.getItem("XGCreatetime");
    $('#XGCreatetime').html(XGCreatetime);

    $("#patent_name").click(function(){
        //M_patent.getpullDown();
        $(".patentbox ul").toggle();
    })
    $(".choose8s").click(function(){
        M_patent.getpullDown();
    })

    $(".choose9").click(function(){
        M_patent.getListByOnes();
    })
    $(".choose17").click(function(){
        M_patent.updateInfo();
    })
    $('#treasure').click(function(event) {
        var introduction = localStorage.getItem("introduction");
        $('#introduction').html(introduction);
        var XGName = localStorage.getItem("XGName");
        $('#nickname').val(XGName);
        //var XGName = localStorage.getItem("XGName");
        //$('#nickname').val(XGName);
        var XGEmail = localStorage.getItem("XGEmail");
        $('#oldEmail').val(XGEmail);
    });

    $('#seller').click(function (){
        M_patent.getListByOne();
        $('.text12s').empty();
    });





    $('#putup').click(function(event) {
        if(M_patent.strCheck() == 1){
            var URL = M_patent.url + '/patent/addPatent';
            var param = {
                //user_id: 1,

                catalog1: $('#x1').val(),
                patent_num: $('#patentnumber').val(),
                name: $('#patentname').val(),
                description:$('#patentdescripition').val(),
                design:$('#patentdesign').val(),
                purpose:$('#patentpurpose').val(),
                //Listimgs:$('#patentpurpose').url(),
            }
            publicDom.getData('post',URL,param,function(data){
                if(data.status=='success'){
                    publicDom.showConfirmModal('成功','default','发布成功');
                    $('.confirm').click(function(){
                        window.location='all.html';
                    })
                }else{
                    publicDom.showConfirmModal('失败','default','发布失败');
                }
            })

        }
        else if (M_patent.strCheck() == -1){
            alert("信息不能为空！");
        }
    });
    $('#sellout').click(function(event) {
        var token = localStorage.getItem("XGtoken");

        if(M_patent.strCheck_sellpatent() == 1){
            var URL = M_patent.url + '/orderfixedprice/addOrderFixedPrice';

            var param = {
                //tokennum:'20162012104564962',
                patent_id: M_patent.select_id,
                price: $('#price').val(),
                description:$('#patentdescripitions').val()
            }
            publicDom.getData('post',URL,param,function(data){
                if(data.status=='success'){
                    publicDom.showConfirmModal('成功','default','出售成功');
                }else{
                    publicDom.showConfirmModal('失败','default','出售失败');
                }
            })

        }
        else if (M_patent.strCheck() == -1){
            alert("信息不能为空！");
        }
    });

    $('#saveInfo').click(function(event) {
        if(M_patent.strCheck_personalInfo() == 1){
            var URL = M_patent.url + '/user/editPersonalInfo';
            var param = {
                user_id: 12,
                email: $('#newEmail').val()
            }
            publicDom.getData('post',URL,param,function(data){
                if(data.status=='success'){
                    if($("#nickname").val()!=''){
                    localStorage.setItem('XGName',$("#nickname").val());}
                    publicDom.showConfirmModal('成功','default','信息修改成功');

                    window.location="all.html";
                }else{
                    publicDom.showConfirmModal('失败','default','信息修改失败');
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


M_patent.getListByOne = function (curr) {
    curr = curr || 1;
    $(".loadingPat").show();
    var URL = M_patent.url + '/patent/getMyReleasedPatent?page='+ curr +'&pageSize=6';
    publicDom.getData('get',URL,{},function(data){
        if(data.status=="success"){

            for(var i=0;i<data.obj.length;i++) {
                var descp = (data.obj[i].description).substr(0,15) + '...';
                var item = '<div class="box">\
                    <div class="boxImg">\
                         <img src="' + auction.imgurl + data.obj[i].user.headPhotoslist[0].url + '" id="patentImg" style="width: 80px;height: 80px">\
                    </div>\
                    <div class="boxIntro boxNname" style="display: inline-block">\
                        <span>' + data.obj[i].name + '</span>\
                        <span style="display: block">' + descp +'</span>\
                    </div>\
                    <div class="boxButtons" style="display: inline-block">\
                    <button style="background-color: #2E426C;color:white;width: 40px;height: 22px"class="sell" id="sell">出售</button>\
                    <button style="background-color: #2E426C;color:white;position: relative;left:-5px;width: 40px;height: 22px">修改</button>\
                    <button style="background-color: #2E426C;color:white;margin-top:10px;width: 40px;height: 22px" class="checkPat" data-id="'+data.obj[i].id+'">查看</button>\
                    <button style="background-color: #2E426C;color:white;margin-top:10px;position: relative;left:-5px;width: 40px;height: 22px">删除</button>\
                    </div>\
                    </div>';
                $(".text12s").append(item);
            }
            $('.checkPat').click(function(){
                window.location="patent_content(new).html?pattId="+ $(this).data('id');
            })
            laypage({
                cont : 'listItemBrk',
                pages : data.dataCount / 6 + 1,
                curr : curr || 1,
                skin: '#337ab7',
                skip: false,
                jump : function(obj,first){
                    if(!first){
                        M_patent.getListByOne(obj.curr);
                    }
                }
            });
            $(".loadingPat").hide();
            $(".patent-item").click(function(event) {
                window.location = "patent_info.html?odfixid=" + $(this).data('id');
            });
        }else{

        }
    })
}





//action.getMyOrder()

// auction.init = function(){
//    var URL = auction.url + '/patent/getAllPatent?page=1&pageSize=6';
//    publicDom.getData('get',URL,{},function(data){
//        if(data.status=="success"){
//            $(".text12").empty();
//
//            for(var i=0;i<data.obj.length;i++) {
//                var descp = (data.obj[i].description).substr(0,29) + '...';
//                var item = '<div class="box">\
//                    <div class="boxImg">\
//                    <img src="' + auction.imgurl + data.obj[i].user.headPhotoslist[0].url + '" id="patentImg" style="width: 80px;height: 80px">\
//                    </div>\
//                    <div class="boxIntro boxIntro1" style="display: inline-block">' + descp + '</div>\
//                    <div class="boxButtons" style="display: inline-block">\
//                    <button style="background-color: #2E426C;color:white;width: 40px;height: 22px"class="sell" id="sell">出售</button>\
//                    <button style="background-color: #2E426C;color:white;position: relative;left:-5px;width: 40px;height: 22px">修改</button>\
//                    <button style="background-color: #2E426C;color:white;margin-top:10px;width: 40px;height: 22px">查看</button>\
//                    <button style="background-color: #2E426C;color:white;margin-top:10px;position: relative;left:-5px;width: 40px;height: 22px">删除</button>\
//                    </div>\
//                    </div>';
//                $(".text12").append(item);
//            }
//            //分页
//            //laypage({
//            //    cont : 'listItemBrk',
//            //    pages : data.dataCount / 12 + 1,
//            //    curr : curr || 1,
//            //    skin: '#337ab7',
//            //    skip: false,
//            //    jump : function(obj,first){
//            //        if(!first){
//            //            M_patent.getListByOne(obj.curr);
//            //        }
//            //    }
//            //});
//            //$(".loadingPat").hide();
//            //$(".patent-item").click(function(event) {
//            //    window.location = "patent_info.html?odfixid=" + $(this).data('id');
//            //});
//            //分页
//        }else{
//            publicDom.showConfirmModal('失败','default','加载失败啦！');
//        }
//    })
//}


M_patent.getListByOnes = function (curr) {
    curr = curr || 1;
    $('.text9s').empty();
    $(".loadingPat").show();
    var URL = M_patent.url + '/orderfixedprice/getMyOrderFixedPriceList?page='+ curr +'&pageSize=6';
    publicDom.getData('get',URL,{},function(data){
        if(data.status=="success"){

            for(var i=0;i<data.obj.length;i++) {
                var descp = (data.obj[i].description).substr(0,29) + '...';
                var item = '<div class="box9">\
            <div class="boxImg">\
            <img src="' + price.imgurl + data.obj[i].patent.user.headPhotoslist[0].url + '" id="patentImg" style="width: 80px;height: 80px">\
            </div>\
            <div class="boxIntro" style="display: inline-block">' + descp + '</div>\
            <div class="boxButton" style="display: inline-block">\
            <button style="background-color: #2E426C;color:white;width: 60px;height: 22px">发货</button>\
            </div>\
            </div>';
                $(".text9s").append(item);
            }
            laypage({
                cont : 'listItemBrks',
                pages : data.dataCount / 6 + 1,
                curr : curr || 1,
                skin: '#337ab7',
                skip: false,
                jump : function(obj,first){
                    if(!first){
                        M_patent.getListByOne(obj.curr);
                    }
                }
            });
            $(".loadingPat").hide();
            $(".patent-item").click(function(event) {
                window.location = "patent_info.html?odfixid=" + $(this).data('id');
            });
        }else{

        }
    })
}




// price.init = function(){
//    var URL = price.url + '/orderfixedprice/getOrderFixedPriceList?page=1&&pageSize=6';
//    publicDom.getData('get',URL,{},function(data){
//        if(data.status=="success"){
//            $(".text9").empty();
//            for(var i=0;i<data.obj.length;i++) {
//                var descp = (data.obj[i].description).substr(0,29) + '...';
//                var item = '<div class="box9">\
//                    <div class="boxImg">\
//                    <img src="' + price.imgurl + data.obj[i].patent.user.headPhotoslist[0].url + '" id="patentImg" style="width: 80px;height: 80px">\
//                    </div>\
//                    <div class="boxIntro" style="display: inline-block">' + descp + '</div>\
//                    <div class="boxButton" style="display: inline-block">\
//                    <button style="background-color: #2E426C;color:white;width: 60px;height: 22px">查看</button>\
//                    <button style="background-color: #2E426C;color:white;margin-top: 10px;width: 60px;height: 22px">删除</button>\
//                    </div>\
//                    </div>';
//                $(".text9").append(item);
//            }
//            if(data.obj.status=="0"){
//                $('#patentStatus').empty().append("未上架");
//            }
//            if(data.obj.status=="1"){
//                $('#patentStatus').empty().append("拍卖中");
//            }
//            if(data.obj.status=="2"){
//                $('#patentStatus').empty().append("出售中");
//            }
//            if(data.obj.status=="3"){
//                $('#patentStatus').empty().append("已出售");
//            }
//
//
//        }else{
//            publicDom.showConfirmModal('失败','default','加载失败啦！');
//        }
//    })
//}
M_patent.getListByOness= function (curr) {
    curr = curr || 1;
    //alert(1);
    $('.text3s').empty();
    $(".loadingPat").show();
    var URL = M_patent.url + '/order/getMyBuyedContracts?page='+ curr +'&pageSize=6';
    publicDom.getData('get',URL,{},function(data) {
        if (data.status == "success")

            {
            var table = "<table id='unpayTable' class='table table-bordered'>" +
                "<thead>" +
                "<tr><th>订单号</th><th>金额</th><th>创建时间</th><th>订单状态</th></tr>" +
                "</thead>" +
                " <tbody>" +

                "</tbody>" +
                "</table>"
            $(".text3s").empty().append(table);
            for (var i = 0; i < data.obj.length; i++) {
                //var descp = (data.obj[i].description).substr(0,29) + '...';
                //var item = '<div class="box9">\
                //    <div class="boxImg"> </div>\
                //    <div class="boxIntro" style="display: inline-block">' + data.obj[i].order_num + '</div>\
                //    <div class="boxButton3s" style="display: inline-block">\
                //    <button style="background-color: #2E426C;color:white;width: 60px;height: 22px;display: inline-block">查看</button>\
                //    <button style="background-color: #2E426C;color:white;margin-top: 10px;width: 60px;height: 22px"">删除</button>\
                //    </div>\
                //    </div>';
                var status = "";
                if (data.obj[i].state == 1) {
                    status = "待付款";
                } else if (data.obj[i].state == 2) {
                    status = "已付款，待卖家发货";
                } else if (data.obj[i].states == 3) {
                    status = "退款中";
                } else if (data.obj[i].state == 4) {
                    status = "已完成";
                } else if (data.obj[i].state == 5) {
                    status = "结束";
                }
                var item = "<tr>\
                                <td>" + data.obj[i].order_num + "</td>\
                                <td>" + data.obj[i].price + "</td>\
                                <td>" + data.obj[i].create_time + "</td>\
                                <td>" + status + "</td>\
                            </tr>"

                $(".text3s tbody").append(item);
            }
            laypage({
                cont: 'listItemBrkss',
                pages: data.obj.length / 6 + 1,
                curr: curr || 1,
                skin: '#337ab7',
                skip: false,
                jump: function (obj, first) {
                    if (!first) {
                        M_patent.getListByOness(obj.curr);
                    }
                }
            });
            $(".loadingPat").hide();
            $(".patent-item").click(function (event) {
                window.location = "patent_info.html?odfixid=" + $(this).data('id');
            });
        } else {
                $(".text3s").empty().append("订单空空如也,快来购物吧！");
        }

    })
}





recent_record.init = function(){

    var URL = recent_record.url + '/order/getUnpaidOrderByUserId?page=1&pageSize=1';
    publicDom.getData('get',URL,{},function(data){
        if(data.status=="success"){
            $(".box21").empty();
            for(var i=0;i<data.obj.length && i<2;i++) {
                var descp = (data.obj[i].description).substr(0,29) + '...';
                var item = '<div class="box21">\
                    <div class="boxImg">\
                    <img src="' + recent_record.imgurl + data.obj[i].patent.user.headPhotoslist[0].url + '" id="patentImg" style="width: 80px;height: 80px">\
                    </div>\
                    <div class="boxIntro" style="display: inline-block">' + descp + '</div>\
                    <div class="boxButton" style="display: inline-block">\
                    <button style="background-color: #2E426C;color:white;width: 60px;height: 22px">查看</button>\
                    <button style="background-color: #2E426C;color:white;margin-top: 10px;width: 60px;height: 22px">删除</button>\
                    </div>\
                    </div>';
                $(".box21").append(item);
            }
        }else{
            //publicDom.showConfirmModal('失败','default','加载失败啦！');
            $("#second21_record").show();
        }
    })
}



/*
 **    ====================================
 **    类名：CLASS_LIANDONG_YAO
 **    功能：多级连动菜单
 **    作者：YAODAYIZI
 **/
    function CLASS_LIANDONG_YAO(array)
    {
        //数组，联动的数据源
        this.array=array;
        this.indexName='';
        this.obj='';
        //设置子SELECT
        // 参数：当前onchange的SELECT ID，要设置的SELECT ID
        this.subSelectChange=function(selectName1,selectName2)
        {
            //try
            //{
            var obj1=document.all[selectName1];
            var obj2=document.all[selectName2];
            var objName=this.toString();
            var me=this;
            obj1.onchange=function()
            {
                me.optionChange(this.options[this.selectedIndex].value,obj2.id)
            }
        }
        //设置第一个SELECT
        // 参数：indexName指选中项,selectName指select的ID
        this.firstSelectChange=function(indexName,selectName)
        {
            this.obj=document.all[selectName];
            this.indexName=indexName;
            this.optionChange(this.indexName,this.obj.id)
        }
        // indexName指选中项,selectName指select的ID
        this.optionChange=function (indexName,selectName)
        {
            var obj1=document.all[selectName];
            var me=this;
            obj1.length=0;
            obj1.options[0]=new Option("请选择",'');
            for(var i=0;i<this.array.length;i++)
            {
                if(this.array[i][1]==indexName)
                {
                    //alert(this.array[i][1]+" "+indexName);
                    obj1.options[obj1.length]=new Option(this.array[i][2],this.array[i][0]);
                }
            }
        }
    }
//例子2-------------------------------------------------------------
    //数据源
    var array2=new Array();//数据格式 ID，父级ID，名称
array2[0]=new Array("1","0","车身");
array2[1]=new Array("2","0","车灯");
array2[2]=new Array("25","11","空气滤清器");
array2[3]=new Array("11","1","配气机构");
    //--------------------------------------------
    //这是调用代码
    //设置数据源
    var liandong2=new CLASS_LIANDONG_YAO(array2);
    //设置第一个选择框
    liandong2.firstSelectChange("0","x1");
    //设置子选择框
    liandong2.subSelectChange("x1","x2")
    liandong2.subSelectChange("x2","x3")
    liandong2.subSelectChange("x3","x4")
    liandong2.subSelectChange("x4","x5")
