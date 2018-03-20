$(function(){
	M_patent.init();
	bindEvent();
})

var M_patent = {
	url: publicDom.config.url,
	filterStr:'',
	searchType:-1,
	init: function(){},
	getList: function(){},
	getListByBase:function(){},
	getListByOne: function(){},
	getListByPat: function(){},
}


M_patent.init = function () {
	M_patent.getList();
}

M_patent.getList = function() {
	M_patent.searchType = publicDom.GetRequest().type;

	M_patent.filterStr = publicDom.GetRequest().filterStr;
	$('#search1 input').val(M_patent.filterStr);
	if(M_patent.searchType==1){
		M_patent.getListByOne();
		$("#search1 .seach-in span b").text('一口价');
	}else if(M_patent.searchType==2){
		$("#search1 .seach-in span b").text('拍卖');
		M_patent.getListByPat();
	}else if(M_patent.searchType == 0){
		$("#search1 .seach-in span b").text('专利');
		M_patent.getListByBase();

	}else{
		window.location = "listItem.html?type=0&filterstr=";
	}
}


M_patent.getListByBase = function(curr){
	// alert(M_patent.filterStr);
	curr = curr || 1;
	$('#big-lf').empty();
	$(".loadingPat").show();
	var URL = M_patent.url + '/patent/getMorePatentByName?page='+ curr +'&pageSize=12&name=' + M_patent.filterStr ;
	publicDom.getData('get',URL,{},function(data){
		if(data.status=="success"){

			for(var i = 0; i < data.obj.length; i++){
				var str15 = (data.obj[i].description).substring(0,14);
				var name = "";

				var status = "";
				if(data.obj[i].status == 0 ){
					status = "未上架";
				}else if(data.obj[i].status==1){
					status = "拍卖中";
				}else if(data.obj[i].status==2){
					status = "一口价出售中";
				}else if(data.obj[i].status==3){
					status = "已出售";
				}
				var item = '<div class="patent-item" data-id="'+ data.obj[i].id +'">\
							<a href="##" class="pa-item-click">\
								<img src="img/11.jpg">\
								<div class="pa-main">\
									<div class="pa-lf">\
										<h2>'+ data.obj[i].name +'</h2>\
										<p>'+ str15 +'</p>\
									</div>\
									<div class="pa-rt">\
										<b></b>\
										<i></i>\
									</div>\
									<div class="clear"></div>\
								</div>\
							</a>\
						</div>'
				$('#big-lf').append(item);
			}
			laypage({
				cont : 'listItemBrk',
				pages : data.dataCount / 12 + 1,
				curr : curr || 1,
				skin: '#337ab7',
				skip: false,
				jump : function(obj,first){
					if(!first){
						M_patent.getListByBase(obj.curr);
					}
				}
			});
			$(".loadingPat").hide();
			$(".patent-item").click(function(event) {
				window.location = "patent_content(new).html?pattId=" + $(this).data('id');
			});
		}else{
			if(!data.dataCount){
				$(".loadingPat").hide();
				var name=$('#search1 input').val();
				var item = '<span style="font-size:18px;">搜索不到关于 </span>'+'<span style="font-size:18px;font-weight:bold;color: red">'+name+'</span>'+'<span style="font-size:18px; "> 的专利，快来'+'<a href="register.html" style="font-weight:bold">'+' 发布 '+'</a>' +
					'吧！</span>';
				$('#big-lf').append(item);
			}
		}
	})
}

