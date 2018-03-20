$(function(){
	auction.init();
})

var auction = {
	url: publicDom.config.url,
	init:function(){},
}

auction.init = function(){
    var URL = auction.url + '/orderAuction/getOrderAuctionByPatentId?patentId=19';
	publicDom.getData('get',URL,{},function(data){

		if(data.status=="success"){
            $('#catalog1').empty().append(data.obj.patent.catalog1en.name);
            $('#catalog2').empty().append(data.obj.patent.catalog2en.name);
            $('.patentName').empty().append(data.obj.patent.name);
            $('#patentID').empty().append(data.obj.patent.patent_num);

            $('#nowPriceNum').empty().append("¥ "+data.obj.current_price);
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


        }else{
           publicDom.showConfirmModal('失败','default','加载失败啦！');
        }
	})
}





