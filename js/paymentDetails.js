$(function(){
	payment.init();
    payment.getList();
    console.log();
	clickToPay();

})

var payment = {
    userMoney:"",
    needMoney:"",
    odfixid:publicDom.GetRequest().odfixid,
    listId:"3",
	url: publicDom.config.url,
    init:function(){},
    getList:function(){},
}


/*这个是请求一口价信息的接口*/
payment.init = function(){
	var URL = payment.url + '/orderfixedprice/getOrderFixPriceById?id='+payment.odfixid;
	publicDom.getData('get',URL,{},function(data){
		if(data.status=="success"){


            if(data.obj.patent.catalog1en!=null) {
                var item = '<a href="listItem.html?type=0&filterstc=">'+ (data.obj.patent.catalog1en.name) + '</a>';
                //$('#catalog1').empty().append(data.obj.patent.catalog1en.name);
                $('#catalog1').empty().append(item);
                document.getElementById( "catalog1" ).style.display="inline";
            }
            if(data.obj.patent.catalog2en!=null) {
                var item = '<a href="listItem.html?type=0&filterstc=">'+ (data.obj.patent.catalog2en.name) + '</a>';
                //$('#catalog2').empty().append(data.obj.patent.catalog2en.name);
                $('#catalog2').empty().append(item);
                document.getElementById( "catalog2" ).style.display="inline";
            }
            if(data.obj.patent.catalog3en!=null) {
                var item = '<a href="listItem.html?type=0&filterstc=">'+ (data.obj.patent.catalog3en.name) + '</a>';
                //$('#catalog3').empty().append(data.obj.patent.catalog3en.name);
                $('#catalog3').empty().append(item);
                document.getElementById( "catalog3" ).style.display="inline";
            }
            if(data.obj.patent.catalog4en!=null) {
                var item = '<a href="listItem.html?type=0&filterstc=">'+ (data.obj.patent.catalog4en.name) + '</a>';
                //$('#catalog4').empty().append(data.obj.patent.catalog4en.name);
                $('#catalog4').empty().append(item);
                document.getElementById( "catalog4" ).style.display="inline";
            }

            if(data.obj.patent.name!=null) {
                var item = '<a href="patent_info.html?odfixid='+payment.odfixid+'">'+ (data.obj.patent.name) + '</a>';
                //$('.patentName').empty().append(data.obj.patent.name);
                $('.patentName').empty().append(item);
                document.getElementsByClassName("patentName")[0].style.display="inline";
            }
            $('#patentID').empty().append(data.obj.patent.patent_num);

            $('#nowPriceNum').empty().append(data.obj.price);
                needMoney=data.obj.price;

            $('#sellerName').empty().append(data.obj.seller.name);
            $('#description').empty().append(data.obj.patent.description);

            $(".nameInGuide").attr("title",(data.obj.patent.name));
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

            //if(localStorage.getItem('XGtoken')==null) {
            //    $('#pay').click(function(event) {
            //        publicDom.showConfirmModal('失败','default','状态拉取失败！请重新登陆');
            //        window.location.href="rule.html?odfixid="+M_patent.odfixid;
            //
            //    });
            //}
            ////要改啊！！！！！！！！！！！！！！！！！！！
            //if(localStorage.getItem('XGtoken')!=null) {
            //    //这个条件改为余额不足
            //    $('#pay').click(function(event) {
            //    publicDom.showConfirmModal('警告','default','您的余额不足，请充值！');
            //
            //});
            //}




        }else{
           publicDom.showConfirmModal('失败','default','加载失败啦！');
        }
	})
}


/*这个是获取未完成订单信息的接口*/
payment.getList = function(){

    console.log(payment.listId);
    payment.listId=publicDom.GetRequest().listId;
    console.log(payment.listId);
    var URLgetList = payment.url + '/order/getOrderById?id='+payment.listId;

    publicDom.getData('get',URLgetList,{},function(data){
        if(data.status=="success"){
            $('#listID').empty().append(data.obj.order_num);
        }else{
            publicDom.showConfirmModal('失败','default','加载失败啦！');
        }
    })
}


var alreadyRead =function (obj){
    if((obj.checked)){
        $("#pay").show();
        $("#noPay").hide();
        $("#tipForPay").hide();
    }
    else{
        $("#pay").hide();
        $("#noPay").show();
        $("#tipForPay").show();
    }
}


var clickToPay = function () {

    $('#pay').click(function(event) {

        var URLgetwallet = payment.url + '/userWallet/getMyWallet';
        publicDom.getData('get',URLgetwallet,{},function(data){
            if(data.status=="success"){

                var money = data.obj.able_balance;
                if(money>=needMoney){
                publicDom.showConfirmModal('警告','delete','&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;你的余额为：'+data.obj.able_balance+'元<br><br>真的要买吗？');

                $('.deleteConfirm').click(function(event){
                    //alert("购买成功！")
                    //

                    var URLpay = payment.url + '/order/payForTheOrder';
                    var param ={
                        id :payment.listId,
                        user_id:localStorage.getItem('XGUserId'),
                    }
                    publicDom.getData('post',URLpay,param,function(data){
                        if(data.status=='success'){
                            publicDom.showConfirmModal('成功','default','恭喜您购买成功！')
                                $('.confirm').click(function(){
                                    window.location='all.html';
                                })
                        }
                        else
                            publicDom.showConfirmModal('失败','default','该订单已支付，无需重新支付！');
                        //window.location='all.html';
                    })





                })
                }
                else
                    publicDom.showConfirmModal('失败','default','你的余额不足以完成本次交易！');




            }else{
                publicDom.showConfirmModal('失败','default','获取钱包信息失败！');
                //window.location='all.html';
            }
        })

    });


}