M_patent.getListByOne = function (curr) {
	curr = curr || 1;
	$('#big-lf').empty();
	$(".loadingPat").show();
	var URL = M_patent.url + '/orderfixedprice/getOrderFixedPriceByName?page='+ curr +'&pageSize=12&name=' + M_patent.filterStr ;
	publicDom.getData('get',URL,{},function(data){
		if(data.status=="success"){

			for(var i = 0; i < data.obj.length; i++){
				var str15 = (data.obj[i].patent.description).substring(0,14);
				var name = "";
				if(data.obj[i].patent) {
						name = data.obj[i].patent.name;
				}

				var status = "";
				if(data.obj[i].patent.status==0){
					status = "未上架";
				}else if(data.obj[i].patent.status==1){
					status = "拍卖中";
				}else if(data.obj[i].patent.status==2){
					status = "出售中";
				}else if(data.obj[i].patent.status==3){
					status = "已出售";
				}
				var item = '<div class="patent-item" data-id="'+ data.obj[i].id +'">\
							<a href="##" class="pa-item-click">\
								<img src="img/11.jpg">\
								<div class="pa-main">\
									<div class="pa-lf">\
										<h2>'+ name +'</h2>\
										<p>'+ str15 +'</p>\
									</div>\
									<div class="pa-rt">\
										<b>¥'+ data.obj[i].price +'</b>\
										<i>'+ status +'</i>\
									</div>\
									<div class="clear"></div>\
								</div>\
							</a>\
						</div>'
				$('#big-lf').append(item);
			}
			laypage({
				cont : 'listItemBrk',
				pages : data.dataCount / 12 + 1,
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
			if(!data.dataCount){
				$(".loadingPat").hide();
				var name=$('#search1 input').val();
				var item = '<span style="font-size:18px;">搜索不到关于 </span>'+'<span style="font-size:18px;font-weight:bold;color: red">'+name+'</span>'+'<span style="font-size:18px; "> 的专利，快来'+'<a href="register.html" style="font-weight:bold">'+' 发布 '+'</a>' +
					'吧！</span>';
				$('#big-lf').append(item);
			}
		}
	})
}

M_patent.getListByPat = function(curr){
	curr = curr || 1;
	$('#big-lf').empty();
	$(".loadingPat").show();
	var URL = M_patent.url + '/orderAuction/getOrderAuctionByName?page='+ curr +'&pageSize=12&name=' + M_patent.filterStr ;
	publicDom.getData('get',URL,{},function(data){
		if(data.status=="success"){

			for(var i = 0; i < data.obj.length; i++){
				var str15 = (data.obj[i].patent.description).substring(0,14);
				var name = "";
				if(data.obj[i].patent) {
						name = data.obj[i].patent.name;
				}

				var status = "";
				if(data.obj[i].patent.status==0){
					status = "未上架";
				}else if(data.obj[i].patent.status==1){
					status = "拍卖中";
				}else if(data.obj[i].patent.status==2){
					status = "出售中";
				}else if(data.obj[i].patent.status==3){
					status = "已出售";
				}
				var item = '<div class="patent-item" data-id="'+ data.obj[i].id +'">\
							<a href="##" class="pa-item-click">\
								<img src="img/11.jpg">\
								<div class="pa-main">\
									<div class="pa-lf">\
										<h2>'+ name +'</h2>\
										<p>'+ str15 +'</p>\
									</div>\
									<div class="pa-rt">\
										<b>¥'+ data.obj[i].current_price +'</b>\
										<i>'+ status +'</i>\
									</div>\
									<div class="clear"></div>\
								</div>\
							</a>\
						</div>'
				$('#big-lf').append(item);
			}
			laypage({
				cont : 'listItemBrk',
				pages : data.dataCount / 12 + 1,
				curr : curr || 1,
				skin: '#337ab7',
				skip: false,
				jump : function(obj,first){
					if(!first){
						M_patent.getListByPat(obj.curr);
					}
				}
			});
			$(".loadingPat").hide();
			$(".patent-item").click(function(event) {
				window.location = "patent_auctionInfo.html?aucid=" + $(this).data('id');
			});
		}else{
			if(!data.dataCount){
				$(".loadingPat").hide();
				var name=$('#search1 input').val();
				var item = '<span style="font-size:18px;">搜索不到关于 </span>'+'<span style="font-size:18px;font-weight:bold;color: red">'+name+'</span>'+'<span style="font-size:18px; "> 的专利，快来'+'<a href="register.html" style="font-weight:bold">'+' 发布 '+'</a>' +
					'吧！</span>';
				$('#big-lf').append(item);
			}
		}
	})
}

var bindEvent = function() {
	// $('#search1 a').click(function(event) {
	// 	var filter = $("#search1 .seach-in input").val();
	// 	window.location = "listItem.html?type="+M_patent.searchType+"&filterStr=" + escape(filter);
	// });
}
