/**
 * Created by USER on 2016/12/4.
 */
/**
 * Created by USER on 2016/12/4.
 */
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
    var patentdescripition = document.getElementById('patentdescripitions');
    var price = document.getElementById('price');

    if (price.value.length == 0||
        patentdescripition.value.length == 0){
        return -1;
    }
    return 1;
}

var bindEvent = function () {
    $('#sellout').click(function(event) {

        if(M_patent.strCheck() == 1){
            var URL = M_patent.url + '/orderfixedprice/addOrderFixedPrice';

            var param = {
                //tokennum:'20162012104564962',
                patent_id: 117,
                price: $('#price').val(),
                description:$('#patentdescripitions').val(),
            }
            console.log(123);
            publicDom.getData('post',URL,param,function(data){
                console.log(12344);
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
    //$(".again").empty();
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


//M_patent.showConfirmModal=function(info,status,msgBody){
//    var gobalModal = "";
//    $("#confirm").remove();
//    var font_icon = '';
//    if(info == '成功'){
//        font_icon = 'glyphicon glyphicon-ok';
//    }else if(info == '警告'){
//        font_icon = 'glyphicon glyphicon-warning-sign';
//    }
//    else{
//        font_icon = 'glyphicon glyphicon-remove';
//    }
//
//
//    if(status!="default"&&status!="delete"){
//        gobalModal = '<button type="button" id="confirmBtn" class="btn btn-default comFirmModal hide" data-toggle = "modal" data-target = "#confirm">确定</button>'+
//            '<div class = "modal fade" id = "confirm" tabindex = "-1" role = "dialog" aria-labelledby = "myModalLabel" aria-hidden = "true">'+
//            '<div class = "modal-dialog">'+
//            '<div class = "modal-content">'+
//            '<div class = "modal-header">'+
//            '<button type = "button" class = "close" data-dismiss = "modal" aria-hidden = "true">&times;</button>'+
//            '<h4 class = "modal-title text-danger" id = "myModalLabel">&nps<span class="'+ font_icon +'"></span> '+info+'</h4>'+
//            '</div>'+
//            '<div class = "modal-body">'+msgBody+'</div>'+
//            '<div class = "modal-footer">'+
//            '<button type = "button" class = "btn btn-danger confirm" data-dismiss = "modal">确定</button>'+
//            '</div>'+
//            '</div>'+
//            '</div>'+
//            '</div>';
//    }
//    else if(status=="delete"){
//        gobalModal = '<button type="button" id="confirmBtn" class="btn btn-default comFirmModal hide" data-toggle = "modal" data-target = "#confirm">确定</button>'+
//            '<div class = "modal fade" id = "confirm" tabindex = "-1" role = "dialog" aria-labelledby = "myModalLabel" aria-hidden = "true">'+
//            '<div class = "modal-dialog">'+
//            '<div class = "modal-content">'+
//            '<div class = "modal-header">'+
//            '<button type = "button" class = "close" data-dismiss = "modal" aria-hidden = "true">&times;</button>'+
//            '<h4 class = "modal-title text-primary" id = "myModalLabel"><span class="'+ font_icon +'"></span> '+info+'</h4>'+
//            '</div>'+
//            '<div class = "modal-body">'+msgBody+'<span class="text-danger font-d-under font-w-bold"></span></div>'+
//            '<div class = "modal-footer">'+
//            '<button type = "button" class = "btn btn-primary deleteConfirm" data-dismiss = "modal">确定</button>'+
//            '<button type = "button" class = "btn btn-default confirm" data-dismiss = "modal">取消</button>'+
//            '</div>'+
//            '</div>'+
//            '</div>'+
//            '</div>';
//    }
//    else{
//        gobalModal = '<button type="button" id="confirmBtn" class="btn btn-default comFirmModal hide" data-toggle = "modal" data-target = "#confirm">确定</button>'+
//            '<div class = "modal fade" id = "confirm" tabindex = "-1" role = "dialog" aria-labelledby = "myModalLabel" aria-hidden = "true">'+
//            '<div class = "modal-dialog">'+
//            '<div class = "modal-content">'+
//            '<div class = "modal-header">'+
//            '<button type = "button" class = "close" data-dismiss = "modal" aria-hidden = "true">&times;</button>'+
//            '<h4 class = "modal-title text-primary" id = "myModalLabel"><span class="'+ font_icon +'"></span> '+info+'</h4>'+
//            '</div>'+
//            '<div class = "modal-body">'+msgBody+'</div>'+
//            '<div class = "modal-footer">'+
//            '<button type = "button" class = "btn btn-primary confirm" data-dismiss = "modal">确定</button>'+
//            '</div>'+
//            '</div>'+
//            '</div>'+
//            '</div>';
//    }
//    $("body").append(gobalModal);
//    $("#confirmBtn").trigger('click');
//}