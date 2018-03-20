$(function(){
	M_patent.init();
	bindEvent();
    detailOrNotice();

})

var M_patent = {
    pattId:"",
	url: publicDom.config.url,
	init:function(){},
    getInfo:function(){},
}


M_patent.init = function(){
    M_patent.getInfo();
}


M_patent.getInfo = function(){
    M_patent.pattId=publicDom.GetRequest().pattId;

    var URL = M_patent.url + '/patent/getPatentById?id='+M_patent.pattId;


    publicDom.getData('get',URL,{},function(data){
        if(data.status=="success"){

            if(data.obj.catalog1en!=null) {
                var item = '<a href="listItem.html?type=0&filterstc=">'+ (data.obj.catalog1en.name) + '</a>';
                //$('#catalog1').empty().append(data.obj.patent.catalog1en.name);
                $('#catalog1').empty().append(item);
                document.getElementById( "catalog1" ).style.display="inline";
            }
            if(data.obj.catalog2en!=null) {
                var item = '<a href="listItem.html?type=0&filterstc=">'+ (data.obj.catalog2en.name) + '</a>';
                //$('#catalog2').empty().append(data.obj.patent.catalog2en.name);
                $('#catalog2').empty().append(item);
                document.getElementById( "catalog2" ).style.display="inline";
            }
            if(data.obj.catalog3en!=null) {
                var item = '<a href="listItem.html?type=0&filterstc=">'+ (data.obj.catalog3en.name) + '</a>';
                //$('#catalog3').empty().append(data.obj.patent.catalog3en.name);
                $('#catalog3').empty().append(item);
                document.getElementById( "catalog3" ).style.display="inline";
            }
            if(data.obj.catalog4en!=null) {
                var item = '<a href="listItem.html?type=0&filterstc=">'+ (data.obj.catalog4en.name) + '</a>';
                //$('#catalog4').empty().append(data.obj.patent.catalog4en.name);
                $('#catalog4').empty().append(item);
                document.getElementById( "catalog4" ).style.display="inline";
            }
            if(data.obj.name!=null) {
                $('.patentName').empty().append(data.obj.name);
                document.getElementsByClassName("patentName")[0].style.display="inline";
            }
            $('#patentID').empty().append(data.obj.patent_num);
            $('#patentnumid').empty().append(data.obj.id);




            $('#design').empty().append(data.obj.design);

            $('#nowPriceNum').empty().append("¥ "+data.obj.price);
            $('#sellerName').empty().append(data.obj.user.name);

            $('#purpose').empty().append(data.obj.purpose);
            $('#purpose').attr("title",(data.obj.purpose));

            $('#description').empty().append(data.obj.description);


            $(".nameInGuide").attr("title",(data.objname));
            $('#create_time').empty().append("开始时间 ："+data.obj.create_time);



            if(data.obj.status=="0"){
                $('#statusForItem').empty().append("未上架");
            }
            if(data.obj.status=="1"){
                $('#statusForItem').empty().append("拍卖中");
            }
            if(data.obj.status=="2"){
                $('#statusForItem').empty().append("出售中");
            }
            if(data.obj.status=="3"){
                $('#statusForItem').empty().append("已出售");
            }


        }else{
            publicDom.showConfirmModal('失败','default','加载失败啦！');
        }
    })


}

var bindEvent = function () {

    $('#pay').click(function(event) {

        publicDom.showConfirmModal('成功','default','登陆成功');

    });
    $('#buyNow').click(function(event) {
        var type =1;/*拍卖为2*/
        var URLaddList = M_patent.url+'/order/addOrder';
        var param = {
            product_id:M_patent.odfixid,
            type:type
        };
        publicDom.getData('post',URLaddList,param,function(data){
            if(data.status == "success"){

                window.location.href="rule.html?odfixid="+M_patent.odfixid +"&listId=" + data.obj;

            }else{
    console.log(data.msg);
            }
        })


       //
       // publicDom.showConfirmModal('成功','default','登陆成功');


    });


}

var detailOrNotice = function(){
        $(".con").prepend('<div class="nav_ub"></div><div class="nav_db"></div>');

        $(".con").hover(function () {
            $(this).children(".nav_ub").stop().animate({top: -26}, 300);
            $(this).find(".pos").stop().animate({left: 50}, 250);
            $(this).children(".nav_db").stop().animate({bottom: -14}, 300);
            $(this).find(".pos").stop().animate({left: 50}, 250);
        }, function () {
            $(this).children(".nav_ub").stop().animate({top: 0}, 300);
            $(this).find(".pos").stop().animate({left: 100}, 250);
            $(this).children(".nav_db").stop().animate({bottom: 0}, 300);
            $(this).find(".pos").stop().animate({left: 100}, 250);
            console.log($(this));
        });

}



