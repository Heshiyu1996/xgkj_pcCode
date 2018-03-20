$(function(){
    M_patent.init();
    bindEvent();
});

var M_patent = {
    url:publicDom.config.url,
    init:function(){},
    getCatalog1:function(){},
    getCatalogDetail:function(){},
}

M_patent.init = function () {
    M_patent.getCatalog1();
    M_patent.getCatalogDetail();
}

M_patent.getCatalog1 = function(){
    var URL1 = M_patent.url + '/patent_catalog/getNP_CByPage?page=1&pageSize=50&n=1';

    publicDom.getData('get',URL1,{},function(data){
        if(data.status=="success"){
            $('#main-tp').empty();
            $('#main-md').empty();
            for(var i = 0; i < data.obj.length ; i ++ ){
                var item = '<a href="#paca1-'+data.obj[i].id+'" name="paca1-'+data.obj[i].id+'" data-id="'+ data.obj[i].id +'">'+ data.obj[i].name +'</a>';

                var URL2 = M_patent.url + '/patent_catalog/getNextLevelPatent_catalogById?id=' + data.obj[i].id;
                var item2 = "";
                
                publicDom.getData('get',URL2,{},function(data2){
                    if(data2.status == "success"){  
                        var item3 = "";
                        for( var k = 0; k < data2.obj.length; k++){
                            var item3 = "";
                            var URL3 = M_patent.url + '/patent_catalog/getNextLevelPatent_catalogById?id=' + data2.obj[k].id;
                            publicDom.getData('get', URL3, {}, function(data3) {
                                if(data3.status == "success"){  
                                    for(var h = 0; h < data3.obj.length; h++){
                                        var str3 = '<a href="##" data-id="'+data3.obj[h].id+'">'+data3.obj[h].name+'</a>';
                                        
                                        $('#dd-'+h).append(str3);
                                        console.log(item3);
                                    }
                                    $(".cata-item").show();
                                    $(".loadingCatalog").hide();
                                }else{
                                    // publicDom.showConfirmModal('错误','default','获取列表失败，请刷新重试！')
                                }
                            });
                            var str2 = ' <dl class="clearfix">\
                                            <dt>\
                                                <a href="##">'+ data2.obj[k].name+'</a>\
                                            </dt>\
                                            <dd  id="dd-'+k+'"></dd>\
                                         </dl>';
                            $('#cata-deta-'+k).append(str2);
                        }

                    }else{  
                        // publicDom.showConfirmModal('错误','default','获取列表失败，请刷新重试！')
                    }
                })

                // var str1 = '<div class="cata-item" style="display:none;">\
                //                  <h2>\
                //                         <b></b>\
                //                         <i></i>\
                //                         <span>'+ data.obj[i].name +'</span>\
                //                  </h2>\
                //                  <div class="clear"></div>\
                //                  <div class="cata-deta" id="cata-deta-'+i+'"></div>\
                //             </div>'

                var str1 = '<div class="cata-item panel panel-info">\
                              <div class="panel-heading">\
                                <h3 class="panel-title" style="cursor:pointer;"><a name="paca1-'+data.obj[i].id+'" id="paca1-'+data.obj[i].id+'">'+data.obj[i].name+'</a></h3>\
                              </div>\
                              <div class="panel-body cata-deta" id="cata-deta-'+i+'"></div>\
                            </div>'
                $('#main-tp').append(item);
                $('#main-md').append(str1);

            }
            $('.loadingCatas').hide();


        }
    })
}

M_patent.getCatalogDetail = function(){


}

var bindEvent = function () {

}
